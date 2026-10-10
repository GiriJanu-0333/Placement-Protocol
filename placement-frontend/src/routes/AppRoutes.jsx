
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Unauthorized from "../pages/Unauthorized";

import StudentDashboard from "../pages/student_page/StudentDashboard";
import Jobs from "../pages/student_page/Jobs";
import JobDetails from "../pages/student_page/JobDetails";
import MyApplications from "../pages/student_page/MyApplications";
import StudentProfile from "../pages/student_page/StudentProfile";
import EditProfile from "../pages/student_page/EditProfile";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageJobs from "../pages/admin/ManageJobs";
import AddJob from "../pages/admin/AddJob";
import EditJob from "../pages/admin/EditJob";
import ManageSkills from "../pages/admin/ManageSkills";
import ManageApplications from "../pages/admin/ManageApplications";
import ApplicationDetails from "../pages/admin/ApplicationDetails";

import Skills from "../pages/student_page/Skills";
const AppRoutes = () => {
    return (
        <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />


            {/* ================= STUDENT ROUTES ================= */}

            <Route element={<ProtectedRoute />}>
                <Route element={<RoleRoute allowedRoles={["ROLE_STUDENT"]} />}>

                    <Route
                        path="/student/dashboard"
                        element={<StudentDashboard />}
                    />

                    <Route
                        path="/jobs"
                        element={<Jobs />}
                    />
<Route
    path="/student/skills"
    element={<Skills />}
/>
                    <Route
                        path="/jobs/:id"
                        element={<JobDetails />}
                    />

                    <Route
                        path="/my-applications"
                        element={<MyApplications />}
                    />

                    <Route
                        path="/student/profile"
                        element={<StudentProfile />}
                    />

                    <Route
                        path="/student/profile/edit"
                        element={<EditProfile />}
                    />

                </Route>
            </Route>


            {/* ================= ADMIN ROUTES ================= */}

            <Route element={<ProtectedRoute />}>
                <Route element={<RoleRoute allowedRoles={["ROLE_ADMIN"]} />}>

                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/users"
                        element={<ManageUsers />}
                    />

                    <Route
                        path="/admin/jobs"
                        element={<ManageJobs />}
                    />

                    <Route
                        path="/admin/jobs/add"
                        element={<AddJob />}
                    />

                    <Route
                        path="/admin/jobs/edit/:id"
                        element={<EditJob />}
                    />

                    <Route
                        path="/admin/skills"
                        element={<ManageSkills />}
                    />

                    <Route
                        path="/admin/applications"
                        element={<ManageApplications />}
                    />

                    <Route
                        path="/admin/applications/:id"
                        element={<ApplicationDetails />}
                    />

                </Route>
            </Route>


            {/* ================= FALLBACK ================= */}

            <Route
                path="*"
                element={<Unauthorized />}
            />

        </Routes>
    );
};

export default AppRoutes;

