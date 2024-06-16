import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSettings, submitNewSystemSettings, fetchAllocatedUsedSpace, submitNewAllocatedSpace, fetchDocFormats, updateDocFormatControl } from '../ApiHandler/settingsFunctions'

const SystemSettings = () => {
    const [limit, setLimit] = useState("");  // File upload size limit
    const [newLimit, setNewLimit] = useState("");
    const [updatedBy, setUpdatedBy] = useState("");  // Who updated the system settings
    const [lastUpdated, setLastUpdated] = useState("");  // Time at which system settings updated
    const [allowedToChange, setAllowedToChange] = useState("");
    const [totalAllocatedSpace, setTotalAllocatedSpace] = useState("");
    const [spaceLastUpdated, setSpaceLastUpdated] = useState("");
    const [spaceUpdatedBy, setSpaceUpdatedBy] = useState("");
    const [newAllocateSpace, setNewAllocateSpace] = useState("");
    const [docFormats, setDocFormats] = useState([]);

    useEffect(() => {
        fetchDocFormats(setDocFormats);
        fetchSettings(setLimit, setUpdatedBy, setLastUpdated, setAllowedToChange)
        setNewLimit(limit);
    }, [limit]);

    useEffect(() => {
        fetchAllocatedUsedSpace(setTotalAllocatedSpace, null, null, setSpaceLastUpdated, setSpaceUpdatedBy);
        setNewAllocateSpace(totalAllocatedSpace);
    }, [totalAllocatedSpace]);

    const handleToggleChange = (formatName, controlId) => {
        const newControlId = controlId === 1 ? 0 : 1;
        updateDocFormatControl(formatName, newControlId, setDocFormats);
    };

    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    // Chunk the document formats into groups of 3
    const chunkedDocFormats = chunkArray(docFormats, 5);

    return (
        <div>
            <ToastContainer />
            <div className="artifacts-container system-settings">
                <header className="artifacts-header">
                    <h1>System Variables</h1>
                </header>
                <div className="artifacts-table-container">
                    <div className="artifacts-table-view">
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
                                    <td><p>The limit is in Kb, calculate the equivalent value in MB. 1 MB = 1024 KB</p></td>
                                    <td className="date">{lastUpdated.split('T')[0]}</td>
                                    <td><p>{updatedBy}</p></td>
                                    <td>{allowedToChange === 'Y' && <button onClick={() => submitNewSystemSettings(newLimit)}>Update</button>}</td>
                                </tr>
                                <tr>
                                    <td>Total Space Alloacted</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newAllocateSpace}
                                            onChange={(e) => setNewAllocateSpace(e.target.value)}
                                        />
                                    </td>
                                    <td><p>This is the total alloacted space to the application instance in GB</p></td>
                                    <td className="date">{spaceLastUpdated.split('T')[0]}</td>
                                    <td><p>{spaceUpdatedBy}</p></td>
                                    <td><button onClick={() => submitNewAllocatedSpace(newAllocateSpace)}>Update</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="artifacts-container">
                <header className="artifacts-header">
                    <h1>Doc Formats</h1>
                </header>
                <div className="artifacts-table-container">
                    <div className="artifacts-table-view">
                        <table className="artifacts-table doc-formats-table">
                            <tbody>
                                {chunkedDocFormats.map((chunk, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {chunk.map((format, colIndex) => (
                                            <td key={colIndex}>
                                                <div className="doc-format-cell">
                                                    <span>{format.formatName}</span>
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={format.controlId === 1}
                                                            onChange={() => handleToggleChange(format.formatName, format.controlId)}
                                                        />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                            </td>
                                        ))}
                                        {/* Fill the remaining cells in the row with empty cells if chunk size is less than 3 */}
                                        {Array.from({ length: 3 - chunk.length }).map((_, emptyIndex) => (
                                            <td key={emptyIndex + chunk.length}></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
        </div >
    );
};

export default SystemSettings;