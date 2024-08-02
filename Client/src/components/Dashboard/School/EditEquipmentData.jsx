import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleEditEquipmentData, handleDeleteEquipment } from '../ApiHandler/equipmentFunctions';

const EditEquipmentData = ({ editFormData, equipments, setEquipments, handleClose }) => {
    const [newEquipmentData, setNewEquipmentData] = useState({ ...editFormData });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEquipmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="edit-document-container my-entries-edit-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Edit Equipment Data</h1>
            </header>
            <form className="edit-document-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Equipment ID</label>
                    <span className="document-id">{newEquipmentData.equipment_id}</span>
                </div>
                <div className="form-group">
                    <label>Equipment Name</label>
                    <input
                        type="text"
                        name="equipment_name"
                        value={newEquipmentData.equipment_name}
                        onChange={handleChange}
                        placeholder="Enter equipment Name"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Type</label>
                    <input
                        type="text"
                        name="equipment_type"
                        value={newEquipmentData.equipment_type}
                        onChange={handleChange}
                        placeholder="Enter equipment type if there is any"
                        autoComplete='off'
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Quantity</label>
                    <input
                        type="number"
                        name="equipment_quantity"
                        value={newEquipmentData.equipment_quantity}
                        onChange={handleChange}
                        placeholder="Enter Quantity of Equipment"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-actions">
                    <div>
                        <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
                        <button type="button" className="update-btn" onClick={(e) => handleEditEquipmentData(e, editFormData.id, newEquipmentData)}>Update</button>
                    </div>
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to delete the equipment`)) {
                                handleDeleteEquipment(editFormData.id, equipments, setEquipments, handleClose);
                            }
                        }}>Delete Equipment</button>

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

export default EditEquipmentData;
