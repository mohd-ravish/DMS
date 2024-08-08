import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to fetch tags for editing
export const fetchTags = async (setAvailableTags) => {
    try {
        const response = await Axios.get(`${API_URL}/tags/fetchAllTags`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setAvailableTags(response.data.data);
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch tags for document/Url upload
export const fetchUploadTags = async (setAvailableTags) => {
    try {
        const response = await Axios.get(`${API_URL}/tags/fetchAllTags`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setAvailableTags(response.data.data.map(tag => ({
                value: tag.id,
                label: tag.tag_nm,
            })));
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to update tags
export const handleTagUpdate = async (editingTagId, editedTagValue, setAvailableTags, availableTags, setEditingTagId) => {
    if (!editedTagValue || editedTagValue.trim() === "") {
        return;
    }
    try {
        const response = await Axios.put(`${API_URL}/tags/updateTag/${editingTagId}`, {
            tagName: editedTagValue
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            // Update the local state with the updated tag value
            setAvailableTags(availableTags.map(tag => {
                if (tag.id === editingTagId) {
                    return { ...tag, tag_nm: editedTagValue };
                }
                return tag;
            }));
            setEditingTagId("");
        } else {
            toast.error("Failed to update Tag!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while updating tag!", {
            position: "top-center"
        });
    }
};

// Function to save searched tag 
export const saveSearchedTag = async (tagId, tagName) => {
    try {
        const response = await Axios.post(`${API_URL}/tags/saveSearchedTag`, { tagId, tagName }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            return response.data;
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to get top 10 searched tags
export const fetchTopSearchedTags = async (setSearchedTags) => {
    try {
        const response = await Axios.get(`${API_URL}/tags/getTopSearchedTags`);
        if (response.data.status === 'success') {
            setSearchedTags(response.data.data);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to get total searches and total searches in the current month
export const fetchSearchesCounts = async (setTotalSearches, setCurrentMonthSearches) => {
    try {
        const response = await Axios.get(`${API_URL}/tags/getCountSearches`);
        if (response.data.status === 'success') {
            setTotalSearches(response.data.data.total_searches);
            setCurrentMonthSearches(response.data.data.current_month_searches);
        }
    } catch (error) {
        console.log(error);
    }
};
