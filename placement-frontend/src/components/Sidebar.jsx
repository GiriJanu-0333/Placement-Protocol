
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const studentLinks = [
    {
      path: "/student/dashboard",
      label: "Dashboard",
      icon: "bx-home",
    },
    {
      path: "/jobs",
      label: "Jobs",
      icon: "bx-briefcase",
    },
    {
      path: "/my-applications",
      label: "My Applications",
      icon: "bx-file",
    },
    {
      path: "/student/profile",
      label: "My Profile",
      icon: "bx-user",
    },
    {
      path: "/student/profile/edit",
      label: "Edit Profile",
      icon: "bx-edit",
    },
  ];

  const adminLinks = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: "bx-home",
    },
    {
      path: "/admin/users",
      label: "Manage Users",
      icon: "bx-group",
    },
    {
      path: "/admin/jobs",
      label: "Manage Jobs",
      icon: "bx-briefcase",
    },
    {
      path: "/admin/jobs/add",
      label: "Add Job",
      icon: "bx-plus-circle",
    },
    {
      path: "/admin/applications",
      label: "Applications",
      icon: "bx-file",
    },
    {
      path: "/admin/skills",
      label: "Manage Skills",
      icon: "bx-code-alt",
    },
  ];

  const links =
    user?.role === "ROLE_ADMIN"
      ? adminLinks
      : user?.role === "ROLE_STUDENT"
        ? studentLinks
        : [];

  return (
    <aside
      className="bg-dark text-white"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-bottom border-secondary">
        <h5 className="mb-1 fw-bold">
          Placement Portal
        </h5>

        <small className="text-secondary">
          {user?.role === "ROLE_ADMIN"
            ? "Admin Panel"
            : "Student Panel"}
        </small>
      </div>

      {/* Navigation */}
      <div className="p-3">

        <ul className="nav nav-pills flex-column gap-2">

          {links.map((link) => (
            <li className="nav-item" key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `nav-link text-white ${
                    isActive ? "active bg-primary" : ""
                  }`
                }
              >
                <i className={`bx ${link.icon} me-2`}></i>
                {link.label}
              </NavLink>
            </li>
          ))}

        </ul>

      </div>

      {/* User Information */}
      <div
        className="p-3 border-top border-secondary mt-auto"
        style={{ marginTop: "auto" }}
      >
        <div className="d-flex align-items-center">

          <i
            className="bx bx-user-circle me-2"
            style={{ fontSize: "32px" }}
          ></i>

          <div>
            <div className="fw-semibold">
              {user?.username || "User"}
            </div>

            <small className="text-secondary">
              {user?.role === "ROLE_ADMIN"
                ? "Administrator"
                : "Student"}
            </small>
          </div>

        </div>
      </div>

    </aside>
  );
};

export default Sidebar;

