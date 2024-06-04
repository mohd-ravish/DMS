const EditTags = () => {
    const data = [
        { tagId: '1', tagName: 'ajax php', createdBy: 'ravish@gmail.com', createdOn: '31-05-2024 15:40:41', usedWith: '6 Documents' },
        { tagId: '2', tagName: 'shopify setup guide', createdBy: 'ravish@gmail.com', createdOn: '21-03-2024 14:20:45', usedWith: '3 Documents' },
        { tagId: '3', tagName: 'seo guide', createdBy: 'jack@gmail.com', createdOn: '12-07-2024 04:30:24', usedWith: '4 Documents' },
        { tagId: '4', tagName: 'seo best practices', createdBy: 'ravish@gmail.com', createdOn: '31-05-2024 15:40:41', usedWith: '2 Documents' },
        { tagId: '5', tagName: 'php lowercase', createdBy: 'ravish@gmail.com', createdOn: '13-05-2023 01:23:51', usedWith: '9 Documents' },
        { tagId: '12', tagName: 'ajax php', createdBy: 'ravish@gmail.com', createdOn: '31-05-2024 15:40:41', usedWith: '6 Documents' },
        { tagId: '14', tagName: 'seo best practices', createdBy: 'ravish@gmail.com', createdOn: '31-05-2024 15:40:41', usedWith: '2 Documents' },
    ];

    return (
        <div className="artifacts-container">
            <header className="artifacts-header">
                <h1>Edit Tags</h1>
            </header>
            <div className="artifacts-table-container">
                <div className='header-select-entries'>
                    <th className='select-entries'>Show <select>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>entries</th>
                    <th className='user-search'>
                        <label>Search</label>
                        <input
                            type="text"
                            placeholder="Type Tag Name or Email..."
                            className="user-search-bar"
                        />
                    </th>
                </div>
                <table className="artifacts-table">
                    <thead>
                        <tr>
                            <th>Tag ID</th>
                            <th>Tag Name</th>
                            <th>Created By</th>
                            <th>Created On</th>
                            <th>Used With</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.tagId}</td>
                                <td><input
                                    type="text"
                                    value={item.tagName}
                                    className="user-search-bar"
                                /></td>
                                <td>{item.createdBy}</td>
                                <td>{item.createdOn}</td>
                                <td>{item.usedWith}</td>
                                <td><a href="#" className="edit-link">✏️ Edit</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <p>Showing 1 to 8 of 8 entries</p>
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
                    <li><i class='bx bx-paper-plane'></i> You may Edit the available tags.</li>
                    <li><i class='bx bx-paper-plane'></i> To sort the column values, click on the column name.</li>
                </ul>
            </div>
        </div>
    );
};

export default EditTags;