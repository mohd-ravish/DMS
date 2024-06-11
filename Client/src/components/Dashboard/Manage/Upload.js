import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatableSelect from 'react-select/creatable';
import { fetchUploadTags, handleTagChange } from '../ApiHandler/tagsFunctions';
import { fetchDocTypes } from '../ApiHandler/artifactsFunctions';
import { handleDocumentSubmit } from '../ApiHandler/uploadFunctions';
import { fetchSettings } from '../ApiHandler/settingsFunctions'

const UploadDocument = () => {
    const [limit, setLimit] = useState("");
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [docType, setDocType] = useState("");
    const [docTypes, setDocTypes] = useState([]);
    const [description, setDescription] = useState("");
    const [publish, setPublish] = useState("no");

    useEffect(() => {
        fetchSettings(setLimit)
        fetchUploadTags(setAvailableTags);
        fetchDocTypes(setDocTypes);
    }, []);

    // Function to convert the limit from KB to MB
    const kbToMb = (kb) => {
        return Math.ceil(kb / 1024);
    };

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Upload Document</h1>
            </header>
            <form className="upload-document-form" onSubmit={(e) => handleDocumentSubmit(e, limit, file, tags, docType, description, publish, setFile, setTags, setDocType, setDescription, setPublish)}>
                <div className="form-group">
                    <label>Upload File</label>
                    <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} required />
                    <small>Allowed File Size: {kbToMb(limit)} Mb</small>
                </div>
                <div className="form-group">
                    <label>Document Tags</label>
                    <CreatableSelect
                        isMulti
                        value={tags}
                        onChange={(newValue) => handleTagChange(newValue, availableTags, setAvailableTags, tags, setTags)}
                        options={availableTags}
                        placeholder="Select or create tags"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Document Type</label>
                    <select value={docType} onChange={(e) => setDocType(e.target.value)} required>
                        <option value="">Select</option>
                        {docTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.doctype_nm}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Brief Description</label>
                    <textarea
                        placeholder="Type your menu Details"
                        maxLength="500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                    <small>Max length 500 Char</small>
                </div>
                <div className="form-group">
                    <label>Publish Now</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="no"
                                checked={publish === 'no'}
                                onChange={(e) => setPublish(e.target.value)}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                checked={publish === 'yes'}
                                onChange={(e) => setPublish(e.target.value)}
                            />
                            Yes
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit">Upload</button>
                </div>
            </form>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i className='bx bx-paper-plane'></i> You may select existing tag(s) for your document. If no suitable tag available then key in a new tag and hit enter.</li>
                    <li><i className='bx bx-paper-plane'></i> You may select a maximum of 10 tags per document.</li>
                    <li><i className='bx bx-paper-plane'></i> You may choose to 'Publish' the document at this stage. By default, the document would remain in Unpublished state.</li>
                    <li><i className='bx bx-paper-plane'></i> You need to 'Publish' the document to be search-ready for the end user. You may Publish / Unpublish any document later as well.</li>
                    <li><i className='bx bx-paper-plane'></i> To manage (publish/unpublish/archive/restore) artifacts, click here or go to Manage Artifacts.</li>
                    <li><i className='bx bx-paper-plane'></i> Allowed file document formats are 'jpg', 'png', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'zip', 'csv', 'ppt', 'pptx', 'txt'.</li>
                </ul>
            </div>
        </div>
    );
};

export default UploadDocument;