import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditLabData from './EditLabData'
import { fetchAllLabs, fetchMyLabs } from '../ApiHandler/labFunctions';
import { exportToLabCSV, exportToLabExcel, exportToPDF, handlePrint } from '../../utils/Utils';
import usePagination from '../../hooks/usePagination';

const ViewLabs = () => {
  const [labs, setLabs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editSection, setEditSection] = useState(false);
  const [labsSection, setLabsSection] = useState(true);
  const [editFormData, setEditFormData] = useState([]);
  const [showAllLabs, setShowAllLabs] = useState(false);

  useEffect(() => {
    if (showAllLabs) {
      fetchAllLabs(setLabs); // Fetch all labs
    } else {
      fetchMyLabs(setLabs); // Fetch only user labs
    }
  }, [showAllLabs]);

  const filteredLabs = labs.filter(labs =>
    labs.lab_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    labs.lab_school.toLowerCase().includes(searchQuery.toLowerCase())
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
  } = usePagination(filteredLabs, 10);

  const editLabData = (editData) => {
    setEditFormData(editData);
    setEditSection(true);
    setLabsSection(false);
  }

  const handleClose = () => {
    setEditSection(false);
    setLabsSection(true);
  }

  const handleToggleSwitch = () => {
    setShowAllLabs(!showAllLabs);
  };

  return (
    <div>
      {editSection && (
        <EditLabData
          editFormData={editFormData}
          labs={labs}
          setLabs={setLabs}
          handleClose={handleClose}
        />
      )}
      {labsSection && (
        <div className="artifacts-container my-entries-section">
          <ToastContainer />
          <header className="artifacts-header">
            <h1>{showAllLabs ? 'All Labs' : 'My Labs'}</h1>
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
                  <button onClick={() => exportToLabCSV(filteredLabs, 'DMS Labs.csv')}>CSV</button>
                  <button onClick={() => exportToLabExcel(filteredLabs, 'DMS Labs.xlsx')}>Excel</button>
                  <button onClick={() => exportToPDF('.artifacts-table', 'DMS Labs.pdf')}>PDF</button>
                  <button onClick={() => handlePrint('.artifacts-table-container')}>Print</button>
                </div>
              </th>
              <th>
                <span className='toggle-switch-text'>My</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={showAllLabs}
                    onChange={handleToggleSwitch}
                  />
                  <span className="slider round"></span>
                </label>
                <span className='toggle-switch-text'>All</span>
              </th>
              <th className='user-search'>
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Type here..."
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
                    <th>Lab Name</th>
                    <th>School</th>
                    <th>Added By</th>
                    <th>Added On</th>
                    {!showAllLabs && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="tooltip">
                          <p>{item.lab_name}</p>
                          <span className="tooltiptext">{item.lab_type}</span>
                        </div>
                      </td>
                      <td>{item.lab_school}</td>
                      <td>{item.lab_added_by_owner}</td>
                      <td className="date">{item.lab_added_on.split('T')[0]}</td>
                      {!showAllLabs && (
                        <td><a href="# " className="edit-link" onClick={() => editLabData(item)}>✏️ Edit</a></td>
                      )}
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
              {/* Add usage instructions here */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewLabs;
