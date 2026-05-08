const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        // CRITICAL: Strip extension from public_id.
        // With resource_type 'auto', Cloudinary auto-detects the format and appends
        // the correct extension to the URL automatically.
        // If we include the extension in public_id, the URL becomes file.pdf.pdf (broken).
        const nameWithoutExt = file.originalname
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9._-]/g, '')   // sanitize
            .replace(/\.[^/.]+$/, '');           // strip .extension

        return {
            folder: 'school_resources',
            // 'auto': PDFs → stored as image type → URL /image/upload/...file.pdf
            //         served with Content-Type: application/pdf → Chrome renders inline ✓
            //         'raw' serves as application/octet-stream → Chrome fails to render ✗
            resource_type: 'auto',
            public_id: `${Date.now()}-${nameWithoutExt}`,
            // Do NOT set 'format' — causes double extension (.pdf.pdf)
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

module.exports = { cloudinary, upload };
