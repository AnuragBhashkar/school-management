import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    uploadSuccess,
    deleteSuccess,
} from './resourceSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Get all resources for a school (Admin)
export const getAllResources = (schoolId) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/ResourceList/${schoolId}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

// Get resources for a student's class
export const getResourcesByClass = (schoolId, classId) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/ResourceListByClass/${schoolId}/${classId}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

// Get resources uploaded by a teacher
export const getResourcesByTeacher = (teacherId) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/ResourceListByTeacher/${teacherId}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

// Upload a resource
export const uploadResource = (formData) => async (dispatch) => {
    dispatch(getRequest());
    try {
        await axios.post(`${BASE_URL}/ResourceUpload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch(uploadSuccess());
    } catch (error) {
        dispatch(getError(error));
    }
};

// Delete a resource
export const deleteResource = (resourceId) => async (dispatch) => {
    dispatch(getRequest());
    try {
        await axios.delete(`${BASE_URL}/Resource/${resourceId}`);
        dispatch(deleteSuccess(resourceId));
    } catch (error) {
        dispatch(getError(error));
    }
};
