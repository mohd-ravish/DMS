import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchDocTypes, handleDocTypeUpdate, handleAddNewDocType } from '../ApiHandler/artifactsFunctions';

const DefineDocType = () => {
    const [availableDocTypes, setAvailableDocTypes] = useState([]);
    const [editingDocTypeId, setEditingDocTypeId] = useState("");
    const [editedDocTypeValue, setEditedDocTypeValue] = useState("");
    const [newDocTypeName, setNewDocTypeName] = useState("");

    const handleEdit = (docTypeId, initialDocName) => {
        setEditingDocTypeId(docTypeId);
        setEditedDocTypeValue(initialDocName);
    };

    useEffect(() => {
        fetchDocTypes(setAvailableDocTypes);
    }, []);

    return (
        <div className="artifacts-container system-settings">
            <ToastContainer />
            <header className="artifacts-header define-doctype-header">
                <h1>Define Document Type</h1>
                <form className="add-doctype" onSubmit={(e)=>handleAddNewDocType(e, newDocTypeName, setNewDocTypeName)}>
                    <input
                        type="text"
                        value={newDocTypeName}
                        onChange={(e) => setNewDocTypeName(e.target.value)}
                        placeholder="New Document Type Name"
                        className="add-doctype-bar"
                        required
                    />
                    <button type="submit" className="add-btn">Add</button>
                </form>
            </header>
            <div className="artifacts-table-container">
                <table className="artifacts-table">
                    <thead>
                        <tr>
                            <th>Doc Type ID</th>
                            <th>Doc Type Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableDocTypes.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>
                                    {item.id === editingDocTypeId ?
                                        <input
                                            type="text"
                                            value={editedDocTypeValue}
                                            onChange={(e) => setEditedDocTypeValue(e.target.value)}
                                            className="user-search-bar"
                                        />
                                        :
                                        item.doctype_nm
                                    }
                                </td>
                                <td>
                                    {item.id === editingDocTypeId ?
                                        <button onClick={() => handleDocTypeUpdate(editingDocTypeId, editedDocTypeValue, setAvailableDocTypes, availableDocTypes, setEditingDocTypeId)}>Update</button>
                                        :
                                        <a href="#" className="edit-link" onClick={() => handleEdit(item.id, item.doctype_nm)}>✏️ Edit</a>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i className='bx bx-paper-plane'></i> You may edit the available doc types.</li>
                    <li><i className='bx bx-paper-plane'></i> To sort the column values, click on the column name.</li>
                </ul>
            </div>
        </div>
    );
};

export default DefineDocType;