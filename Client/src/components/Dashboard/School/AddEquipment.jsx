import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleAddEquipment } from '../ApiHandler/schoolFunctions';

const AddEquipment = () => {
    const [equipmentData, setEquipmentData] = useState({
        equipmentName: "",
        equipmentType: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Add Equipment</h1>
            </header>
            <form className="upload-document-form" onSubmit={(e) => handleAddEquipment(e, equipmentData, setEquipmentData)}>
                <div className="form-group">
                    <label>Equipment Name</label>
                    <input
                        type="text"
                        name="equipmentName"
                        value={equipmentData.equipmentName}
                        onChange={handleChange}
                        placeholder="Enter Equipment Name"
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Type</label>
                    <input
                        type="text"
                        name="equipmentType"
                        value={equipmentData.equipmentType}
                        onChange={handleChange}
                        placeholder="Enter Equipment Type if there is any"
                        autoComplete='off'
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

export default AddEquipment;
