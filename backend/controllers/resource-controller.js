const Resource = require('../models/resourceSchema');
const { cloudinary } = require('../cloudinaryConfig');
const https = require('https');
const http = require('http');

// Upload a new resource (Admin or Teacher)
const uploadResource = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const {
            title,
            description,
            resourceType,
            uploadedBy,
            uploader,
            uploaderModel,
            school,
            targetClass,
            targetSubject
        } = req.body;

        // Get file extension
        const originalName = req.file.originalname;
        const fileType = originalName.split('.').pop().toLowerCase();

        const newResource = new Resource({
            title,
            description: description || '',
            fileUrl: req.file.path,           // Cloudinary URL
            publicId: req.file.filename,       // Cloudinary public_id
            fileName: originalName,
            fileType,
            resourceType,
            uploadedBy,
            uploader,
            uploaderModel: uploaderModel || (uploadedBy === 'Admin' ? 'admin' : 'teacher'),
            school,
            targetClass: targetClass || null,
            targetSubject: targetSubject || null,
        });

        const saved = await newResource.save();
        res.status(201).json(saved);

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all resources for a school (Admin view — all resources)
const getResourcesBySchool = async (req, res) => {
    try {
        const resources = await Resource.find({ school: req.params.id })
            .populate('targetClass', 'sclassName')
            .populate('targetSubject', 'subName')
            .sort({ createdAt: -1 });

        if (!resources.length) {
            return res.json({ message: 'No resources found' });
        }
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get resources for a specific class (Student view)
const getResourcesByClass = async (req, res) => {
    try {
        const { schoolId, classId } = req.params;

        // Students see: Admin-uploaded school-wide + teacher uploads for their class
        const resources = await Resource.find({
            school: schoolId,
            $or: [
                { uploadedBy: 'Admin' },                   // School-wide resources
                { targetClass: classId }                    // Class-specific resources
            ]
        })
            .populate('targetClass', 'sclassName')
            .populate('targetSubject', 'subName')
            .sort({ createdAt: -1 });

        if (!resources.length) {
            return res.json({ message: 'No resources found' });
        }
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get resources uploaded by a specific teacher
const getResourcesByTeacher = async (req, res) => {
    try {
        const resources = await Resource.find({ uploader: req.params.id, uploadedBy: 'Teacher' })
            .populate('targetClass', 'sclassName')
            .populate('targetSubject', 'subName')
            .sort({ createdAt: -1 });

        if (!resources.length) {
            return res.json({ message: 'No resources found' });
        }
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a resource
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Determine the resource_type used during upload
        // PDFs/images → stored via 'auto' in Cloudinary's image pipeline → must delete as 'image'
        // Other files (doc, ppt, xls) → stored in raw pipeline → delete as 'raw'
        const imageTypes = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
        const resType = imageTypes.includes(resource.fileType?.toLowerCase()) ? 'image' : 'raw';

        // Delete from Cloudinary
        try {
            await cloudinary.uploader.destroy(resource.publicId, { resource_type: resType });
        } catch (cloudErr) {
            console.warn('Cloudinary delete warning (file may already be gone):', cloudErr.message);
        }

        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Proxy resource — uses Cloudinary SDK to generate authenticated URL, bypassing 401
const proxyResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        const contentTypeMap = {
            'pdf':  'application/pdf',
            'png':  'image/png',
            'jpg':  'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif':  'image/gif',
            'doc':  'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'ppt':  'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'xls':  'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        const fileType = (resource.fileType || resource.fileUrl.split('.').pop()).toLowerCase();
        const contentType = contentTypeMap[fileType] || 'application/pdf';

        // Determine resource_type from the stored URL
        const resourceType = resource.fileUrl.includes('/image/upload/') ? 'image' : 'raw';

        // Strip extension from publicId — cloudinary.utils expects no extension
        const cleanPublicId = resource.publicId.replace(/\.[^/.]+$/, '');

        // Generate an authenticated signed URL using our API credentials
        // This bypasses any CDN 401 / access restrictions
        const signedUrl = cloudinary.utils.private_download_url(
            cleanPublicId,
            fileType,
            { resource_type: resourceType, type: 'upload' }
        );

        console.log(`[Proxy] fileType=${fileType} resourceType=${resourceType} publicId=${cleanPublicId}`);

        // Fetch the file into a buffer (following redirects)
        const fetchBuffer = (url) => new Promise((resolve, reject) => {
            const fetcher = url.startsWith('https') ? https : http;
            fetcher.get(url, (stream) => {
                if ([301, 302, 307, 308].includes(stream.statusCode) && stream.headers.location) {
                    stream.resume();
                    return resolve(fetchBuffer(stream.headers.location));
                }
                if (stream.statusCode !== 200) {
                    stream.resume();
                    return reject(new Error(`Download failed: status ${stream.statusCode}`));
                }
                const chunks = [];
                stream.on('data', (c) => chunks.push(c));
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', reject);
            }).on('error', reject);
        });

        const buffer = await fetchBuffer(signedUrl);

        // Send response with explicit Content-Type (never overridden)
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': buffer.length,
            'Content-Disposition': `inline; filename="${resource.fileName || resource.title}"`,
            'Cache-Control': 'public, max-age=3600',
        });
        res.end(buffer);

    } catch (error) {
        console.error('[Proxy] Error:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ message: error.message });
        }
    }
};



module.exports = {
    uploadResource,
    getResourcesBySchool,
    getResourcesByClass,
    getResourcesByTeacher,
    deleteResource,
    proxyResource,
};
