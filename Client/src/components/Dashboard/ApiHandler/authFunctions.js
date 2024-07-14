import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to login 
export const handleLoginSubmit = async (e, userLoginData, setUserLoginData, navigate) => {
    e.preventDefault();
    if (Object.values(userLoginData).every(value => value.length > 0)) {
        await Axios.post(`${API_URL}/auth/login`, userLoginData)
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
                    navigate("/dashboard");
                }
            })
    }
}

// Function to verify user
export const verifyUser = async (setAuth, setUsername, setRole, setMessage) => {
    try {
        const option = {
            method: 'get',
            url: `${API_URL}/auth/verifyUser`,
            headers: {
                Authorization: localStorage.getItem("token") // Get token from local storage
            }
        };
        const res = await Axios(option);
        if (res.data.status === "success") {
            setAuth(true);
            setUsername(res.data.username);
            setRole(res.data.role_id);
        } else {
            setAuth(false);
            setMessage(res.data.message);
        }
    } catch (err) {
        console.log(err);
    }
};

// Function to logout
export const logout = async (navigate) => {
    const token = localStorage.getItem("token");
    if (token) {
        await Axios.post(`${API_URL}/auth/logout`, {}, {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                if (res.data.status === "success") {
                    localStorage.removeItem("token");
                    navigate("/");
                }
            })
            .catch(err => console.log(err));
    } else {
        localStorage.removeItem("token");
        navigate("/");
    }
};