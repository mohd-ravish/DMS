import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchDocTypes, handleDocTypeUpdate, handleAddNewDocType, handleDeleteDocType } from '../ApiHandler/artifactsFunctions';
import usePagination from '../../hooks/usePagination';

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

    const {
        currentPage,
        entriesPerPage,
        currentEntries,
        handlePageChange,
        handleEntriesChange,
        totalEntries,
        startEntry,
        endEntry,
        totalPages
    } = usePagination(availableDocTypes, 10);

    return (
        <div className="artifacts-container system-settings">
            <ToastContainer />
            <header className="artifacts-header define-doctype-header">
                <h1>Define Document Type</h1>
            </header>
            <div className="artifacts-table-container">
                <div className='header-select-entries'>
                    <th className='select-entries'>Show
                        <select onChange={handleEntriesChange} value={entriesPerPage}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>entries
                    </th>
                    <th className='user-search'>
                        <form className="add-doctype" onSubmit={(e) => handleAddNewDocType(e, newDocTypeName, setNewDocTypeName, availableDocTypes, setAvailableDocTypes)}>
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
                    </th>
                </div>
                <div className="artifacts-table-view">
                    <table className="artifacts-table">
                        <thead>
                            <tr>
                                <th>Doc Type ID</th>
                                <th>Doc Type Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((item, index) => (
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
                                            <a href="#" className="edit-link" onClick={() => handleEdit(item.id, item.doctype_nm)}>✏️ Edit </a>
                                        }
                                        <a href="#" className="delete-btn"
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete Document Type ${item.doctype_nm}?`)) {
                                                    handleDeleteDocType(item.id, availableDocTypes, setAvailableDocTypes);
                                                }
                                            }}
                                        >❌ Delete </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <p>Showing {startEntry} to {endEntry} of {totalEntries} entries</p>
                    <div className="pagination-buttons">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={currentPage === i + 1 ? "active" : ""}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </div>
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