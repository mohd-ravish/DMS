import { useState } from 'react';

const UserAccess = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'superadmin', email: 'ravish@gmail.com', role: 'Admin' },
        { id: 2, name: 'Javed Ali Khan', email: 'javed@gmail.com', role: 'User' },
    ]);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleChangeRole = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, role: user.role === 'Admin' ? 'User' : 'Admin' } : user
        ));
    };

    return (
        <div className="artifacts-container">
            <header className="artifacts-header">
                <h1>User Access</h1>
            </header>
            <div className="artifacts-table-container">
                <div className='header-select-entries'>
                    <th className='select-entries'>Show <select>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>entries</th>
                    <th>
                        <div className="table-buttons">
                            <button>Copy</button>
                            <button>CSV</button>
                            <button>Excel</button>
                            <button>PDF</button>
                            <button>Print</button>
                        </div>
                    </th>
                    <th className='user-search'>
                        <label>Search</label>
                        <input
                            type="text"
                            placeholder="Type Name or Email..."
                            className="user-search-bar"
                        />
                    </th>
                </div>
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
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'Admin' ? (
                                        <span className="admin-role"><i class='bx bx-crown'></i> Admin</span>
                                    ) : (
                                        <span className="user-role"><i class='bx bx-user'></i> User</span>
                                    )}
                                </td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                                        <i class='bx bx-trash'></i> Delete
                                    </button>
                                    <button className="change-role-btn" onClick={() => handleChangeRole(user.id)}>
                                        {user.role === 'Admin' ? (
                                            <i class='bx bx-down-arrow-circle' ></i>
                                        ) : (
                                            <i class='bx bx-up-arrow-circle'></i>
                                        )}
                                        Change Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <p>Showing 1 to 2 of 2 entries</p>
                    <div className="pagination-buttons">
                        <button>Previous</button>
                        <button className="active">1</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i class='bx bx-paper-plane'></i> If user is disabled/deleted in Okta then you have to manually delete the user from application.</li>
                    <li><i class='bx bx-paper-plane'></i> Even if you don't delete the user, the user won't be able to access the application.</li>
                    <li><i class='bx bx-paper-plane'></i> If the user is deleted by accident then it will be recreated at the time log in but the db id will be changed.</li>
                    <li><i class='bx bx-paper-plane'></i> User role can be changed.</li>
                    <li><i class='bx bx-paper-plane'></i> Logged in user can't use the delete/change role for itself.</li>
                    <li><i class='bx bx-paper-plane'></i> All activities done here will be logged.</li>
                </ul>
            </div>
        </div>
    );
}

export default UserAccess;