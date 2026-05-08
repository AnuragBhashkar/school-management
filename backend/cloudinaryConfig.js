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
        const isImage = file.mimetype.startsWith('image/');
        const isPdf   = file.mimetype === 'application/pdf';

        // Strip extension — Cloudinary appends it automatically based on resource_type
        const nameWithoutExt = file.originalname
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9._-]/g, '')
            .replace(/\.[^/.]+$/, '');

        // Images + PDFs  → resource_type 'image'
        //   Cloudinary image pipeline serves these with correct Content-Type
        //   (image/png, image/jpeg, application/pdf) → Chrome renders inline ✅
        //
        // Docs (DOC, PPT, XLS) → resource_type 'raw'
        //   These can't be rendered in a browser anyway — user downloads them ✅
        const resourceType = (isImage || isPdf) ? 'image' : 'raw';

        return {
            folder: 'school_resources',
            resource_type: resourceType,
            public_id: `${Date.now()}-${nameWithoutExt}`,
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

module.exports = { cloudinary, upload };
