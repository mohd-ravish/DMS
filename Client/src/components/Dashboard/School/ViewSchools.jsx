import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditSchoolData from './EditSchoolData';
import { fetchAllSchools, fetchMySchools } from '../ApiHandler/schoolFunctions';
import { exportToSchoolCSV, exportToSchoolExcel, exportToPDF, handlePrint } from '../../utils/Utils';
import usePagination from '../../hooks/usePagination';

const ViewSchools = () => {
    const [schools, setSchools] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editSection, setEditSection] = useState(false);
    const [schoolsSection, setSchoolsSection] = useState(true);
    const [editFormData, setEditFormData] = useState([]);
    const [showUserSchools, setShowUserSchools] = useState(false);

    useEffect(() => {
        if (showUserSchools) {
            fetchMySchools(setSchools); // Fetch only user schools
        } else {
            fetchAllSchools(setSchools); // Fetch all schools
        }
    }, [showUserSchools]);

    const filteredSchools = schools.filter(school =>
        school.school_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.school_email_id.toLowerCase().includes(searchQuery.toLowerCase())
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
    } = usePagination(filteredSchools, 10);

    const editSchoolData = (editData) => {
        setEditFormData(editData);
        setEditSection(true);
        setSchoolsSection(false);
    }

    const handleClose = () => {
        setEditSection(false);
        setSchoolsSection(true);
    }

    const handleToggleSwitch = () => {
        setShowUserSchools(!showUserSchools);
    };

    return (
        <div>
            {editSection && (
                <EditSchoolData
                    editFormData={editFormData}
                    schools={schools}
                    setSchools={setSchools}
                    handleClose={handleClose}
                />
            )}
            {schoolsSection && (
                <div className="artifacts-container my-entries-section">
                    <ToastContainer />
                    <header className="artifacts-header">
                        <h1>{showUserSchools ? 'My Schools' : 'Schools'}</h1>
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
                            <th colSpan="4">
                                <div className="table-buttons">
                                    <button onClick={() => exportToSchoolCSV(filteredSchools, 'DMS My Schools.csv')}>CSV</button>
                                    <button onClick={() => exportToSchoolExcel(filteredSchools, 'DMS My Schools.xlsx')}>Excel</button>
                                    <button onClick={() => exportToPDF('.artifacts-table', 'DMS My Schools.pdf')}>PDF</button>
                                    <button onClick={() => handlePrint('.artifacts-table-container')}>Print</button>
                                </div>
                            </th>
                            <th>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={showUserSchools}
                                        onChange={handleToggleSwitch}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </th>
                            <th className='user-search'>
                                <label>Search</label>
                                <input
                                    type="text"
                                    placeholder="Type here..."
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
                                        <th>School Name</th>
                                        <th>School Email ID</th>
                                        <th>Added By</th>
                                        <th>Added On</th>
                                        {showUserSchools && <th>Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="tooltip">
                                                    <p>{item.school_name}</p>
                                                </div>
                                            </td>
                                            <td>{item.school_email_id}</td>
                                            <td>{item.on_boarded_by_owner}</td>
                                            <td className="date">{item.on_boarded_on.split('T')[0]}</td>
                                            {showUserSchools && (
                                                <td><a href="# " className="edit-link" onClick={() => editSchoolData(item)}>✏️ Edit</a></td>
                                            )}
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
                            {/* Add usage instructions here */}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewSchools;
