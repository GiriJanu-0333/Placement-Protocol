
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";



const Login = () => {
    const navigate = useNavigate();

    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.username || !formData.password) {
            setError("Please enter username and password.");
            return;
        }

        try {
            const response = await login(
                formData.username,
                formData.password
            );

            const role = response.role;

            if (role === "ROLE_ADMIN") {
                navigate("/admin/dashboard");
            } else if (role === "ROLE_STUDENT") {
                navigate("/student/dashboard");
            } else {
                setError("Invalid user role.");
            }
        } catch (error) {
            console.error("Login error:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Invalid username or password.");
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow">
                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                            </form>

                            <p className="text-center mt-3 mb-0">
                                Don't have an account?{" "}
                                <Link to="/register">
                                    Register
                                </Link>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;

