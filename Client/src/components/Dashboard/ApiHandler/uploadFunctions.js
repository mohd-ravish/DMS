import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to upload document
export const handleDocumentSubmit = async (e, limit, remainingSpace, setLoading, file, tags, docType, description, publish, setFile, setTags, setDocType, setDescription, setPublish, availableTags) => {
    e.preventDefault();
    const fileSize = file.size / 1024; // In KB
    if (fileSize > limit) {
        toast.error("File size exceeds the allowed limit", {
            position: "top-center"
        });
        return;
    }
    if (fileSize > remainingSpace) {
        toast.error("Not enough space available", {
            position: "top-center"
        });
        return;
    }
    setLoading(true);

    // Extract new tags
    const newTags = tags.filter(tag => tag.__isNew__);

    // Create new tags in the database and update tags array
    try {
        const updatedTags = [...tags];
        for (const newTag of newTags) {
            const response = await Axios.post(`${API_URL}/tags/createTag`, { tag_nm: newTag.label }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.status === "success") {
                const newTagId = response.data.data.id;
                availableTags.push({ value: newTagId, label: newTag.label });
                updatedTags.forEach(tag => {
                    if (tag.label === newTag.label) {
                        tag.value = newTagId;
                    }
                });
            } else {
                console.log("Failed to create tag");
            }
        }
        setTags(updatedTags); // Update state with correct tag IDs
    } catch (error) {
        console.log("An error occurred while creating tag");
        setLoading(false);
        return;
    }

    // Prepare form data for uploading document
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags.map(tag => tag.value));
    formData.append("docType", docType);
    formData.append("description", description);
    formData.append("publish", publish);

    // Upload document
    try {
        const response = await Axios.post(`${API_URL}/upload/uploadDocument`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setFile(null);
            setTags([]);
            setDocType("");
            setDescription("");
            setPublish("no");
        } else {
            toast.error(response.data.message, {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while uploading the document", {
            position: "top-center"
        });
    } finally {
        setLoading(false);
    }
};

// Function to upload url
export const handleUrlSubmit = async (e, infoHead, url, tags, docType, description, publish, setInfoHead, setUrl, setTags, setDocType, setDescription, setPublish, availableTags) => {
    e.preventDefault();
    // Extract new tags
    const newTags = tags.filter(tag => tag.__isNew__);
    
    // Create new tags in the database and update tags array
    try {
        const updatedTags = [...tags];
        for (const newTag of newTags) {
            const response = await Axios.post(`${API_URL}/tags/createTag`, { tag_nm: newTag.label }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.status === "success") {
                const newTagId = response.data.data.id;
                availableTags.push({ value: newTagId, label: newTag.label });
                updatedTags.forEach(tag => {
                    if (tag.label === newTag.label) {
                        tag.value = newTagId;
                    }
                });
            } else {
                console.log("Failed to create tag");
            }
        }
        setTags(updatedTags); // Update state with correct tag IDs
    } catch (error) {
        console.log("An error occurred while creating tag");
        return;
    }

    // Prepare form data for adding url
    const urlDetails = {
        infoHead: infoHead,
        url: url,
        tags: tags.map(tag => tag.value),
        docType: docType,
        description: description,
        publish: publish
    };

    // Add Url
    try {
        const response = await Axios.post(`${API_URL}/upload/addUrl`, urlDetails, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setInfoHead("");
            setUrl("");
            setTags([]);
            setDocType("");
            setDescription("");
            setPublish("no");
        } else {
            toast.error("URL add failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while adding the URL", {
            position: "top-center"
        });
    }
};

// Function to update document/url metadata
export const handleEditArtifact = async (e, docId, tags, setTags, docType, description, publish, availableTags) => {
    e.preventDefault();
    // Extract new tags
    const newTags = tags.filter(tag => tag.__isNew__);

    // Create new tags in the database and update tags array
    try {
        const updatedTags = [...tags];
        for (const newTag of newTags) {
            const response = await Axios.post(`${API_URL}/tags/createTag`, { tag_nm: newTag.label }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.status === "success") {
                const newTagId = response.data.data.id;
                availableTags.push({ value: newTagId, label: newTag.label });
                updatedTags.forEach(tag => {
                    if (tag.label === newTag.label) {
                        tag.value = newTagId;
                    }
                });
            } else {
                console.log("Failed to create tag");
            }
        }
        setTags(updatedTags); // Update state with correct tag IDs
    } catch (error) {
        console.log("An error occurred while creating tag");
        return;
    }

    // Prepare form data for uploading
    const editData = {
        tags: tags.map(tag => tag.value),
        docType: docType,
        description: description,
        publish: publish
    };

    // Upload document
    try {
        const response = await Axios.put(`${API_URL}/upload/updateDocument/${docId}`, editData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to update metadata", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while updating metadata", {
            position: "top-center"
        });
    }
};