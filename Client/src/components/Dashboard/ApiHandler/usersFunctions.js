import Axios from 'axios';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

// Function to fetch token from local storage
export const fetchToken = async (setCurrentUserId) => {
    const token = localStorage.getItem("token");   
    if (token) {
        const decodedToken = jwtDecode(token);   
        setCurrentUserId(decodedToken.id);       
    }
};

// Function to fetch user's info 
export const fetchUsers = async (setUsers) => {
    try {
        const response = await Axios.get("http://localhost:4500/users/getUsers", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setUsers(response.data.data);  // Set User Data
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to change user's role
export const handleChangeRole = async (userId, currentRoleId, currentUserId, setUsers, users) => {
    if (userId === currentUserId) { // If logged in user tries to change its role exit the function
        toast.error("Ask another admin to change your role", {
            position: "top-center"
        });
        return;
    }

    const newRoleId = currentRoleId === 1 ? 2 : 1;
    try {
        const response = await Axios.put("http://localhost:4500/users/changeRole", {
            userId,
            newRoleId
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });

        if (response.data.status === 'success') {
            setUsers(users.map(user =>
                user.id === userId ? { ...user, role_id: newRoleId } : user
            ));
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error(response.data.message, {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("Failed to change role", {
            position: "top-center"
        });
    }
};

// Function to delete user
export const handleDeleteUser = async (userId, currentUserId, setUsers, users) => {
    if (userId === currentUserId) { // If logged in user tries to delete its account exit the function
        toast.error("Ask another admin to delete your account", {
            position: "top-center"
        });
        return;
    }

    try {
        const response = await Axios.delete(`http://localhost:4500/users/deleteUser/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });

        if (response.data.status === 'success') {
            setUsers(users.filter(user => user.id !== userId));
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error(response.data.message, {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("Failed to delete user", {
            position: "top-center"
        });
    }
};

// Function to get user activity logs
export const handleUserActivitySubmit = async (userId, period, setUserActivity) => {
    try {
        const response = await Axios.post("http://localhost:4500/users/userActivity", { userId, period }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setUserActivity(response.data.data);
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};