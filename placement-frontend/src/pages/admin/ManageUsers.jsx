
import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/userService";

import UserTable from "../../components/UserTable";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";
import ConfirmDialog from "../../components/ConfirmDialog";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

const fetchUsers = async () => {
try {
setLoading(true);
setError("");


const data = await getAllUsers();

console.log("GET /users response:", data);

const usersList = Array.isArray(data)
  ? data
  : Array.isArray(data?.users)
    ? data.users
    : Array.isArray(data?.data)
      ? data.data
      : null;

if (!usersList) {
  throw new Error(
    "Expected a list of users. Check the GET /users API response."
  );
}

setUsers(usersList);


} catch (err) {
console.error("Error fetching users:", err);


setUsers([]);
setError(
  err.response?.data?.message ||
    err.message ||
    "Failed to load users."
);


} finally {
setLoading(false);
}
};



  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      setError("");

      const updatedUser = await updateUserRole(
        userId,
        role
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? updatedUser
            : user
        )
      );
    } catch (err) {
      console.error("Error updating role:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update user role."
      );

      // Reload users in case the role was not updated.
      fetchUsers();
    }
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      setError("");

      await deleteUser(selectedUserId);

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.id !== selectedUserId
        )
      );

      setShowConfirm(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error("Error deleting user:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete user."
      );

      setShowConfirm(false);
    }
  };

  if (loading) {
    return <Loading message="Loading users..." />;
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold">Manage Users</h1>

        <p className="text-muted">
          View users and manage their roles.
        </p>
      </div>

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Users */}
      <UserTable
        users={users}
        onRoleChange={handleRoleChange}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showConfirm}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedUserId(null);
        }}
      />
    </div>
  );
};

export default ManageUsers;

