import { useState, useEffect } from 'react';
import { fetchStudentList, handleSaveStudentList } from '../ApiHandler/sessionFunctions';


const StudentList = ({ sessionFolderName, handleStudentListClose }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudentList(sessionFolderName, setStudents);
    }, [sessionFolderName]);

    const handleCheckboxChange = (index) => {
        setStudents(prevStudents => {
            const newStudents = [...prevStudents];
            newStudents[index].Attendence = newStudents[index].Attendence === 'P' ? 'A' : 'P';
            return newStudents;
        });
    };

    return (
        <div className="student-list-overlay">
            <div className="overlay-background" onClick={handleStudentListClose}></div>
            <div className="overlay-content">
                <h2>Student List</h2>
                <div className="artifacts-table-view">
                    <table className="artifacts-table">
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Attendence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.RollNo}</td>
                                    <td>{student.Name}</td>
                                    <td><input
                                        type="checkbox"
                                        checked={student.Attendence === 'P'}
                                        onChange={() => handleCheckboxChange(index)}
                                    /> Present</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overlay-actions">
                    <button onClick={handleStudentListClose}>Close</button>
                    <button onClick={() => { handleSaveStudentList(sessionFolderName, students, handleStudentListClose) }}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default StudentList;