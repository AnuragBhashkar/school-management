const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String, // 'pdf', 'doc', 'image', etc.
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    resourceType: {
        type: String,
        enum: ['Circular', 'Notice', 'Study Material', 'Notes', 'Assignment', 'Other'],
        required: true
    },
    uploadedBy: {
        type: String,
        enum: ['Admin', 'Teacher'],
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'uploaderModel',
        required: true
    },
    uploaderModel: {
        type: String,
        enum: ['admin', 'teacher'],
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    // Optional: if resource is for a specific class/subject (teacher uploads)
    targetClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        default: null
    },
    targetSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        default: null
    },
    publicId: {
        type: String, // Cloudinary public_id for deletion
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("resource", resourceSchema);
