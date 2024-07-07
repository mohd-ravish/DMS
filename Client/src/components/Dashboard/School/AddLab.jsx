import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSchoolNames, handleAddLab } from '../ApiHandler/schoolFunctions';

const AddLab = () => {
    const [labData, setLabData] = useState({
        labName: "",
        labType: "",
        schoolId: "",
    });

    const [schoolNames, setSchoolNames] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLabData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchSchoolNames(setSchoolNames);
    }, []);

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Add Lab</h1>
            </header>
            <form className="upload-document-form" onSubmit={(e) => handleAddLab(e, labData, setLabData)}>
                <div className="form-group">
                    <label>Lab Name</label>
                    <input
                        type="text"
                        name="labName"
                        value={labData.labName}
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
                        name="labType"
                        value={labData.labType}
                        onChange={handleChange}
                        placeholder="Enter Lab Type if there is any"
                        autoComplete='off'
                    />
                </div>
                <div className="form-group">
                    <label>School Name</label>
                    <select name="schoolId" value={labData.schoolId} onChange={handleChange} required>
                        <option value="">Select</option>
                        {schoolNames.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.school_name}
                            </option>
                        ))}
                    </select>
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

export default AddLab;
