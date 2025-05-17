import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                const errorMessages = Object.values(data).flat().join(" ");
                setError(errorMessages);
            }
        } catch (err) {
            setError("Server error. Please try again.");
        }
        };


    return (
    <div className="login-page"> {/* Reuses login CSS */}
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        </div>

        <form onSubmit={handleSubmit}>
            <h3>Register Now!</h3>

            <label>Username</label>
            <input name = "username" type="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} />

            <label>Email</label>
            <input name = "email" type="email" placeholder="Enter Email Address" value={formData.email} onChange={handleChange} />

            <label>Password</label>
            <input name="password" type="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />

            <label>Confirm Password</label>
            <input name="confirm_password" type="password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} />

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "limegreen" }}>{success}</p>}

            <button type="submit">Register</button>
        </form>
    </div>
    );
}

export default Register;
