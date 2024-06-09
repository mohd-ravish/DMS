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
            toast.success("Doc type updated successfully", {
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
            toast.error("Failed to update Tag", {
                position: "top-center"
            });
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
            toast.success("Document Deleted successfully", {
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