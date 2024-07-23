import Axios from 'axios';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const API_URL = process.env.REACT_APP_API_URL;

export const handleSessionSetup = async (e, sessionData, attendeesFile, setSessionData, setAttendeesFile) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in sessionData) {
        formData.append(key, sessionData[key]);
    }
    formData.append('file', attendeesFile);

    try {
        const response = await Axios.post(`${API_URL}/sessions/sessionSetup`, formData, {
            headers: {
                Authorization: localStorage.getItem("token"),
                'Content-Type': 'multipart/form-data',
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
            });
            setAttendeesFile(null);
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

// Function to fetch user's sessions
export const fetchMySessions = async (setSessions) => {
    try {
        const response = await Axios.get(`${API_URL}/sessions/getMySessions`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setSessions(response.data.data);
        } else {
            console.log("Failed to fetch sessions");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to fetch all sessions
export const fetchAllSessions = async (setSessions) => {
    try {
        const response = await Axios.get(`${API_URL}/sessions/getAllSessions`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setSessions(response.data.data);
        } else {
            console.log("Failed to fetch sessions");
        }
    } catch (error) {
        console.log(error);
    }
};

// Function to update session data
export const handleEditSessionData = async (e, sessionId, sessionStatus) => {
    e.preventDefault();
    try {
        const response = await Axios.put(`${API_URL}/sessions/updateSessionData/${sessionId}`, { sessionStatus }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Failed to update session data", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while updating session data", {
            position: "top-center"
        });
    }
};

// Function to delete session
export const handleDeleteSession = async (sessionId, sessions, setSessions, handleClose) => {
    try {
        const response = await Axios.delete(`${API_URL}/sessions/deleteSession/${sessionId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if (response.data.status === "success") {
            setSessions(sessions.filter(session => session.id !== sessionId));
            handleClose();
            toast.success(response.data.message, {
                position: "top-center"
            });
        } else {
            toast.error("Session delete failed", {
                position: "top-center"
            });
        }
    } catch (error) {
        toast.error("An error occurred while deleting the session", {
            position: "top-center"
        });
    }
};

// Function to fetch the student list from public/sessions folder
export const fetchStudentList = async (sessionFolderName, setStudents) => {
    try {
        const response = await Axios.get(`${API_URL}/sessions/getStudentList/${sessionFolderName}`, {
            responseType: 'arraybuffer',
        });
        const arrayBuffer = response.data;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setStudents(data);
    } catch (error) {
        toast.error("Failed to load student list.");
    }
};

// Function to save the student list 
export const handleSaveStudentList = async (sessionFolderName, students, handleStudentListClose) => {
    try {
        // Update the XLS file with the new attendance data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(students);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const formData = new FormData();
        formData.append('file', blob, 'attendees.xlsx');

        // Send the updated file to the server
        await Axios.post(`${API_URL}/sessions/saveStudentsList/${sessionFolderName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem("token"),
            }
        });
        handleStudentListClose();
        toast.success("Student attendance updated successfully", {
            position: "top-center"
        });
    } catch (error) {
        toast.error("Failed to update student attendance.");
    }
};