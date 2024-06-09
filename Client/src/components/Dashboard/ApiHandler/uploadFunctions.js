import Axios from 'axios';
import { toast } from 'react-toastify';

// Function to upload document
export const handleDocumentSubmit = async (file, tags, docType, description, publish, setFile, setTags, setDocType, setDescription, setPublish) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags.map(tag => tag.value));
    formData.append("docType", docType);
    formData.append("description", description);
    formData.append("publish", publish);

    try {
        const response = await Axios.post("http://localhost:4500/upload/uploadDocument", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success("Document uploaded successfully", {
                position: "top-center"
            });
            setFile(null);
            setTags([]);
            setDocType("");
            setDescription("");
            setPublish("no");
        } else {
            toast.error("Document upload failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while uploading the document", {
            position: "top-center"
        });
    }
};

// Function to upload url
export const handleUrlSubmit = async (infoHead, url, tags, docType, description, publish, setInfoHead, setUrl, setTags, setDocType, setDescription, setPublish) => {
    const urlDetails = {
        infoHead: infoHead,
        url: url,
        tags: tags.map(tag => tag.value),
        docType: docType,
        description: description,
        publish: publish
    };

    try {
        const response = await Axios.post("http://localhost:4500/upload/addUrl", urlDetails, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success("URL added successfully", {
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
export const handleEditArtifact = async (docId, tags, docType, description, publish, status) => {
    const editData = {
        tags: tags.map(tag => tag.value),
        docType: docType,
        description: description,
        publish: publish,
        status: status
    };
    try {
        const response = await Axios.put(`http://localhost:4500/upload/updateDocument/${docId}`, editData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success("Your document metadata successfully updated", {
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