import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resourcesList: [],
    loading: false,
    error: null,
    response: null,
};

const resourceSlice = createSlice({
    name: 'resource',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.resourcesList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        uploadSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = 'Resource uploaded successfully';
        },
        deleteSuccess: (state, action) => {
            state.loading = false;
            state.resourcesList = state.resourcesList.filter(r => r._id !== action.payload);
        },
        clearResponse: (state) => {
            state.response = null;
            state.error = null;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    uploadSuccess,
    deleteSuccess,
    clearResponse
} = resourceSlice.actions;

export const resourceReducer = resourceSlice.reducer;
