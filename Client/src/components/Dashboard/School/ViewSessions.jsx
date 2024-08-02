import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditSessionData from './EditSessionData';
import { fetchAllSessions, fetchMySessions } from '../ApiHandler/sessionFunctions';
import { exportToSessionCSV, exportToSessionExcel, exportToPDF, handlePrint } from '../../utils/Utils';
import usePagination from '../../hooks/usePagination';

const ViewSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editSection, setEditSection] = useState(false);
    const [sessionsSection, setSessionsSection] = useState(true);
    const [editFormData, setEditFormData] = useState([]);
    const [showAllSessions, setShowAllSessions] = useState(false);

    useEffect(() => {
        if (showAllSessions) {
            fetchAllSessions(setSessions); // Fetch all sessions
        } else {
            fetchMySessions(setSessions); // Fetch only user sessions
        }
    }, [showAllSessions]);

    const filteredSessions = sessions.filter(session =>
        session.session_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.session_host.toLowerCase().includes(searchQuery.toLowerCase())
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
    } = usePagination(filteredSessions, 10);

    const editSessionData = (editData) => {
        setEditFormData(editData);
        setEditSection(true);
        setSessionsSection(false);
    }

    const handleClose = () => {
        setEditSection(false);
        setSessionsSection(true);
    }

    const handleToggleSwitch = () => {
        setShowAllSessions(!showAllSessions);
    };

    const getSessionTitleClass = (session_status) => {
        if (session_status === 'open') {
            return 'active';
        } else if (session_status === 'closed') {
            return 'archived';
        } else {
            return '';
        }
    };

    return (
        <div>
            {editSection && (
                <EditSessionData
                    editFormData={editFormData}
                    sessions={sessions}
                    setSessions={setSessions}
                    handleClose={handleClose}
                />
            )}
            {sessionsSection && (
                <div className="artifacts-container my-entries-section">
                    <ToastContainer />
                    <header className="artifacts-header">
                        <h1>{showAllSessions ? 'All Sessions' : 'My Sessions'}</h1>
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
                                    <button onClick={() => exportToSessionCSV(filteredSessions, 'DMS Sessions.csv')}>CSV</button>
                                    <button onClick={() => exportToSessionExcel(filteredSessions, 'DMS Sessions.xlsx')}>Excel</button>
                                    <button onClick={() => exportToPDF('.artifacts-table', 'DMS My sessions.pdf')}>PDF</button>
                                    <button onClick={() => handlePrint('.artifacts-table-container')}>Print</button>
                                </div>
                            </th>
                            <th>
                                <span className='toggle-switch-text'>My</span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={showAllSessions}
                                        onChange={handleToggleSwitch}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <span className='toggle-switch-text'>All</span>
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
                                        <th>Session Title</th>
                                        <th>Session Host</th>
                                        <th>Session Date</th>
                                        <th>Setup By</th>
                                        {!showAllSessions && <th>Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className={getSessionTitleClass(item.session_status)}>
                                                    <p>{item.session_title}</p>
                                                </div>
                                            </td>
                                            <td>{item.session_host}</td>
                                            <td>{item.session_date}</td>
                                            <td>{item.session_setup_by_email}</td>
                                            {!showAllSessions && (
                                                <td><a href="# " className="edit-link" onClick={() => editSessionData(item)}>✏️ Track</a></td>
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
                            <li><i className='bx bx-paper-plane'></i> Color Legend: <span className="active">Session to be held</span> and <span className="archived">Session is closed</span></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewSessions;
