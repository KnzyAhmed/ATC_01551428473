import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import "../css/Login/Register.css"

function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!username.trim() || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem("user", JSON.stringify(response.data));
                setSuccess("Login successful! Redirecting...");
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError(data.detail || "Invalid credentials.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
    <>
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        </div>

        <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" value={username} onChange={(e) => setUserName(e.target.value)} autoFocus/>

        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "limegreen" }}>{success}</p>}

        <button type="submit">Log In</button>

        <label>
        No User?{" "}
        <Link to="/register">Register here</Link>
        </label>
    </form>

    </>
    );
}

export default Login;
