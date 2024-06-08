import Axios from 'axios';

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