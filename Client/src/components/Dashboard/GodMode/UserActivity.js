import { useState, useEffect } from "react";
import { fetchUsers, handleUserActivitySubmit } from '../ApiHandler/usersFunctions';

const SystemSettings = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [period, setPeriod] = useState("7");
    const [userActivity, setUserActivity] = useState([]);

    useEffect(() => {
        fetchUsers(setUsers);
    }, []);

    return (
        <div className="artifacts-container user-activity">
            <header className="artifacts-header">
                <h1>User Activity</h1>
            </header>
            <div className="artifacts-table-container">
                <div className="log-search">
                    <label>Users</label>
                    <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                        <option value="">Select</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.email}
                            </option>
                        ))}
                    </select>
                    <label>Period</label>
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option value="7">Last 7 days</option>
                        <option value="14">Last 14 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                        <option value="180">Last 6 Months</option>
                        <option value="365">Last 1 Year</option>
                    </select>
                    <button onClick={() => handleUserActivitySubmit(userId, period, setUserActivity)}>Track</button>
                </div>
                <div className="artifacts-table-view">
                    <table className="artifacts-table">
                        <thead>
                            <tr>
                                <th>Log ID</th>
                                <th>Activity</th>
                                <th>Log Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userActivity.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.log_id}</td>
                                    <td>{item.activity}</td>
                                    <td>{item.log_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i className='bx bx-paper-plane'></i> Choose from the available users in the list.</li>
                    <li><i className='bx bx-paper-plane'></i> You may select maximum of 1 user.</li>
                    <li><i className='bx bx-paper-plane'></i> If user you are trying to track is not available, then punch in the user id (email) and hit enter.</li>
                    <li><i className='bx bx-paper-plane'></i> By default last 7 days activities will be fetched. You may change the period as required.</li>
                </ul>
            </div>
        </div>
    );
};

export default SystemSettings;