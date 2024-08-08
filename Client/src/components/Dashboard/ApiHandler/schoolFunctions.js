import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add school
export const handleAddSchool = async (e, formData, setFormData) => {
    e.preventDefault();
    try {
        const response = await Axios.post(`${API_URL}/schools/addSchool`, formData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setFormData({
                schoolName: "",
                state: "",
                address: "",
                geoLocation: "",
                schoolEmail: "",
                contactPerson: "",
                contactNo: ""
            });
        } else {
            toast.error("Failed to add school!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while adding the school!", {
            position: "top-center"
        });
    }
};

// Function to fetch user's schools
export const fetchMySchools = async (setSchools) => {
    try {
        const response = await Axios.get(`${API_URL}/schools/fetchMySchools`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setSchools(response.data.data);
        } else {
            console.log("Failed to fetch schools");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch all schools
export const fetchAllSchools = async (setSchools) => {
    try {
        const response = await Axios.get(`${API_URL}/schools/fetchAllSchools`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setSchools(response.data.data);
        } else {
            console.log("Failed to fetch school names");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to update school data
export const handleEditSchoolData = async (e, schoolId, newSchoolData) => {
    e.preventDefault();
    try {
        const response = await Axios.put(`${API_URL}/schools/updateSchoolData/${schoolId}`, newSchoolData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to update school data!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while updating school data!", {
            position: "top-center"
        });
    }
};

// Function to delete school
export const handleDeleteSchool = async (schoolId, mySchools, setMySchools, handleClose) => {
    try {
        const response = await Axios.delete(`${API_URL}/schools/deleteSchool/${schoolId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setMySchools(mySchools.filter(school => school.id !== schoolId));
            handleClose();
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to delete school!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while deleting the school!", {
            position: "top-center"
        });
    }
};