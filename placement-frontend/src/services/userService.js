
import api from "./api";

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Get user by username
export const getUserByUsername = async (username) => {
  const response = await api.get(
    `/users/username/${encodeURIComponent(username)}`
  );
  return response.data;
};

// Create user
export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// Update user role
export const updateUserRole = async (id, role) => {
  const response = await api.put(`/users/${id}/role`, null, {
    params: { role },
  });
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

