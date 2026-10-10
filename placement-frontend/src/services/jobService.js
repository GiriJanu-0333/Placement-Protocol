
import api from "./api";

// Get all jobs
export const getAllJobs = async () => {
    const response = await api.get("/jobs");
    return response.data;
};

// Get active jobs
export const getActiveJobs = async () => {
    const response = await api.get("/jobs/active");
    return response.data;
};

// Get job by ID
export const getJobById = async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
};

// Get jobs by company
export const getJobsByCompany = async (company) => {
    const response = await api.get(
        `/jobs/company/${encodeURIComponent(company)}`
    );
    return response.data;
};

// Create a new job
export const createJob = async (jobData) => {
    const response = await api.post("/jobs", jobData);
    return response.data;
};

// Update job
export const updateJob = async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
};

// Close job
export const closeJob = async (id) => {
    const response = await api.put(`/jobs/${id}/close`);
    return response.data;
};

// Delete job
export const deleteJob = async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
};

