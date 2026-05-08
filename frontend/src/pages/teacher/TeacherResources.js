import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResourcesByTeacher, uploadResource, deleteResource } from '../../redux/resourceRelated/resourceHandle';
import { clearResponse } from '../../redux/resourceRelated/resourceSlice';
import {
    Box, Typography, Button, CircularProgress, Alert, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, TextField, MenuItem, Select, FormControl,
    InputLabel, Tooltip, Snackbar, Collapse, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const RESOURCE_TYPES = ['Study Material', 'Notes', 'Assignment', 'Other'];

const fileIcon = (fileType) => {
    if (fileType === 'pdf') return <PictureAsPdfIcon sx={{ color: '#e53935' }} />;
    if (['png', 'jpg', 'jpeg'].includes(fileType)) return <ImageIcon sx={{ color: '#1e88e5' }} />;
    return <InsertDriveFileIcon sx={{ color: '#43a047' }} />;
};

const typeColor = {
    'Study Material': 'success',
    'Notes': 'info',
    'Assignment': 'secondary',
    'Other': 'default',
};

const TeacherResources = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { resourcesList, loading, response, error } = useSelector((state) => state.resource);

    const [showForm, setShowForm] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, msg: '', severity: 'success' });
    const [form, setForm] = useState({ title: '', description: '', resourceType: 'Study Material' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef(null);

    const teachClass = currentUser?.teachSclass;
    const teachSubject = currentUser?.teachSubject;

    useEffect(() => {
        dispatch(clearResponse());
    }, []);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getResourcesByTeacher(currentUser._id));
        }
    }, [dispatch, currentUser?._id]);

    useEffect(() => {
        if (response && uploading) {
            setSnackbar({ open: true, msg: 'Resource uploaded successfully!', severity: 'success' });
            setShowForm(false);
            setForm({ title: '', description: '', resourceType: 'Study Material' });
            setSelectedFile(null);
            setUploading(false);
            dispatch(getResourcesByTeacher(currentUser._id));
            dispatch(clearResponse());
        }
        if (error && uploading) {
            setSnackbar({ open: true, msg: 'Upload failed. Please try again.', severity: 'error' });
            setUploading(false);
            dispatch(clearResponse());
        }
    }, [response, error]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!form.title || !selectedFile) {
            setSnackbar({ open: true, msg: 'Please fill in title and select a file.', severity: 'warning' });
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('resourceType', form.resourceType);
        formData.append('uploadedBy', 'Teacher');
        formData.append('uploader', currentUser._id);
        formData.append('uploaderModel', 'teacher');
        formData.append('school', currentUser.school?._id || currentUser.school);
        if (teachClass?._id) formData.append('targetClass', teachClass._id);
        if (teachSubject?._id) formData.append('targetSubject', teachSubject._id);
        dispatch(uploadResource(formData));
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this resource? This cannot be undone.')) {
            dispatch(deleteResource(id)).then(() => {
                dispatch(getResourcesByTeacher(currentUser._id));
            });
        }
    };

    const getDownloadUrl = (url) => {
        if (!url) return url;
        return url.replace('/upload/', '/upload/fl_attachment/');
    };

    const getPreviewUrl = (resource) => {
        const BACKEND = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
        if (resource.fileType?.toLowerCase() === 'pdf') {
            return `${BACKEND}/ResourceView/${resource._id}`;
        }
        return resource.fileUrl;
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="h5" fontWeight={700}>📚 My Resources</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Upload study materials, notes, and assignments for your students
                        {teachClass && ` • Class: ${teachClass.sclassName}`}
                        {teachSubject && ` • Subject: ${teachSubject.subName}`}
                    </Typography>
                </Box>
                <Button
                    variant={showForm ? 'outlined' : 'contained'}
                    startIcon={showForm ? <CloseIcon /> : <UploadFileIcon />}
                    onClick={() => setShowForm((v) => !v)}
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    {showForm ? 'Cancel' : 'Upload'}
                </Button>
            </Box>

            {/* Inline Upload Form */}
            <Collapse in={showForm}>
                <Paper sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px dashed', borderColor: 'primary.main' }}>
                    <Typography variant="h6" fontWeight={600} mb={2}>📤 Upload Study Material</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Title *"
                            fullWidth
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                        <TextField
                            label="Description (optional)"
                            fullWidth
                            multiline
                            rows={2}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Resource Type</InputLabel>
                            <Select
                                value={form.resourceType}
                                label="Resource Type"
                                onChange={(e) => setForm({ ...form, resourceType: e.target.value })}
                            >
                                {RESOURCE_TYPES.map((t) => (
                                    <MenuItem key={t} value={t}>{t}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="outlined"
                                startIcon={<AttachFileIcon />}
                                sx={{ py: 1.2, borderStyle: 'dashed' }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                Choose File
                            </Button>
                            {selectedFile ? (
                                <Alert severity="info" sx={{ py: 0, flex: 1 }}>
                                    ✅ {selectedFile.name} &nbsp;|&nbsp; {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </Alert>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    PDF, DOC, PPT, XLS, or Image
                                </Typography>
                            )}
                        </Box>

                        <Divider />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => { setShowForm(false); setSelectedFile(null); }}
                                disabled={uploading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleUpload}
                                disabled={uploading}
                                startIcon={uploading ? <CircularProgress size={18} color="inherit" /> : <UploadFileIcon />}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Collapse>

            {/* Always-rendered native file input */}
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={handleFileChange}
            />

            {/* Table */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            ) : !resourcesList || resourcesList.length === 0 ? (
                <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
                    <InsertDriveFileIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">No resources uploaded yet</Typography>
                    <Typography variant="body2" color="text.disabled">
                        Upload notes or study material for your students
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>File</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Title</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Type</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resourcesList.map((r) => (
                                <TableRow key={r._id} hover>
                                    <TableCell>{fileIcon(r.fileType)}</TableCell>
                                    <TableCell>
                                        <Typography fontWeight={500}>{r.title}</Typography>
                                        {r.description && (
                                            <Typography variant="caption" color="text.secondary">{r.description}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={r.resourceType} color={typeColor[r.resourceType] || 'default'} size="small" />
                                    </TableCell>
                                    <TableCell>{formatDate(r.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View / Preview">
                                            <IconButton
                                                component="a"
                                                href={getPreviewUrl(r)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="primary"
                                                size="small"
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Download">
                                            <IconButton
                                                component="a"
                                                href={getDownloadUrl(r.fileUrl)}
                                                download
                                                rel="noopener noreferrer"
                                                color="success"
                                                size="small"
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => handleDelete(r._id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TeacherResources;
