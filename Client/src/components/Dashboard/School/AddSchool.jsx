import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleAddSchool } from '../ApiHandler/schoolFunctions';

const AddUrl = () => {
    const [schoolData, setSchoolData] = useState({
        schoolName: "",
        state: "",
        address: "",
        geoLocation: "",
        schoolEmail: "",
        contactPerson: "",
        contactNo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchoolData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Add School</h1>
            </header>
            <form className="upload-document-form" onSubmit={(e) => handleAddSchool(e, schoolData, setSchoolData)}>
                <div className="form-group">
                    <label>School Name</label>
                    <input
                        type="text"
                        name="schoolName"
                        value={schoolData.schoolName}
                        onChange={handleChange}
                        placeholder="Enter School Name"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={schoolData.state}
                        onChange={handleChange}
                        placeholder="Enter State, Ex: Delhi.."
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={schoolData.address}
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
                        name="geoLocation"
                        value={schoolData.geoLocation}
                        onChange={handleChange}
                        placeholder="Longitude and Latitude"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>School Email ID</label>
                    <input
                        type="text"
                        name="schoolEmail"
                        value={schoolData.schoolEmail}
                        onChange={handleChange}
                        placeholder="Enter School Email ID (Optional)"
                        autoComplete='off'
                    />
                </div>
                <div className="form-group">
                    <label>Primary Contact Person</label>
                    <input
                        type="text"
                        name="contactPerson"
                        value={schoolData.contactPerson}
                        onChange={handleChange}
                        placeholder="Primary Contact Person"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contact No</label>
                    <input
                        type="text"
                        name="contactNo"
                        value={schoolData.contactNo}
                        onChange={handleChange}
                        placeholder="Primary Contact Person"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    {/* Add usage instructions here */}
                </ul>
            </div>
        </div>
    );
};

export default AddUrl;
