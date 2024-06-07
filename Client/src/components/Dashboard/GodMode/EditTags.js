import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import usePagination from '../usePagination';

const EditTags = () => {
    const [availableTags, setAvailableTags] = useState([]);
    const [editedTagValue, setEditedTagValue] = useState('');
    const [editingTagId, setEditingTagId] = useState('');
    const [searchQuery, setSearchQuery] = useState("");

    const handleEdit = (tagId, initialTagName) => {
        setEditingTagId(tagId);
        setEditedTagValue(initialTagName);
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await Axios.get("http://localhost:4500/tags/allTags", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                if (response.data.status === "success") {
                    setAvailableTags(response.data.data);
                } else {
                    console.log("Failed to fetch tags");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchTags();
    }, []);

    const handleUpdateTag = async () => {
        try {
            const response = await Axios.put(`http://localhost:4500/tags/updateTags/${editingTagId}`, {
                tagName: editedTagValue
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.status === "success") {
                toast.success("Tag updated successfully", {
                    position: "top-center"
                });
                // Update the local state with the updated tag value
                setAvailableTags(availableTags.map(tag => {
                    if (tag.id === editingTagId) {
                        return { ...tag, tag_nm: editedTagValue };
                    }
                    return tag;
                }));
                setEditingTagId("");
            } else {
                toast.error("Failed to update Tag", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filteredTags = availableTags.filter(tag =>
        tag.tag_nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.created_by.toLowerCase().includes(searchQuery.toLowerCase())
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
    } = usePagination(filteredTags, 10);

    return (
        <div className="artifacts-container system-settings">
            <ToastContainer />
            <header className="artifacts-header">
                <h1>Edit Tags</h1>
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
                    <th className='user-search'>
                        <label>Search</label>
                        <input
                            type="text"
                            placeholder="Type Tag Name or Email..."
                            className="user-search-bar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                        {currentEntries.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>
                                    {item.id === editingTagId ?
                                        <input
                                            type="text"
                                            value={editedTagValue}
                                            onChange={(e) => setEditedTagValue(e.target.value)}
                                            className="user-search-bar"
                                        />
                                        :
                                        item.tag_nm
                                    }
                                </td>
                                <td>{item.created_by}</td>
                                <td>{item.created_at.split('T')[0]}</td>
                                <td>8 Documents</td> {/* Adjust this if usedWith is available */}
                                <td>
                                    {item.id === editingTagId ?
                                        <button onClick={handleUpdateTag}>Update</button>
                                        :
                                        <a href="#" className="edit-link" onClick={() => handleEdit(item.id, item.tag_nm)}>✏️ Edit</a>
                                    }
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
                    <li><i className='bx bx-paper-plane'></i> You may Edit the available tags.</li>
                    <li><i className='bx bx-paper-plane'></i> To sort the column values, click on the column name.</li>
                </ul>
            </div>
        </div>
    );
};

export default EditTags;