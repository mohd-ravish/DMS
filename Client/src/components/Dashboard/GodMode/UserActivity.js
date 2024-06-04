const SystemSettings = () => {
    return (
        <div className="artifacts-container user-activity">
            <header className="artifacts-header">
                <h1>User Activity</h1>
            </header>
            <div className="artifacts-table-container">
                <label>User</label> <input
                    type="text"
                    placeholder="Select User ID"
                />
                <label>Period</label> <select value=''>
                    <option value="">Last 7 days</option>
                    <option value="type1">Last 14 days</option>
                    <option value="type2">Last 30 days</option>
                    <option value="type2">Last 90 days</option>
                    <option value="type2">Last 6 Months</option>
                    <option value="type2">Last 1 Year</option>
                </select>
                <button>Track</button>
            </div>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i class='bx bx-paper-plane'></i> Choose from the available users in the list.</li>
                    <li><i class='bx bx-paper-plane'></i> You may select maximum of 1 user.</li>
                    <li><i class='bx bx-paper-plane'></i> If user you are trying to track is not available, then punch in the user id (email) and hit enter.</li>
                    <li><i class='bx bx-paper-plane'></i> By default last 7 days activities will be fetched. You may change the period as required.</li>
                </ul>
            </div>
        </div>
    );
};

export default SystemSettings;