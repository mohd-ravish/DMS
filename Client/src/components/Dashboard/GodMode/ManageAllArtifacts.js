const ManageAllArtifacts = () => {
    const data = [
        { name: 'Link', type: 'Instructions', author: 'ravish@gmail', date: '31-05-2024', isLink: true },
        { name: 'Array_convert', type: 'Technical Guide', author: 'james@gmail', date: '02-05-2024', isLink: false },
        { name: 'Php', type: 'White Paper', author: 'john@gmail', date: '24-01-2024', isLink: true },
        { name: 'Seminar_Front_Page.png', type: 'White paper', author: 'jack@gmail.com', date: '30-05-2024', isLink: false }
    ];

    return (
        <div className="artifacts-container">
            <header className="artifacts-header">
                <h1>Manage All Artifacts</h1>
            </header>
            <div className="artifacts-table-container">
                <div className='header-select-entries'>
                    <th className='select-entries'>Show <select>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>entries</th>
                    <th colSpan="4">
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
                            <th>Document Name</th>
                            <th>Document Type</th>
                            <th>Author/Publisher</th>
                            <th>Uploaded date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className={item.isLink ? 'link' : 'document'}>
                                    {item.name} {item.isLink ? '🔗' : '📄'}
                                </td>
                                <td>{item.type}</td>
                                <td>{item.author}</td>
                                <td className="date">{item.date}</td>
                                <td><a href="#" className="edit-link">✏️ Edit</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <p>Showing 1 to 4 of 4 entries</p>
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
                    <li><i class='bx bx-paper-plane'></i> All documents/urls uploaded by you will be listed here in descending order, i.e., latest first.</li>
                    <li><i class='bx bx-paper-plane'></i> All Active and published documents will be eligible for end-user searches.</li>
                    <li><i class='bx bx-paper-plane'></i> Color Legend: <span className="active">Active and Search Ready</span>, <span className="inactive">Active but Not published</span>, and <span className="archived">Archived i.e. Neither Active Nor Search Ready</span></li>
                    <li><i class='bx bx-paper-plane'></i> To read the description, hover your cursor on the document name.</li>
                    <li><i class='bx bx-paper-plane'></i> Symbol 🔗 after the document name shows that it's a URL and 📄 shows that it's an uploaded document.</li>
                </ul>
            </div>
        </div>
    );
};

export default ManageAllArtifacts;
