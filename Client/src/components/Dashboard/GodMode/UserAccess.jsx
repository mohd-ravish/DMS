import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchToken, fetchUsers, handleChangeUserRole, handleDeleteUser } from '../ApiHandler/usersFunctions';
import { exportToUserCSV, exportToUserExcel, exportToPDF, handlePrint } from '../../utils/Utils';
import usePagination from '../../hooks/usePagination';

const UserAccess = () => {
    const [users, setUsers] = useState([]);  // User Data like id, username, email and role_id
    const [currentUserId, setCurrentUserId] = useState(null);  // LoggedIn user id
    const [searchQuery, setSearchQuery] = useState("");        // Search Query

    useEffect(() => {
        fetchToken(setCurrentUserId);
        fetchUsers(setUsers);
    }, []);

    const filteredUsers = users.filter(user =>
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
    } = usePagination(filteredUsers, 10);

    return (
        <div className="artifacts-container">
            <ToastContainer />
            <header className="artifacts-header">
                <h1>User Access</h1>
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
                            <button onClick={() => exportToUserCSV(filteredUsers, 'DMS Users.csv')}>CSV</button>
                            <button onClick={() => exportToUserExcel(filteredUsers, 'DMS Users.xlsx')}>Excel</button>
                            <button onClick={() => exportToPDF('.artifacts-table', 'DMS Users.pdf')}>PDF</button>
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
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role_id === 1 ? (
                                            <span className="admin-role"><i className='bx bx-crown'></i> Admin</span>
                                        ) : (
                                            <span className="user-role"><i className='bx bx-user'></i> User</span>
                                        )}
                                    </td>
                                    <td>
                                        {/* <button className="delete-btn" onClick={() => handleDeleteUser(user.id, currentUserId, setUsers, users)}>
                                        <i className='bx bx-trash'></i> Delete
                                    </button> */}
                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
                                                    handleDeleteUser(user.id, currentUserId, setUsers, users);
                                                }
                                            }}
                                        >
                                            <i className='bx bx-trash'></i> Delete
                                        </button>
                                        <button className="change-role-btn" onClick={() => handleChangeUserRole(user.id, user.role_id, currentUserId, setUsers, users)}>
                                            {user.role_id === 1 ? (
                                                <i className='bx bx-down-arrow-circle' ></i>
                                            ) : (
                                                <i className='bx bx-up-arrow-circle'></i>
                                            )}
                                            Change Role
                                        </button>
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