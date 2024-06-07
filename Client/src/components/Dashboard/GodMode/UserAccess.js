import { useState, useEffect } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import usePagination from '../usePagination';

const UserAccess = () => {
    const [users, setUsers] = useState([]); // User Data like id, username, email and role_id
    const [currentUserId, setCurrentUserId] = useState(null);  // LoggedIn user id
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");  // Get the token from local storage
        if (token) {
            const decodedToken = jwtDecode(token);   // Decode the token
            setCurrentUserId(decodedToken.id);       // Store the id
        }

        const fetchUsers = async () => {
            try {
                const response = await Axios.get("http://localhost:4500/users/getUsers", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                if (response.data.status === "success") {
                    setUsers(response.data.data);  // Set User Data
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
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

    // Function to change user role
    const handleChangeRole = async (userId, currentRoleId) => {
        if (userId === currentUserId) { // If logged in user tries to change its role exit the function
            toast.error("Ask another admin to change your role", {
                position: "top-center"
            });
            return;
        }

        const newRoleId = currentRoleId === 1 ? 2 : 1;
        try {
            const response = await Axios.put("http://localhost:4500/users/changeRole", {
                userId,
                newRoleId
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });

            if (response.data.status === 'success') {
                setUsers(users.map(user =>
                    user.id === userId ? { ...user, role_id: newRoleId } : user
                ));
                toast.success(response.data.message, {
                    position: "top-center"
                });
            } else {
                toast.error(response.data.message, {
                    position: "top-center"
                });
            }
        } catch (error) {
            toast.error("Failed to change role", {
                position: "top-center"
            });
        }
    };

    // Function to delete user account
    const handleDeleteUser = async (userId) => {
        if (userId === currentUserId) { // If logged in user tries to delete its account exit the function
            toast.error("Ask another admin to delete your account", {
                position: "top-center"
            });
            return;
        }

        try {
            const response = await Axios.delete(`http://localhost:4500/users/deleteUser/${userId}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });

            if (response.data.status === 'success') {
                setUsers(users.filter(user => user.id !== userId));
                toast.success(response.data.message, {
                    position: "top-center"
                });
            } else {
                toast.error(response.data.message, {
                    position: "top-center"
                });
            }
        } catch (error) {
            toast.error("Failed to delete user", {
                position: "top-center"
            });
        }
    };

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                                        <i className='bx bx-trash'></i> Delete
                                    </button>
                                    <button className="change-role-btn" onClick={() => handleChangeRole(user.id, user.role_id)}>
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