import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleEditSchoolData, handleDeleteSchool } from '../ApiHandler/schoolFunctions';

const EditSchoolData = ({ editFormData, schools, setSchools, handleClose }) => {
    const [newSchoolData, setNewSchoolData] = useState({ ...editFormData });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSchoolData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="edit-document-container my-entries-edit-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Edit School Data</h1>
            </header>
            <form className="edit-document-form" onSubmit={(e) => handleEditSchoolData(e, editFormData.id, newSchoolData)}>
                <div className="form-group">
                    <label>School ID</label>
                    <span className="document-id">{newSchoolData.school_id}</span>
                </div>
                <div className="form-group">
                    <label>School Name</label>
                    <input
                        type="text"
                        name="school_name"
                        value={newSchoolData.school_name}
                        onChange={handleChange}
                        placeholder="Enter School Name"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={newSchoolData.address}
                        onChange={handleChange}
                        placeholder="Enter School Address"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Geo Location</label>
                    <input
                        type="text"
                        name="geo_location"
                        value={newSchoolData.geo_location}
                        onChange={handleChange}
                        placeholder="Enter Geo Location"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>School Email ID</label>
                    <input
                        type="text"
                        name="school_email_id"
                        value={newSchoolData.school_email_id}
                        onChange={handleChange}
                        placeholder="Enter School Email ID"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Primary Contact Person</label>
                    <input
                        type="text"
                        name="primary_contact_person"
                        value={newSchoolData.primary_contact_person}
                        onChange={handleChange}
                        placeholder="Enter Primary Contact Person"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contact No</label>
                    <input
                        type="text"
                        name="contact_no"
                        value={newSchoolData.contact_no}
                        onChange={handleChange}
                        placeholder="Enter Contact No"
                        autoComplete='off'
                        required
                    />
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
                            if (window.confirm(`Are you sure you want to delete the school`)) {
                                handleDeleteSchool(editFormData.id, schools, setSchools, handleClose);
                            }
                        }}>Delete School</button>

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
