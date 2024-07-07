import Axios from 'axios';
import { toast } from 'react-toastify';

// Function to add school
export const handleAddSchool = async (e, formData, setFormData) => {
    e.preventDefault();
    try {
        const response = await Axios.post("http://localhost:4500/school/addSchool", formData, {
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
            toast.error("School add failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while adding the school", {
            position: "top-center"
        });
    }
};

// Function to fetch school names
export const fetchSchoolNames = async (setSchoolNames) => {
    try {
        const response = await Axios.get("http://localhost:4500/school/getSchoolNames", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setSchoolNames(response.data.data);
        } else {
            console.log("Failed to fetch document types");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to add lab
export const handleAddLab = async (e, labData, setLabData) => {
    e.preventDefault();
    try {
        const response = await Axios.post("http://localhost:4500/school/addLab", labData, {
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
                schoolName: "",
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

// Function to add equipment
export const handleAddEquipment = async (e, equipmentData, setEquipmentData) => {
    e.preventDefault();
    try {
        const response = await Axios.post("http://localhost:4500/school/addEquipment", equipmentData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setEquipmentData({
                equipmentName: "",
                equipmentType: "",
            });
        } else {
            toast.error("Equipment add failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while adding the equipment", {
            position: "top-center"
        });
    }
};