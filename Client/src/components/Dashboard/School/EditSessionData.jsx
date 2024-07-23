import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleEditSessionData, handleDeleteSession } from '../ApiHandler/sessionFunctions';
import StudentList from './StudentList'; // Import the new component

const EditSessionData = ({ editFormData, sessions, setSessions, handleClose }) => {
    const [sessionStatus, setSessionStatus] = useState(editFormData.session_status);
    const [showStudentList, setShowStudentList] = useState(false); // State to manage the overlay visibility

    const handleStudentListClose = () => {
        setShowStudentList(false); // Function to close the overlay
    };

    return (
        <div className="edit-document-container my-entries-edit-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Edit Session Data</h1>
            </header>
            <form className="edit-document-form" onSubmit={(e) => handleEditSessionData(e, editFormData.id, sessionStatus)}>
                <div className="form-group">
                    <label>Session ID</label>
                    <span className="document-id">{editFormData.session_id}</span>
                </div>
                <div className="form-group">
                    <label>Session Title</label>
                    <h3>{editFormData.session_title}</h3>
                </div>
                <div className="form-group">
                    <label>Session Host</label>
                    <p>{editFormData.session_host}</p>
                </div>
                <div className="form-group">
                    <label>Session Status</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="session_status"
                                value="open"
                                checked={sessionStatus === 'open'}
                                onChange={() => { setSessionStatus('open') }}
                            /> Open
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="session_status"
                                value="closed"
                                checked={sessionStatus === 'closed'}
                                onChange={() => { setSessionStatus('closed') }}
                            /> Closed
                        </label>
                    </div>
                </div>
                <div className="form-group student-list-button">
                    <label>List of Students</label>
                    <button type="button" onClick={() => setShowStudentList(true)}>Open</button>
                </div>
                <div className="form-actions">
                    <div>
                        <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="update-btn">Update</button>
                    </div>
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to delete the session`)) {
                                handleDeleteSession(editFormData.id, sessions, setSessions, handleClose);
                            }
                        }}>Delete Session</button>
                </div>
            </form>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    {/* Add usage instructions here */}
                </ul>
            </div>
            {showStudentList && (
                <StudentList sessionFolderName={editFormData.session_folder_name} handleStudentListClose={handleStudentListClose} />
            )}
        </div>
    );
};

export default EditSessionData;
