import Papa from 'papaparse';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToCSV = (data, filename) => {
    const csvData = data.map(item => ({
        Name: item.doc_nm,
        Type: item.doctype_nm,
        Author: item.owner_author_id,
        UploadedDate: item.date_uploaded.split('T')[0],
        Description: item.doc_description
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToUserCSV = (data, filename) => {
    const csvData = data.map(item => ({
        ID: item.id,
        Name: item.username,
        Email: item.email,
        Author: item.role_id === 1 ? 'Admin' : 'User'
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToSchoolCSV = (data, filename) => {
    const csvData = data.map(item => ({
        ID: item.school_id,
        SchoolName: item.school_name,
        State: item.state,
        Address: item.address,
        GeoLocation: item.geo_location,
        SchoolEmailId: item.school_email_id,
        PrimaryContactPerson: item.primary_contact_person,
        ContactNo: item.contact_no,
        BoardedBy: item.on_boarded_by_owner,
        BoardedOn: item.on_boarded_on.split('T')[0],
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToLabCSV = (data, filename) => {
    const csvData = data.map(item => ({
        ID: item.lab_id,
        LabName: item.lab_name,
        LabType: item.lab_type,
        LabSchool: item.lab_school,
        AddedBy: item.lab_added_by_owner,
        AddedOn: item.lab_added_on.split('T')[0],
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToEquipmentCSV = (data, filename) => {
    const csvData = data.map(item => ({
        ID: item.equipment_id,
        EquipmentName: item.equipment_name,
        EquipmentType: item.equipment_type,
        AddedBy: item.equipment_added_by_owner,
        AddedOn: item.equipment_added_on.split('T')[0],
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToSessionCSV = (data, filename) => {
    const csvData = data.map(item => ({
        ID: item.session_id,
        SessionTitle: item.session_title,
        SessionHost: item.session_host,
        SessionTime: item.session_time,
        SessionSchoolName: item.school_name,
        SessionLabName: item.lab_name,
        SessionSetupBy: item.session_setup_by_email,
        SessionSetupOn: item.session_setup_on.split('T')[0],
        SessionStatus: item.session_status,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToUserActivityCSV = (data, filename) => {
    const csvData = data.map(item => ({
        ID: item.log_id,
        Activity: item.activity,
        LogDate: item.log_date.split('T')[0],
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data.map(item => ({
        Name: item.doc_nm,
        Type: item.doctype_nm,
        Author: item.owner_author_id,
        UploadedDate: item.date_uploaded.split('T')[0],
        Description: item.doc_description
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, filename);
};

export const exportToUserExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data.map(item => ({
        ID: item.id,
        Name: item.username,
        Email: item.email,
        Author: item.role_id === 1 ? 'Admin' : 'User'
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, filename);
};

export const exportToSchoolExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data.map(item => ({
        ID: item.school_id,
        SchoolName: item.school_name,
        State: item.state,
        Address: item.address,
        GeoLocation: item.geo_location,
        SchoolEmailId: item.school_email_id,
        PrimaryContactPerson: item.primary_contact_person,
        ContactNo: item.contact_no,
        BoardedBy: item.on_boarded_by_owner,
        BoardedOn: item.on_boarded_on.split('T')[0],
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, filename);
};

export const exportToLabExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data.map(item => ({
        ID: item.lab_id,
        LabName: item.lab_name,
        LabType: item.lab_type,
        LabSchool: item.lab_school,
        AddedBy: item.lab_added_by_owner,
        AddedOn: item.lab_added_on.split('T')[0],
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, filename);
};

export const exportToEquipmentExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data.map(item => ({
        ID: item.equipment_id,
        EquipmentName: item.equipment_name,
        EquipmentType: item.equipment_type,
        AddedBy: item.equipment_added_by_owner,
        AddedOn: item.equipment_added_on.split('T')[0],
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, filename);
};

export const exportToSessionExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data.map(item => ({
        ID: item.session_id,
        SessionTitle: item.session_title,
        SessionHost: item.session_host,
        SessionTime: item.session_time,
        SessionSchoolName: item.school_name,
        SessionLabName: item.lab_name,
        SessionSetupBy: item.session_setup_by_email,
        SessionSetupOn: item.session_setup_on.split('T')[0],
        SessionStatus: item.session_status,
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, filename);
};

export const exportToUserActivityExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data.map(item => ({
        ID: item.log_id,
        Activity: item.activity,
        LogDate: item.log_date.split('T')[0],
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, filename);
};

export const exportToPDF = (elementSelector, filename) => {
    const input = document.querySelector(elementSelector);
    html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
    });
};

export const handlePrint = (elementSelector) => {
    const printContents = document.querySelector(elementSelector).innerHTML;
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write(`
        <html>
            <head>
                <title>Print</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                ${printContents}
            </body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
};