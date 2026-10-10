
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default RoleRoute;

