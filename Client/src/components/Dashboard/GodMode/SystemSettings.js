import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

const SystemSettings = ({ limit, updatedBy, lastUpdated }) => {
    const [newLimit, setNewLimit] = useState("");

    useEffect(() => {
        setNewLimit(limit);
    }, [limit]);

    // Function to update the system settings
    const handleSystemSettings = async () => {
        try {
            const response = await Axios.post("http://localhost:4500/updateSystemSettings", { newLimit }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.status === "success") {
                toast.success("System settings updated successfully", {
                    position: "top-center"
                });
            } else {
                toast.error("Failed to update system settings", {
                    position: "top-center"
                });
            }
        } catch (error) {
            toast.error("An error occurred while updating system settings", {
                position: "top-center"
            });
        }
    };

    return (
        <div className="artifacts-container system-settings">
            <ToastContainer />
            <header className="artifacts-header">
                <h1>Settings</h1>
            </header>
            <div className="artifacts-table-container">
                <table className="artifacts-table">
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Value</th>
                            <th>Description</th>
                            <th>Last Updated</th>
                            <th>Updated By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>File Upload Limit</td>
                            <td>
                                <input
                                    type="text"
                                    value={newLimit}
                                    onChange={(e) => setNewLimit(e.target.value)}
                                />
                            </td>
                            <td><p>The limit is in Kb, calculate the equivalent value in Mb. 1 Mb = 1024 Kb</p></td>
                            <td className="date">{lastUpdated}</td>
                            <td><p>{updatedBy}</p></td>
                            <td><button onClick={handleSystemSettings}>Update</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i className='bx bx-paper-plane'></i> These are the system control settings.</li>
                    <li><i className='bx bx-paper-plane'></i> Changing the enabled settings, shall impact the functionality of the system.</li>
                    <li><i className='bx bx-paper-plane'></i> You may not be able to update/change few or all of the settings, depending upon the usage restrictions applied by the administrator.</li>
                    <li><i className='bx bx-paper-plane'></i> Please go through the description of the respective System variable before updating/changing the current value.</li>
                </ul>
            </div>
        </div>
    );
};

export default SystemSettings;