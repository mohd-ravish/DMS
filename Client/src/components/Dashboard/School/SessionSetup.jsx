import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllSchools } from '../ApiHandler/schoolFunctions';
import { fetchLabsForSchool } from '../ApiHandler/labFunctions';
import { handleSessionSetup } from '../ApiHandler/sessionFunctions';

const SessionSetup = () => {
    const [sessionData, setSessionData] = useState({
        sessionTitle: "",
        sessionHost: "",
        sessionDate: "",
        sessionTime: "",
        schoolId: "",
        labId: "",
        invitees: ""
    });

    const [schoolNames, setSchoolNames] = useState([]);
    const [labs, setLabs] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSessionData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === "schoolId") {
            fetchLabsForSchool(value, setLabs);
        }
    };

    useEffect(() => {
        fetchAllSchools(setSchoolNames);
    }, []);

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Session Setup</h1>
            </header>
            <form className="upload-document-form" onSubmit={(e) => handleSessionSetup(e, sessionData, setSessionData)}>
                <div className="form-group">
                    <label>Session Title</label>
                    <input
                        type="text"
                        name="sessionTitle"
                        value={sessionData.sessionTitle}
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
                        name="sessionHost"
                        value={sessionData.sessionHost}
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
                            name="sessionDate"
                            value={sessionData.sessionDate}
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
                            name="sessionTime"
                            value={sessionData.sessionTime}
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
                        <select name="schoolId" value={sessionData.schoolId} onChange={handleChange} required>
                            <option value="">Select</option>
                            {schoolNames.map((school) => (
                                <option key={school.id} value={school.id}>
                                    {school.school_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Lab Name</label>
                        <select name="labId" value={sessionData.labId} onChange={handleChange} required>
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
                    <label>List Of Invitees</label>
                    <input
                        type="text"
                        name="invitees"
                        value={sessionData.invitees}
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

export default SessionSetup;
