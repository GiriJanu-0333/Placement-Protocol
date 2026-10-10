
import api from "./api";

// Apply for a job
export const applyForJob = async (studentId, jobId) => { const response = await api.post( "/applications/apply", null, { params: { studentId, jobId, }, } ); return response.data; };

// Get application by ID
export const getApplicationById = async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
};

// Get applications of a student
export const getStudentApplications = async (studentId) => {
    const response = await api.get(
        `/applications/student/${studentId}`
    );
    return response.data;
};

// Get applications for a job
export const getJobApplications = async (jobId) => {
    const response = await api.get(
        `/applications/job/${jobId}`
    );
    return response.data;
};

// Get all applications
export const getAllApplications = async () => {
    const response = await api.get("/applications");
    return response.data;
};

// Update application status
export const updateApplicationStatus = async (id, status) => { const response = await api.put( `/applications/${id}/status`, null, { params: { status, }, } ); return response.data; };

// Delete application
export const deleteApplication = async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
};

