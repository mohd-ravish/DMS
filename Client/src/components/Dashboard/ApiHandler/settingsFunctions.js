import Axios from 'axios';
import { toast } from 'react-toastify';

// Function to fetch current system settings
export const fetchSettings = async (setLimit, setUpdatedBy = null, setLastUpdated = null) => {
    try {
        const response = await Axios.get("http://localhost:4500/settings/fetchSystemSettings", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            if (setLimit) setLimit(response.data.data.limit);
            if (setUpdatedBy) setUpdatedBy(response.data.data.updatedBy);
            if (setLastUpdated) setLastUpdated(response.data.data.lastUpdated);
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to update system settings
export const submitNewSystemSettings = async (newLimit) => {
    if (!newLimit || newLimit.trim() === "") {
        toast.error("The file upload limit is required", {
            position: "top-center"
        });
        return; 
    }
    try {
        const response = await Axios.post("http://localhost:4500/settings/updateSystemSettings", { newLimit }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to update system settings", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while updating system settings", {
            position: "top-center"
        });
    }
};