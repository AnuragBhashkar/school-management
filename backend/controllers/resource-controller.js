const Resource = require('../models/resourceSchema');
const { cloudinary } = require('../cloudinaryConfig');

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

module.exports = {
    uploadResource,
    getResourcesBySchool,
    getResourcesByClass,
    getResourcesByTeacher,
    deleteResource
};
