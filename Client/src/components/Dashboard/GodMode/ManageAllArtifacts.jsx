import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditArtifactData from '../Manage/EditArtifactData';
import { fetchAllArtifacts } from '../ApiHandler/artifactsFunctions';
import { exportToCSV, exportToExcel, exportToPDF, handlePrint } from '../../utils/Utils';
import usePagination from '../../hooks/usePagination';

const ManageAllArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editSection, setEditSection] = useState(false);
    const [artifactsSection, setArtifactsSection] = useState(true);
    const [editFormData, setEditFormData] = useState([]);

    useEffect(() => {
        fetchAllArtifacts(setArtifacts);
    }, []);

    const filteredArtifacts = artifacts.filter(artifact =>
        artifact.doc_nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.doctype_nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.owner_author_id.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
    } = usePagination(filteredArtifacts, 10);

    const getDocNameClass = (is_published) => {
        if (is_published) {
            return 'active';
        } else if (!is_published) {
            return 'inactive';
        } else {
            return '';
        }
    };

    const editArtifact = (editData) => {
        setEditFormData(editData);
        setEditSection(true);
        setArtifactsSection(false);
    }

    const handleClose = () => {
        setEditSection(false);
        setArtifactsSection(true);
    }

    return (
        <div>
            {editSection && (
                <EditArtifactData
                    editFormData={editFormData}
                    artifacts={artifacts}
                    setArtifacts={setArtifacts}
                    handleClose={handleClose}
                />
            )}
            {artifactsSection && (
                <div className="artifacts-container">
                    <ToastContainer />
                    <header className="artifacts-header">
                        <h1>Manage All Artifacts</h1>
                    </header>
                    <div className="artifacts-table-container">
                        <div className='header-select-entries'>
                            <th className='select-entries'>Show
                                <select onChange={handleEntriesChange} value={entriesPerPage}>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>entries</th>
                            <th colSpan="4">
                                <div className="table-buttons">
                                    <button onClick={() => exportToCSV(filteredArtifacts, 'DMS All Artifacts.csv')}>CSV</button>
                                    <button onClick={() => exportToExcel(filteredArtifacts, 'DMS All Artifacts.xlsx')}>Excel</button>
                                    <button onClick={() => exportToPDF('.artifacts-table', 'DMS All Artifacts.pdf')}>PDF</button>
                                    <button onClick={() => handlePrint('.artifacts-table-container')}>Print</button>
                                </div>
                            </th>
                            <th className='user-search'>
                                <label>Search</label>
                                <input
                                    type="text"
                                    placeholder="Type Name or Email..."
                                    className="user-search-bar"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </th>
                        </div>
                        <div className="artifacts-table-view">
                            <table className="artifacts-table">
                                <thead>
                                    <tr>
                                        <th>Document Name</th>
                                        <th>Document Type</th>
                                        <th>Author/Publisher</th>
                                        <th>Uploaded date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((item, index) => (
                                        <tr key={index}>
                                            <td className={getDocNameClass(item.is_published)}>
                                                <div className="tooltip">
                                                    <p>{item.doc_nm} {item.doc_format === 'url' ? '🔗' : '📄'}</p>
                                                    <span className="tooltiptext">{item.doc_description}</span>
                                                </div>
                                            </td>
                                            <td>{item.doctype_nm}</td>
                                            <td>{item.owner_author_id}</td>
                                            <td className="date">{item.date_uploaded.split('T')[0]}</td>
                                            <td><a href="# " className="edit-link" onClick={() => editArtifact(item)}>✏️ Edit</a></td>
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
                            <li><i class='bx bx-paper-plane'></i> All documents/urls uploaded by you will be listed here in descending order, i.e., latest first.</li>
                            <li><i class='bx bx-paper-plane'></i> All Active and published documents will be eligible for end-user searches.</li>
                            <li><i className='bx bx-paper-plane'></i> Color Legend: <span className="active">Published and Search Ready</span>, <span className="inactive">Not published and Not Search Ready</span></li>
                            <li><i class='bx bx-paper-plane'></i> To read the description, hover your cursor on the document name.</li>
                            <li><i class='bx bx-paper-plane'></i> Symbol 🔗 after the document name shows that it's a URL and 📄 shows that it's an uploaded document.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAllArtifacts;
