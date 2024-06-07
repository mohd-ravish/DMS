import { useEffect, useState } from 'react';
import Axios from 'axios';
import usePagination from '../usePagination';

const Artifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMyArtifacts = async () => {
            try {
                const response = await Axios.get("http://localhost:4500/artifacts/myArtifacts", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                if (response.data.status === "success") {
                    setArtifacts(response.data.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMyArtifacts();
    }, []);

    const filteredArtifacts = artifacts.filter(artifact =>
        artifact.doc_nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.doctype_nm.toLowerCase().includes(searchQuery.toLowerCase())
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
    } = usePagination(filteredArtifacts, 10);

    const getDocNameClass = (doc_status, is_published) => {
        if (doc_status === 'active' && is_published) {
            return 'active';
        } else if (doc_status === 'active' && !is_published) {
            return 'inactive';
        } else if (doc_status === 'archived') {
            return 'archived';
        } else {
            return '';
        }
    };

    return (
        <div className="artifacts-container">
            <header className="artifacts-header">
                <h1>My Artifacts</h1>
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
                            placeholder="Type name or type..."
                            className="user-search-bar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </th>
                </div>
                <table className="artifacts-table">
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Document Type</th>
                            <th>Uploaded date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((item, index) => (
                            <tr key={index}>
                                <td className={getDocNameClass(item.doc_status, item.is_published)}>
                                    {item.doc_nm} {item.doc_format === 'url' ? '🔗' : '📄'}
                                </td>
                                <td>{item.doctype_nm}</td>
                                <td className="date">{item.date_uploaded.split('T')[0]}</td>
                                <td><a href="#" className="edit-link">✏️ Edit</a></td>
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
                    <li><i className='bx bx-paper-plane'></i> All documents/urls uploaded by you will be listed here in descending order, i.e., latest first.</li>
                    <li><i className='bx bx-paper-plane'></i> All Active and published documents will be eligible for end-user searches.</li>
                    <li><i className='bx bx-paper-plane'></i> Color Legend: <span className="active">Active and Search Ready</span>, <span className="inactive">Active but Not published</span>, and <span className="archived">Archived i.e. Neither Active Nor Search Ready</span></li>
                    <li><i className='bx bx-paper-plane'></i> To read the description, hover your cursor on the document name.</li>
                    <li><i className='bx bx-paper-plane'></i> Symbol 🔗 after the document name shows that it's a URL and 📄 shows that it's an uploaded document.</li>
                </ul>
            </div>
        </div>
    );
};

export default Artifacts;