
import api from "./api";

// Create a skill
export const createSkill = async (skillData) => {
    const response = await api.post("/skills", skillData);
    return response.data;
};

// Get all skills
export const getAllSkills = async () => {
    const response = await api.get("/skills");
    return response.data;
};

// Get skill by ID
export const getSkillById = async (id) => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
};

// Get skill by name
export const getSkillByName = async (name) => {
    const response = await api.get(
        `/skills/name/${encodeURIComponent(name)}`
    );
    return response.data;
};

// Update skill
export const updateSkill = async (id, skillData) => {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
};

// Delete skill
export const deleteSkill = async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
};

