
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";



const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    // Validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      // Send only the fields expected by backend
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data) {
        setError("Registration failed. Username or email may already exist.");
      } else {
        setError("Unable to connect to the server.");
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
                Create Account
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </button>

              </form>

              <p className="text-center mt-3 mb-0">
                Already have an account?{" "}
                <Link to="/login">
                  Login
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

