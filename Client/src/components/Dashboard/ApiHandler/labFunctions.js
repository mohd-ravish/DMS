import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add lab
export const handleAddLab = async (e, labData, setLabData) => {
    e.preventDefault();
    try {
        const response = await Axios.post(`${API_URL}/labs/addLab`, labData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setLabData({
                labName: "",
                labType: "",
                schoolId: "",
            });
        } else {
            toast.error("Lab add failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while adding the lab", {
            position: "top-center"
        });
    }
};

// Function to fetch all labs
export const fetchMyLabs = async (setLabs) => {
    try {
        const response = await Axios.get(`${API_URL}/labs/getMyLabs`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setLabs(response.data.data);
        } else {
            console.log("Failed to fetch labs");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch all labs
export const fetchAllLabs = async (setLabs) => {
    try {
        const response = await Axios.get(`${API_URL}/labs/getAllLabs`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setLabs(response.data.data);
        } else {
            console.log("Failed to fetch labs");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch labs for a specific school
export const fetchLabsForSchool = async (schoolId, setLabs) => {
    try {
        const response = await Axios.get(`${API_URL}/labs/getLabsForSchool/${schoolId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setLabs(response.data.labs);
        } else {
            console.error("Failed to fetch labs");
        }
    } catch (error) {
        console.error("An error occurred while fetching labs:", error);
    }
};

// Function to update lab data
export const handleEditLabData = async (e, labId, newLabData) => {
    e.preventDefault();
    try {
        const response = await Axios.put(`${API_URL}/labs/updateLabData/${labId}`, newLabData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to update lab data", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while updating lab data", {
            position: "top-center"
        });
    }
};

// Function to delete lab
export const handleDeleteLab = async (labId, myLabs, setMyLabs, handleClose) => {
    try {
        const response = await Axios.delete(`${API_URL}/labs/deleteLab/${labId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setMyLabs(myLabs.filter(lab => lab.id !== labId));
            handleClose();
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Lab delete failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while deleting the lab", {
            position: "top-center"
        });
    }
};