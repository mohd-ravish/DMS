import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add equipment
export const handleAddEquipment = async (e, equipmentData, setEquipmentData) => {
    e.preventDefault();
    try {
        const response = await Axios.post(`${API_URL}/equipments/addEquipment`, equipmentData, {
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

// Function to fetch user's equipments
export const fetchMyEquipments = async (setMyEquipments) => {
    try {
        const response = await Axios.get(`${API_URL}/equipments/getMyEquipments`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setMyEquipments(response.data.data);
        } else {
            console.log("Failed to fetch equipments");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch equipments
export const fetchAllEquipments = async (setEquipmentNames) => {
    try {
        const response = await Axios.get(`${API_URL}/equipments/getAllEquipments`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setEquipmentNames(response.data.data);
        } else {
            console.log("Failed to fetch equipment names");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to handle equipment aallocation
export const handleAllocateEquipment = async (e, equipmentData, setEquipmentData) => {
    e.preventDefault();
    try {
        const response = await Axios.post(`${API_URL}/equipments/allocateEquipment`, equipmentData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setEquipmentData({
                equipmentId: "",
                schoolId: "",
                labId: "",
            });
        } else {
            toast.error("Equipment allocation failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while allocating the equipment", {
            position: "top-center"
        });
    }
};

// Function to update equipment data
export const handleEditEquipmentData = async (e, equipmentId, newEquipmentData) => {
    e.preventDefault();
    try {
        const response = await Axios.put(`${API_URL}/equipments/updateEquipmentData/${equipmentId}`, newEquipmentData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to update equipment data", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while updating equipment data", {
            position: "top-center"
        });
    }
};

// Function to delete equipment
export const handleDeleteEquipment = async (equipmentId, myEquipments, setMyEquipments, handleClose) => {
    try {
        const response = await Axios.delete(`${API_URL}/equipments/deleteEquipment/${equipmentId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setMyEquipments(myEquipments.filter(equipment => equipment.id !== equipmentId));
            handleClose();
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Equipment delete failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while deleting the equipment", {
            position: "top-center"
        });
    }
};