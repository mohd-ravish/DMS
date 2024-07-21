import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllSchools } from '../ApiHandler/schoolFunctions';
import { fetchLabsForSchool } from '../ApiHandler/labFunctions';
import { fetchAllEquipments, handleAllocateEquipment } from '../ApiHandler/equipmentFunctions';

const EquipmentAllocation = () => {
    const [equipmentData, setEquipmentData] = useState({
        equipmentId: "",
        schoolId: "",
        labId: "",
        allocatedQuantity: "",
    });

    const [equipments, setEquipments] = useState([]);
    const [schools, setSchools] = useState([]);
    const [labs, setLabs] = useState([]);
    const [availableQuantity, setAvailableQuantity] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === "equipmentId") {
            const selectedEquipment = equipments.find(equipment => equipment.id === parseInt(value));
            setAvailableQuantity(selectedEquipment ? selectedEquipment.equipment_quantity : 0);
        }
        if (name === "allocatedQuantity") {
            const quantity = parseInt(value);
            if (quantity > availableQuantity) {
                toast.warning(`The maximum available quantity is ${availableQuantity}`, {
                    position: "top-center"
                });
                setEquipmentData(prevData => ({
                    ...prevData,
                    [name]: availableQuantity
                }));
            }
            else {
                setEquipmentData(prevData => ({
                    ...prevData,
                    [name]: quantity
                }));
            }
        }
        if (name === "schoolId") {
            fetchLabsForSchool(value, setLabs);
        }
    };

    useEffect(() => {
        fetchAllEquipments(setEquipments);
        fetchAllSchools(setSchools);
    }, []);

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Equipment Allocation and Tracking</h1>
            </header>
            <form className="upload-document-form" onSubmit={(e) => handleAllocateEquipment(e, equipmentData, setEquipmentData)}>
                <div className='in-row-input'>
                    <div className="form-group">
                        <label>Equipment Name</label>
                        <select name="equipmentId" value={equipmentData.equipmentId} onChange={handleChange} required>
                            <option value="">Select</option>
                            {equipments.map((equipment) => (
                                <option key={equipment.id} value={equipment.id}>
                                    {equipment.equipment_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Available Quantity</label>
                        <input
                            type="number"
                            value={availableQuantity}
                            placeholder="Available Quantity"
                            readOnly
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Quantity to Allocate</label>
                    <input
                        type="number"
                        name="allocatedQuantity"
                        value={equipmentData.allocatedQuantity}
                        onChange={handleChange}
                        placeholder="Enter Quantity to Allocate"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>School Name</label>
                    <select name="schoolId" value={equipmentData.schoolId} onChange={handleChange} required>
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
