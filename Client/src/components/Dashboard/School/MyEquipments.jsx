import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEquipmentData from './EditEquipmentData'
import { fetchMyEquipments } from '../ApiHandler/equipmentFunctions';
import { exportToCSV, exportToExcel, exportToPDF, handlePrint } from '../../utils/Utils';
import usePagination from '../../hooks/usePagination';

const MyEquipments = () => {
  const [myEquipments, setMyEquipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editSection, setEditSection] = useState(false);
  const [equipmentsSection, setEquipmentsSection] = useState(true);
  const [editFormData, setEditFormData] = useState([]);

  useEffect(() => {
    fetchMyEquipments(setMyEquipments);
  }, []);

  const filteredEquipments = myEquipments.filter(equipment =>
    equipment.equipment_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.equipment_type.toLowerCase().includes(searchQuery.toLowerCase())

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
  } = usePagination(filteredEquipments, 10);

  const editEquipmentData = (editData) => {
    setEditFormData(editData);
    setEditSection(true);
    setEquipmentsSection(false);
  }

  const handleClose = () => {
    setEditSection(false);
    setEquipmentsSection(true);
  }

  return (
    <div>
      {editSection && (
        <EditEquipmentData
          editFormData={editFormData}
          myEquipments={myEquipments}
          setMyEquipments={setMyEquipments}
          handleClose={handleClose}
        />
      )}
      {equipmentsSection && (
        <div className="artifacts-container my-entries-section">
          <ToastContainer />
          <header className="artifacts-header">
            <h1>My Equipments</h1>
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
                  <button onClick={() => exportToCSV(filteredEquipments, 'DMS My Schools.csv')}>CSV</button>
                  <button onClick={() => exportToExcel(filteredEquipments, 'DMS My Schools.xlsx')}>Excel</button>
                  <button onClick={() => exportToPDF('.artifacts-table', 'DMS My Schools.pdf')}>PDF</button>
                  <button onClick={() => handlePrint('.artifacts-table-container')}>Print</button>
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
            <div className="artifacts-table-view">
              <table className="artifacts-table">
                <thead>
                  <tr>
                    <th>Equipment Name</th>
                    <th>Equipment Type</th>
                    <th>Added on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="tooltip">
                          <p>{item.equipment_name}</p>
                        </div>
                      </td>
                      <td>{item.equipment_type}</td>
                      <td className="date">{item.equipment_added_on.split('T')[0]}</td>
                      <td><a href="#" className="edit-link" onClick={() => editEquipmentData(item)}>✏️ Edit</a></td>
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

export default MyEquipments;
