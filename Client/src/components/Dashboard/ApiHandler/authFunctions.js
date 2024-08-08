import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to login 
export const handleLoginSubmit = async (e, userLoginData, setUserLoginData, navigate) => {
    e.preventDefault();
    if (Object.values(userLoginData).every(value => value.length > 0)) {
        try {
            const response = await Axios.post(`${API_URL}/auth/login`, userLoginData);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            } else {
                toast.error("Invalid login details!", {
                    position: "top-center"
                });
                setUserLoginData({
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred. Please try again later!", {
                position: "top-center"
            });
        }
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
    } catch (error) {
        console.log(error);
    }
};

// Function to logout
export const handleLogout = async (navigate) => {
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