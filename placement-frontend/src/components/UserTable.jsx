
import { useState } from "react";

const UserTable = ({ users = [], onRoleChange, onDelete }) => {
  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleChange = (userId, role) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: role,
    }));

    if (onRoleChange) {
      onRoleChange(userId, role);
    }
  };

  if (users.length === 0) {
    return (
      <div className="alert alert-info">
        No users found.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const currentRole =
              selectedRoles[user.id] || user.role;

            return (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.username}</td>

                <td>{user.email}</td>

                <td>
                  <select
                    className="form-select"
                    value={currentRole}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                  >
                    <option value="ROLE_STUDENT">
                      Student
                    </option>

                    <option value="ROLE_ADMIN">
                      Admin
                    </option>
                  </select>
                </td>

                <td>
                  {onDelete && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

