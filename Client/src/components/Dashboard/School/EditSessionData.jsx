import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllSchools } from '../ApiHandler/schoolFunctions';
import { fetchLabsForSchool, fetchAllLabs } from '../ApiHandler/labFunctions';
import { handleEditSessionData, handleDeleteSession } from '../ApiHandler/sessionFunctions';
import StudentList from './StudentList'; // Import the new component

const EditSessionData = ({ editFormData, sessions, setSessions, handleClose }) => {
    const [newSessionData, setNewSessionData] = useState({ ...editFormData });
    const [schools, setSchools] = useState([]);
    const [labs, setLabs] = useState([]);
    const [showStudentList, setShowStudentList] = useState(false); // State to manage the overlay visibility
    const readOnlySection = (editFormData.session_status);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSessionData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === "school_id") {
            fetchLabsForSchool(value, setLabs);
        }
    };

    useEffect(() => {
        fetchAllSchools(setSchools);
        fetchAllLabs(setLabs);
    }, []);

    const handleStudentListClose = () => {
        setShowStudentList(false); // Function to close the overlay
    };

    return (
        <div className="edit-document-container my-entries-edit-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Edit Session Data</h1>
            </header>
            <form className="edit-document-form">
                <div className="form-group">
                    <label>Session ID</label>
                    <span className="document-id">{newSessionData.session_id}</span>
                </div>
                {readOnlySection === 'closed' ? (
                    <div>
                        <div className="form-group">
                            <label>Session Title</label>
                            <h3>{editFormData.session_title}</h3>
                        </div>
                        <div className="form-group">
                            <label>Session Host</label>
                            <p>{editFormData.session_host}</p>
                        </div>
                        <div className="form-group">
                            <label>Session Date</label>
                            <p>{editFormData.session_date}</p>
                        </div>
                        <div className="form-group">
                            <label>Session Time</label>
                            <p>{editFormData.session_time}</p>
                        </div>
                        <div className="form-group">
                            <label>School Name</label>
                            <p>{editFormData.school_name}</p>
                        </div>
                        <div className="form-group">
                            <label>Lab Name</label>
                            <p>{editFormData.lab_name}</p>
                        </div>
                        <div className="form-group">
                            <label>Session Status</label>
                            <p>{editFormData.session_status}</p>
                        </div>
                        <div className="form-group">
                            <label>Attendees Count</label>
                            <p>{editFormData.attendees_count}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label>Session Title</label>
                            <input
                                type="text"
                                name="session_title"
                                value={newSessionData.session_title}
                                onChange={handleChange}
                                placeholder="Enter Session Title"
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Session Host</label>
                            <input
                                type="text"
                                name="session_host"
                                value={newSessionData.session_host}
                                onChange={handleChange}
                                placeholder="Enter session host name"
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className='in-row-input'>
                            <div className="form-group">
                                <label>Session Date</label>
                                <input
                                    type="date"
                                    name="session_date"
                                    value={newSessionData.session_date}
                                    onChange={handleChange}
                                    placeholder="Enter Session Date"
                                    autoComplete='off'
                                    required
                                />
                            </div>
                            <div className="form-group geo-location-container">
                                <label>Session Time</label>
                                <input
                                    type="text"
                                    name="session_time"
                                    value={newSessionData.session_time}
                                    onChange={handleChange}
                                    placeholder="Enter Session Time"
                                    autoComplete='off'
                                    required
                                />
                            </div>
                        </div>
                        <div className='in-row-input'>
                            <div className="form-group">
                                <label>School Name</label>
                                <select name="school_id" value={newSessionData.school_id} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    {schools.map((school) => (
                                        <option key={school.id} value={school.id}>
                                            {school.school_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Lab Name</label>
                                <select name="lab_id" value={newSessionData.lab_id} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    {labs.map((lab) => (
                                        <option key={lab.id} value={lab.id}>
                                            {lab.lab_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Session Status</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="session_status"
                                        value="open"
                                        checked={newSessionData.session_status === 'open'}
                                        onChange={handleChange}
                                    /> Open
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="session_status"
                                        value="closed"
                                        checked={newSessionData.session_status === 'closed'}
                                        onChange={handleChange}
                                    /> Closed
                                </label>
                            </div>
                        </div>
                        <div className="form-group student-list-button">
                            <label>Mark Attendees</label>
                            <button type="button" onClick={() => setShowStudentList(true)}>Open List</button>
                        </div>
                    </div>
                )}
                <div className="form-actions">
                    <div>
                        <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
                        {readOnlySection === 'open' ? (
                            <button
                                type="button"
                                className="update-btn"
                                onClick={(e) => {
                                    if (window.confirm(`After closing the session you won't be able to edit the details and mark the attendees!!`)) {
                                        handleEditSessionData(e, editFormData.id, newSessionData, handleClose)
                                    }
                                }}
                            >Update
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                    {readOnlySection === 'open' ? (
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => {
                                if (window.confirm(`Are you sure you want to delete the session`)) {
                                    handleDeleteSession(newSessionData.id, sessions, setSessions, handleClose);
                                }
                            }}>Delete Session
                        </button>
                    ) : ("")}
                </div>
            </form>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    {/* Add usage instructions here */}
                </ul>
            </div>
            {showStudentList && (
                <StudentList sessionFolderName={newSessionData.session_folder_name} handleStudentListClose={handleStudentListClose} />
            )}
        </div>
    );
};

export default EditSessionData;