import Axios from 'axios';
import { toast } from 'react-toastify';

// Function to fetch tags for editing
export const fetchTags = async (setAvailableTags) => {
    try {
        const response = await Axios.get("http://localhost:4500/tags/allTags", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setAvailableTags(response.data.data);
        } else {
            console.log("Failed to fetch tags");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch tags for document/Url upload
export const fetchUploadTags = async (setAvailableTags) => {
    try {
        const response = await Axios.get("http://localhost:4500/tags/allTags", {
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
            console.log("Failed to fetch tags");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to handle tag change/add new tags
export const handleTagChange = async (newValue, availableTags, setAvailableTags, tags, setTags) => {
    if (newValue.length > 10) {
        toast.warn("You can only add up to 10 tags.", {
            position: "top-center"
        });
        return;
    }
    const newTags = newValue.filter(option => option.__isNew__);
    if (newTags.length > 0) {
        try {
            const response = await Axios.post("http://localhost:4500/tags/createTag", { tag_nm: newTags[0].label }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.status === "success") {
                const newTagId = response.data.data.id;
                setAvailableTags([...availableTags, { value: newTagId, label: newTags[0].label }]);
                setTags([...tags, { value: newTagId, label: newTags[0].label }]);
            } else {
                console.log("Failed to create tag");
            }
        } catch (error) {
            console.log("An error occurred while creating tag");
        }
    } else {
        setTags(newValue);
    }
};

// Function to update tags
export const handleTagUpdate = async (editingTagId, editedTagValue, setAvailableTags, availableTags, setEditingTagId) => {
    if (!editedTagValue || editedTagValue.trim() === "") {
        return;
    }
    try {
        const response = await Axios.put(`http://localhost:4500/tags/updateTags/${editingTagId}`, {
            tagName: editedTagValue
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success("Tag updated successfully", {
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
            toast.error("Failed to update Tag", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to save searched tag 
export const saveSearchedTag = async (tagName) => {
    try {
        const response = await Axios.post('http://localhost:4500/tags/saveSearchedTag', { tagName }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            return response.data;
        } else {
            console.log("Failed to save searched tag")
        }
    } catch (error) {
        console.error("Error saving searched tag:", error);
        return { status: 'fail', message: error.message };
    }
};

// Function to get top 10 searched tags
export const fetchTopSearchedTags = async (setSearchedTags) => {
    try {
        const response = await Axios.get('http://localhost:4500/tags/topSearchedTags');
        if (response.data.status === 'success') {
            setSearchedTags(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching top searched tags:', error);
    }
};

// Function to get total searches and total searches in the current month
export const fetchSearchesCounts = async (setTotalSearches, setCurrentMonthSearches) => {
    try {
        const response = await Axios.get('http://localhost:4500/tags/countSearches');
        if (response.data.status === 'success') {
            setTotalSearches(response.data.data.total_searches);
            setCurrentMonthSearches(response.data.data.current_month_searches);
        }
    } catch (error) {
        console.error('Error fetching searches counts:', error);
    }
};
