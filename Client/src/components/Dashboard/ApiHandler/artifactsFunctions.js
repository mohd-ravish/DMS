import Axios from 'axios';
import { toast } from 'react-toastify';

// Function to fetch document types
export const fetchDocTypes = async (setDocTypes) => {
    try {
        const response = await Axios.get("http://localhost:4500/artifacts/documentTypes", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setDocTypes(response.data.data);
        } else {
            console.log("Failed to fetch document types");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to update doc types
export const handleDocTypeUpdate = async (editingDocTypeId, editedDocTypeValue, setAvailableDocTypes, availableDocTypes, setEditingDocTypeId) => {
    if (!editedDocTypeValue || editedDocTypeValue.trim() === "") {
        return;
    }
    try {
        const response = await Axios.put(`http://localhost:4500/artifacts/updateDocTypes/${editingDocTypeId}`, {
            docTypeName: editedDocTypeValue
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setAvailableDocTypes(availableDocTypes.map(docType => {
                if (docType.id === editingDocTypeId) {
                    return { ...docType, doctype_nm: editedDocTypeValue };
                }
                return docType;
            }));
            setEditingDocTypeId("");
        } else {
            toast.error("Failed to update Doc type", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to add new doc type
export const handleAddNewDocType = async (e, newDocTypeName, setNewDocTypeName, availableDocTypes, setAvailableDocTypes) => {
    e.preventDefault();
    try {
        const response = await Axios.post("http://localhost:4500/artifacts/addNewDocType", { newDocTypeName }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setNewDocTypeName("");
            const newDocType = {
                id: response.data.data,
                doctype_nm: newDocTypeName,
            };
            setAvailableDocTypes([...availableDocTypes, newDocType]);
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            console.log("Failed to add doc type");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to add new doc type
export const handleDeleteDocType = async (docTypeId, availableDocTypes, setAvailableDocTypes) => {
    try {
        const response = await Axios.delete(`http://localhost:4500/artifacts/deleteDoctype/${docTypeId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setAvailableDocTypes(availableDocTypes.filter(docType => docType.id !== docTypeId));
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            console.log("Failed to delete doc type");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch user's artifacts
export const fetchMyArtifacts = async (setArtifacts) => {
    try {
        const response = await Axios.get("http://localhost:4500/artifacts/myArtifacts", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setArtifacts(response.data.data);
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch all artifacts
export const fetchAllArtifacts = async (setAllArtifacts) => {
    try {
        const response = await Axios.get("http://localhost:4500/artifacts/allArtifacts", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setAllArtifacts(response.data.data);
        } else {
            console.log(response);

        }
    } catch (error) {
        console.log(error);
    }
};

// Function to delete artifacts
export const handleDeleteArtifact = async (docId) => {
    try {
        const response = await Axios.delete(`http://localhost:4500/artifacts/deleteArtifact/${docId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Document delete failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while deleting the document", {
            position: "top-center"
        });
    }
};

// Function to fetch top 10 contributers
export const fetchTopContributors = async (setContributors) => {
    try {
        const response = await Axios.get('http://localhost:4500/artifacts/topContributors');
        if (response.data.status === 'success') {
            setContributors(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching top contributors:', error);
    }
};

// Function to fetch artifacts count
export const fetchArtifactsCounts = async (setTotalDocsCount, setTotalUrlsCount) => {
    try {
        const response = await Axios.get('http://localhost:4500/artifacts/countArtifacts');
        if (response.data.status === 'success') {
            setTotalDocsCount(response.data.data.total_docs);
            setTotalUrlsCount(response.data.data.total_urls);
        }
    } catch (error) {
        console.error('Error fetching artifact counts:', error);
    }
};