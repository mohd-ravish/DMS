import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatableSelect from 'react-select/creatable';
import { fetchUploadTags, handleTagChange as handleTagChangeFn } from '../ApiHandler/tagsFunctions';
import { fetchDocTypes } from '../ApiHandler/artifactsFunctions';
import { handleUrlSubmit as handleUrlSubmitFn } from '../ApiHandler/uploadFunctions';

const AddUrl = () => {
    const [infoHead, setInfoHead] = useState("");
    const [url, setUrl] = useState("");
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [docType, setDocType] = useState("");
    const [docTypes, setDocTypes] = useState([]);
    const [description, setDescription] = useState("");
    const [publish, setPublish] = useState("no");

    useEffect(() => {
        fetchUploadTags(setAvailableTags);
        fetchDocTypes(setDocTypes);
    }, []);

    const handleTagChange = (newValue) => {
        handleTagChangeFn(newValue, availableTags, setAvailableTags, tags, setTags);
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        handleUrlSubmitFn(infoHead, url, tags, docType, description, publish, setInfoHead, setUrl, setTags, setDocType, setDescription, setPublish);
    }

    return (
        <div className="upload-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Add URL</h1>
            </header>
            <form className="upload-document-form" onSubmit={handleUrlSubmit}>
                <div className="form-group">
                    <label>Information Head</label>
                    <input
                        type="text"
                        value={infoHead}
                        onChange={(e) => setInfoHead(e.target.value)}
                        placeholder="Title to the Documentation / Information"
                        maxLength="100"
                        required
                    />
                    <small>Max length 100 char</small>
                </div>
                <div className="form-group">
                    <label>Document/Info URL</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="URL to the Documentation / Information"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Document Tags</label>
                    <CreatableSelect
                        isMulti
                        value={tags}
                        onChange={handleTagChange}
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
                        required
                    />
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
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i class='bx bx-paper-plane'></i> You may select existing tag(s) for your document. If no suitable tag available then key in a new tag and hit enter.</li>
                    <li><i class='bx bx-paper-plane'></i> You may select maximum of 10 tags per document.</li>
                    <li><i class='bx bx-paper-plane'></i> You may choose to 'Publish' the document at this stage. By default the document would remain in Un-published state.</li>
                    <li><i class='bx bx-paper-plane'></i> You need to 'Publish' the document to be search ready for the end user. You may Publish / Un-publish any document later as well.</li>
                    <li><i class='bx bx-paper-plane'></i> To manage (publish/un-publish/archive/restore) artifacts, click here or go to Manage Manage Artifacts</li>
                </ul>
            </div>
        </div>
    );
};

export default AddUrl;