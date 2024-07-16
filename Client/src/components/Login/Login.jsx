import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleLoginSubmit } from '../Dashboard/ApiHandler/authFunctions';

const Login = () => {
    const navigate = useNavigate();
    // User login Details
    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: "",
    })

    const handleLoginChange = (e) => {
        const { value, name } = e.target
        setUserLoginData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="login-box">
                <div className="login-left">
                    <h1 className="login-title">Sign In</h1>
                    <form onSubmit={(e) => handleLoginSubmit(e, userLoginData, setUserLoginData, navigate)}>
                        <input
                            name="email"
                            type="email"
                            value={userLoginData.email}
                            placeholder="Enter Email"
                            onChange={handleLoginChange}
                            autoComplete="off"
                            required />
                        <input
                            name="password"
                            type="password"
                            value={userLoginData.password}
                            placeholder="Enter Password"
                            onChange={handleLoginChange}
                            autoComplete="off"
                            required />
                        <a href="# " className="forgot-password">Forgot your password?</a>
                        <button type="submit" className="login-button">SIGN IN</button>
                    </form>
                </div>
                <div className="login-right">
                    <h2 className="welcome-title">Hello, Friend!</h2>
                    <p>This is a demo mode of the Invento. You may use the following credentials and have a walkthrough of the application.</p>
                    <ul>
                        <li><strong>Admin Login:</strong> demoadmin</li>
                        <li><strong>Password:</strong> 123</li>
                        <li><strong>User Login:</strong> demouser</li>
                        <li><strong>Password:</strong> 123</li>
                    </ul>
                    <p>For enquiries, please write to us on cccc</p>
                </div>
            </div>
        </div>
    );
};

export default Login;