import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";

import {
    getAllSkills
} from "../../services/skillService";

import {
    getProfileByUserId,
    addSkillToProfile
} from "../../services/profileService";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessages";

const Skills = () => {

    const { user } = useAuth();

    const [skills, setSkills] = useState([]);
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [addingSkill, setAddingSkill] = useState(null);
    const [error, setError] = useState("");

    // =========================
    // LOAD DATA
    // =========================

    const fetchData = async () => {

        try {

            setLoading(true);
            setError("");

            const skillsData =
                await getAllSkills();

            const profileData =
                await getProfileByUserId(user.id);

            setSkills(skillsData);
            setProfile(profileData);

        } catch (err) {

            console.error(
                "Error loading skills:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load skills."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        if (user?.id) {
            fetchData();
        }

    }, [user]);

    // =========================
    // ADD SKILL
    // =========================

    const handleAddSkill = async (skill) => {

        try {

            setAddingSkill(skill.id);
            setError("");

            const updatedProfile =
                await addSkillToProfile(
                    user.id,
                    skill.id
                );

            setProfile(updatedProfile);

        } catch (err) {

            console.error(
                "Error adding skill:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to add skill."
            );

        } finally {

            setAddingSkill(null);
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <Loading message="Loading skills..." />
        );
    }

    // =========================
    // PAGE
    // =========================

    return (
        <div className="container py-5">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold">
                        Skills
                    </h1>

                    <p className="text-muted mb-0">
                        Select the skills you have.
                    </p>

                </div>

                <Link
                    to="/student/profile"
                    className="btn btn-outline-primary"
                >
                    View Profile
                </Link>

            </div>


            {/* Error */}

            {error && (
                <div className="mb-4">
                    <ErrorMessage message={error} />
                </div>
            )}


            {/* Skills */}

            <div className="row g-4">

                {skills.length === 0 ? (

                    <div className="col-12">

                        <div className="alert alert-info">
                            No skills are available.
                        </div>

                    </div>

                ) : (

                    skills.map((skill) => {

                        const alreadyAdded =
                            profile?.skills?.includes(
                                skill.name
                            );

                        return (

                            <div
                                className="col-md-4 col-lg-3"
                                key={skill.id}
                            >

                                <div className="card shadow-sm h-100">

                                    <div className="card-body text-center p-4">

                                        <i
                                            className="bx bx-code-alt text-primary"
                                            style={{
                                                fontSize: "50px"
                                            }}
                                        ></i>

                                        <h5 className="fw-bold mt-3">
                                            {skill.name}
                                        </h5>


                                        {alreadyAdded ? (

                                            <button
                                                className="btn btn-success w-100"
                                                disabled
                                            >
                                                <i className="bx bx-check me-1"></i>
                                                Added
                                            </button>

                                        ) : (

                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() =>
                                                    handleAddSkill(
                                                        skill
                                                    )
                                                }
                                                disabled={
                                                    addingSkill ===
                                                    skill.id
                                                }
                                            >

                                                {addingSkill ===
                                                skill.id
                                                    ? "Adding..."
                                                    : "Add"}

                                            </button>

                                        )}

                                    </div>

                                </div>

                            </div>

                        );

                    })

                )}

            </div>

        </div>
    );
};

export default Skills;