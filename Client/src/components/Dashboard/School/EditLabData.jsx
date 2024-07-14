import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllSchools } from '../ApiHandler/schoolFunctions';
import {handleEditLabData, handleDeleteLab} from '../ApiHandler/labFunctions';

const EditSchoolData = ({ editFormData, myLabs, setMyLabs, handleClose }) => {
    const [newLabData, setNewLabData] = useState({ ...editFormData });
    const [schoolNames, setSchoolNames] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLabData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchAllSchools(setSchoolNames);
    }, []);

    return (
        <div className="edit-document-container my-entries-edit-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Edit Lab Data</h1>
            </header>
            <form className="edit-document-form" onSubmit={(e) => handleEditLabData(e, editFormData.id, newLabData)}>
                <div className="form-group">
                    <label>Lab ID</label>
                    <span className="document-id">{newLabData.lab_id}</span>
                </div>
                <div className="form-group">
                    <label>Lab Name</label>
                    <input
                        type="text"
                        name="lab_name"
                        value={newLabData.lab_name}
                        onChange={handleChange}
                        placeholder="Enter Lab Name"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Lab Type</label>
                    <input
                        type="text"
                        name="lab_type"
                        value={newLabData.lab_type}
                        onChange={handleChange}
                        placeholder="Enter Lab type if there is any"
                        autoComplete='off'
                    />
                </div>
                <div className="form-group">
                    <label>School Name</label>
                    <select name="school_id" value={newLabData.school_id} onChange={handleChange} required>
                        <option value="">Select</option>
                        {schoolNames.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.school_name}
                            </option>
                        ))}
                    </select>
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
                            if (window.confirm(`Are you sure you want to delete the lab`)) {
                                handleDeleteLab(editFormData.id, myLabs, setMyLabs, handleClose);
                            }
                        }}>Delete Lab</button>

                </div>
            </form>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    {/* Add usage instructions here */}
                </ul>
            </div>
        </div>
    )
}

export default EditSchoolData;
