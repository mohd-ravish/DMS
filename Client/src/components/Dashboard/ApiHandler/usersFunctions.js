import Axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;

// Function to fetch token from local storage
export const fetchToken = async (setCurrentUserId) => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.id);
    }
};

// Function to fetch user info 
export const fetchUsers = async (setUsers) => {
    try {
        const response = await Axios.get(`${API_URL}/users/fetchUsers`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setUsers(response.data.data);
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to change user role
export const handleChangeUserRole = async (userId, currentRoleId, currentUserId, setUsers, users) => {
    if (userId === currentUserId) { // If logged in user tries to change its role exit the function
        toast.error("Ask another admin to change your role", {
            position: "top-center"
        });
        return;
    }

    const newRoleId = currentRoleId === 1 ? 2 : 1;
    try {
        const response = await Axios.put(`${API_URL}/users/changeUserRole`, {
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
            toast.error("Failed to change user role!", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while changing user role!", {
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
        const response = await Axios.delete(`${API_URL}/users/deleteUser/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });

        if (response.data.status === "success") {
            setUsers(users.filter(user => user.id !== userId));
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to delete user!", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while deleting the user!", {
            position: "top-center"
        });
    }
};

// Function to get control access info
export const getControlAcessInfo = async (setControlAccess) => {
    try {
        const response = await Axios.get(`${API_URL}/users/getControlAccessInfo`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
        if (response.data.status === "success") {
            setControlAccess(response.data.data);
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to get control access users
export const getControlAccessUsers = async (setControlAccessUsers) => {
    try {
        const response = await Axios.get(`${API_URL}/users/fetchControlAccessUsers`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
        if (response.data.status === "success") {
            setControlAccessUsers(response.data.data);
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to update user access
export const handleControlAccessUpdate = async (userId, setControlAccessUsers) => {
    try {
        const response = await Axios.put(`${API_URL}/users/updateUserControlAccess/${userId}`, {}, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
        });
        if (response.data.status === "success") {
            setControlAccessUsers(prevUsers => prevUsers.map(user =>
                user.id === userId ? { ...user, has_access: user.has_access === 1 ? 0 : 1 } : user
            ));
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to update user access!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while updating the user access!", {
            position: "top-center"
        });
    }
};

// Function to get user activity logs
export const handleUserActivitySubmit = async (userId, period, setUserActivity, setActivitySection) => {
    if (!userId || userId.trim() === "") {
        return;
    }
    try {
        const response = await Axios.post(`${API_URL}/users/fetchUserActivity`, { userId, period }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setUserActivity(response.data.data);
            setActivitySection(true);
        } else {
            toast.error("Failed to get user activity logs!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while getting user activity logs!", {
            position: "top-center"
        });
    }
};