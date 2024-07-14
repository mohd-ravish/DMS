import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllSchools } from '../ApiHandler/schoolFunctions';
import { fetchLabsForSchool } from '../ApiHandler/labFunctions';
import { fetchAllEquipments, handleAllocateEquipment } from '../ApiHandler/equipmentFunctions';

const EquipmentAllocation = () => {
    const [equipmentData, setEquipmentData] = useState({
        equipmentId: "",
        schoolId: "",
        labId: "",
    });

    const [equipmentNames, setEquipmentNames] = useState([]);
    const [schoolNames, setSchoolNames] = useState([]);
    const [labs, setLabs] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === "schoolId") {
            fetchLabsForSchool(value, setLabs);
        }
    };

    useEffect(() => {
        fetchAllEquipments(setEquipmentNames);
        fetchAllSchools(setSchoolNames);
    }, []);

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Equipment Allocation and Tracking</h1>
            </header>
            <form className="upload-document-form" onSubmit={(e) => handleAllocateEquipment(e, equipmentData, setEquipmentData)}>
                <div className="form-group">
                    <label>Equipment Name</label>
                    <select name="equipmentId" value={equipmentData.equipmentId} onChange={handleChange} required>
                        <option value="">Select</option>
                        {equipmentNames.map((equipment) => (
                            <option key={equipment.id} value={equipment.id}>
                                {equipment.equipment_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>School Name</label>
                    <select name="schoolId" value={equipmentData.schoolId} onChange={handleChange} required>
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
                    <select name="labId" value={equipmentData.labId} onChange={handleChange} required>
                        <option value="">Select</option>
                        {labs.map((lab) => (
                            <option key={lab.id} value={lab.id}>
                                {lab.lab_name}
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
}

export default EquipmentAllocation;