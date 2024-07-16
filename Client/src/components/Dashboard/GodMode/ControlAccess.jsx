import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getControlAccessUsers, handleControlAccessUpdate } from '../ApiHandler/usersFunctions';
import { exportToUserCSV, exportToUserExcel, exportToPDF, handlePrint } from '../../utils/Utils';
import usePagination from '../../hooks/usePagination';

const UserAccess = () => {
    const [controlAccessUsers, setControlAccessUsers] = useState([]);  // User Data like id, username, email and role_id
    const [searchQuery, setSearchQuery] = useState("");        // Search Query

    useEffect(() => {
        getControlAccessUsers(setControlAccessUsers);
    }, []);

    const filteredControlAccessUsers = controlAccessUsers.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
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
    } = usePagination(filteredControlAccessUsers, 10);

    const handleToggleAccess = async (userId) => {
        await handleControlAccessUpdate(userId, setControlAccessUsers);
    };

    return (
        <div className="artifacts-container">
            <ToastContainer />
            <header className="artifacts-header">
                <h1>Control Access</h1>
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
                    <th>
                        <div className="table-buttons">
                            <button onClick={() => exportToUserCSV(filteredControlAccessUsers, 'DMS Control Access.csv')}>CSV</button>
                            <button onClick={() => exportToUserExcel(filteredControlAccessUsers, 'DMS Control Access.xlsx')}>Excel</button>
                            <button onClick={() => exportToPDF('.artifacts-table', 'DMS Control Access.pdf')}>PDF</button>
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Demo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={user.has_access === 1}
                                                onChange={() => handleToggleAccess(user.id)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
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
                    <li><i className='bx bx-paper-plane'></i> If user is disabled/deleted in Okta then you have to manually delete the user from application.</li>
                    <li><i className='bx bx-paper-plane'></i> Even if you don't delete the user, the user won't be able to access the application.</li>
                    <li><i className='bx bx-paper-plane'></i> If the user is deleted by accident then it will be recreated at the time log in but the db id will be changed.</li>
                    <li><i className='bx bx-paper-plane'></i> User role can be changed.</li>
                    <li><i className='bx bx-paper-plane'></i> Logged in user can't use the delete/change role for itself.</li>
                    <li><i className='bx bx-paper-plane'></i> All activities done here will be logged.</li>
                </ul>
            </div>
        </div>
    );
}

export default UserAccess;
