import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

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

    // Function to submit login details
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if (Object.values(userLoginData).every(value => value.length > 0)) {
            await Axios.post("http://localhost:4500/login", userLoginData)
                .then(res => {
                    if (res.data === "User not found") {
                        toast.error("User not found!", {
                            position: "top-center"
                        })
                        setUserLoginData({
                            email: "",
                            password: "",
                        })
                    }
                    else if (res.data === "Incorrect password") {
                        toast.error("Incorrect password!", {
                            position: "top-center"
                        })
                        setUserLoginData({
                            email: "",
                            password: "",
                        })

                    } else {
                        localStorage.setItem("token", res.data.token);
                        navigate("/Dashboard");
                    }
                })
        }
    }

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="login-box">
                <div className="login-left">
                    <h1 className="login-title">Sign In</h1>
                    <form action="" onSubmit={handleLoginSubmit}>
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
                        <a href="#" className="forgot-password">Forgot your password?</a>
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