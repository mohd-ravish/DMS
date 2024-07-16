import Axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add school
export const handleSessionSetup = async (e, sessionData, setSessionData) => {
    e.preventDefault();
    try {
        const response = await Axios.post(`${API_URL}/sessions/sessionSetup`, sessionData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
            setSessionData({
                sessionTitle: "",
                sessionHost: "",
                sessionDate: "",
                sessionTime: "",
                schoolId: "",
                labId: "",
                invitees: ""
            });
        } else {
            toast.error("Session setup failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while setting up the session", {
            position: "top-center"
        });
    }
};