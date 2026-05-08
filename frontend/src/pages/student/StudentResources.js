import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResourcesByClass } from '../../redux/resourceRelated/resourceHandle';
import {
    Box, Typography, CircularProgress, Chip, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Tooltip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const fileIcon = (fileType) => {
    if (fileType === 'pdf') return <PictureAsPdfIcon sx={{ color: '#e53935' }} />;
    if (['png', 'jpg', 'jpeg'].includes(fileType)) return <ImageIcon sx={{ color: '#1e88e5' }} />;
    return <InsertDriveFileIcon sx={{ color: '#43a047' }} />;
};

const typeColor = {
    'Circular': 'error',
    'Notice': 'warning',
    'Study Material': 'success',
    'Notes': 'info',
    'Assignment': 'secondary',
    'Other': 'default',
};

const StudentResources = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { resourcesList, loading } = useSelector((state) => state.resource);

    const schoolId = currentUser?.school?._id || currentUser?.school;
    const classId = currentUser?.sclassName?._id || currentUser?.sclassName;

    useEffect(() => {
        if (schoolId && classId) {
            dispatch(getResourcesByClass(schoolId, classId));
        }
    }, [dispatch, schoolId, classId]);

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={700}>📖 Resources & Study Material</Typography>
                <Typography variant="body2" color="text.secondary">
                    Access circulars, notes, and materials shared by Admin and your teachers
                </Typography>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            ) : !resourcesList || resourcesList.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                    <FolderOpenIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">No resources available yet</Typography>
                    <Typography variant="body2" color="text.disabled">
                        Resources shared by Admin and your teachers will appear here
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
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Shared By</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">Download</TableCell>
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
                                        {r.targetSubject && (
                                            <Typography variant="caption" display="block" color="primary">
                                                Subject: {r.targetSubject.subName}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={r.resourceType} color={typeColor[r.resourceType] || 'default'} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={r.uploadedBy}
                                            variant="outlined"
                                            size="small"
                                            color={r.uploadedBy === 'Admin' ? 'error' : 'primary'}
                                        />
                                    </TableCell>
                                    <TableCell>{formatDate(r.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Open / Download">
                                            <IconButton
                                                component="a"
                                                href={r.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="primary"
                                                size="small"
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default StudentResources;
