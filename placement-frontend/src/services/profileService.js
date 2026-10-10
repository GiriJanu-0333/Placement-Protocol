
import api from "./api";

// Create student profile with profile picture
export const createStudentProfile = async (userId, profileData, profilePicture) => {
    const formData = new FormData();

    // StudentProfile JSON part
    const profileBlob = new Blob(
        [JSON.stringify(profileData)],
        {
            type: "application/json",
        }
    );

    formData.append("profile", profileBlob);

    // Profile image
    if (profilePicture) {
        formData.append("profilePicture", profilePicture);
    }

    const response = await api.post(
        `/student-profiles/user/${userId}`,
        formData
    );

    return response.data;
};


// Get profile by profile ID
export const getProfileById = async (id) => {
    const response = await api.get(`/student-profiles/${id}`);

    return response.data;
};


// Get profile by user ID
export const getProfileByUserId = async (userId) => {
    const response = await api.get(
        `/student-profiles/user/${userId}`
    );

    return response.data;
};


// Get all student profiles
export const getAllProfiles = async () => {
    const response = await api.get("/student-profiles");

    return response.data;
};


// Update student profile with optional new profile picture
export const updateStudentProfile = async (
    userId,
    profileData,
    profilePicture
) => {
    const formData = new FormData();

    // StudentProfile JSON part
    const profileBlob = new Blob(
        [JSON.stringify(profileData)],
        {
            type: "application/json",
        }
    );

    formData.append("profile", profileBlob);

    // Only append image if user selected a new one
    if (profilePicture) {
        formData.append("profilePicture", profilePicture);
    }

    const response = await api.put(
        `/student-profiles/user/${userId}`,
        formData
    );

    return response.data;
};
// Add skill to student profile
export const addSkillToProfile = async (userId, skillId) => {
    const response = await api.post(
        `/student-profiles/user/${userId}/skills/${skillId}`
    );

    return response.data;
};
export const removeSkillFromProfile = async (userId, skillId) => {
    const response = await api.delete(
        `/student-profiles/user/${userId}/skills/${skillId}`
    );

    return response.data;
};
// Delete student profile
export const deleteStudentProfile = async (userId) => {
    const response = await api.delete(
        `/student-profiles/user/${userId}`
    );

    return response.data;
};

