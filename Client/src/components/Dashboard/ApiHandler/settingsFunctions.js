import Axios from 'axios';
import { toast } from 'react-toastify';

// Function to fetch current system settings
export const fetchSettings = async (setLimit, setUpdatedBy, setLastUpdated, setAllowedToChange) => {
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
            if (setAllowedToChange) setAllowedToChange(response.data.data.allowedToChange);
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

// Function to fetch allocated and used space
export const fetchAllocatedUsedSpace = async (setTotalAllocatedSpace, setUsedSpace, setRemainingSpace, setSpaceLastUpdated, setSpaceUpdatedBy) => {
    try {
        const response = await Axios.get('http://localhost:4500/settings/fetchAllocatedUsedSpace', {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === 'success') {
            const { total_allocated_space, total_used_space } = response.data.data;
            const totalSpace = parseInt(total_allocated_space.value);
            const usedSpace = parseInt(total_used_space.value);
            if (setTotalAllocatedSpace) setTotalAllocatedSpace(totalSpace / (1024 * 1024)); // In GB
            if (setUsedSpace) setUsedSpace(usedSpace / (1024 * 1024));
            if (setRemainingSpace) setRemainingSpace(totalSpace - usedSpace);
            if (setSpaceLastUpdated) setSpaceLastUpdated(total_allocated_space.last_updated_on);
            if (setSpaceUpdatedBy) setSpaceUpdatedBy(total_allocated_space.updated_by);
        } else {
            console.error('Error fetching system settings:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching system settings:', error);
    }
};


// Function to update Allocated Space
export const submitNewAllocatedSpace = async (newAllocateSpace) => {
    if (!newAllocateSpace || newAllocateSpace.trim() === "") {
        toast.error("The new alloacte space is required", {
            position: "top-center"
        });
        return;
    }
    try {
        const response = await Axios.post("http://localhost:4500/settings/updateAllocatedSpace", { newAllocateSpace }, {
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

// Function to fetch doc formats
export const fetchDocFormats = async (setDocFormats) => {
    try {
        const response = await Axios.get("http://localhost:4500/settings/fetchDocFormats", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setDocFormats(response.data.data);
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to update doc format
export const updateDocFormatControl = async (id, control_id, setDocFormats) => {
    try {
        const response = await Axios.post("http://localhost:4500/settings/updateDocFormatControl", { id, control_id }, {
            headers: { Authorization: localStorage.getItem("token") },
        });
        if (response.data.status === "success") {
            setDocFormats(prevFormats => prevFormats.map(format =>
                format.id === id ? { ...format, control_id } : format
            ));
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            console.log("Failed to update document format");
        }
    } catch (error) {
        console.log(error);
    }
};