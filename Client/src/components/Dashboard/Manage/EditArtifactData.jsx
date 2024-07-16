import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatableSelect from 'react-select/creatable';
import { fetchUploadTags, handleTagChange } from '../ApiHandler/tagsFunctions';
import { fetchDocTypes } from '../ApiHandler/artifactsFunctions';
import { handleEditArtifact } from '../ApiHandler/uploadFunctions';
import { handleDeleteArtifact } from '../ApiHandler/artifactsFunctions';

const EditMetaData = ({ editFormData, artifacts, setArtifacts, handleClose }) => {
    const [availableTags, setAvailableTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [docTypes, setDocTypes] = useState([]);
    const [docType, setDocType] = useState(editFormData.doc_type);
    const [description, setDescription] = useState(editFormData.doc_description);
    const [publish, setPublish] = useState(editFormData.is_published);
    const [status, setStatus] = useState(editFormData.doc_status);

    useEffect(() => {
        fetchUploadTags(setAvailableTags);
        fetchDocTypes(setDocTypes);
        // Initializing already used/current tags in the selectbar
        if (availableTags.length > 0) {
            const initialTags = editFormData.assoc_tags.split(',').map(tagId => {
                const tag = availableTags.find(tag => tag.value === parseInt(tagId));
                return tag ? { value: tag.value, label: tag.label } : null;
            }).filter(tag => tag !== null);
            setTags(initialTags);
        }
    }, [availableTags, editFormData.assoc_tags]);

    const getStatusClass = () => {
        if (editFormData.doc_status === 'archived') {
            return 'status-archived';
        } else if (editFormData.doc_status === 'active' && editFormData.is_published === 1) {
            return 'status-active-published';
        } else if (editFormData.doc_status === 'active' && editFormData.is_published === 0) {
            return 'status-active-not-published';
        }
        return '';
    };

    const getStatusText = () => {
        if (editFormData.doc_status === 'archived') {
            return 'Archived not search ready';
        } else if (editFormData.doc_status === 'active' && editFormData.is_published === 1) {
            return 'Active and published';
        } else if (editFormData.doc_status === 'active' && editFormData.is_published === 0) {
            return 'Active but not published';
        }
        return '';
    };

    const getTagNames = (tagIds) => {
        return tagIds.split(',').map(tagId => {
            const tag = availableTags.find(tag => tag.value === parseInt(tagId));
            return tag ? tag.label : null;
        });
    };

    return (
        <div className="edit-document-container">
            <ToastContainer />
            <header className="upload-document-header">
                <h1>Edit Metadata</h1>
            </header>
            <form className="edit-document-form" onSubmit={(e) => handleEditArtifact(e, editFormData.id, tags, docType, description, publish, status)}>
                <div className="form-group">
                    <label>Document ID</label>
                    <span className="document-id">{editFormData.id}</span>
                    <span className={`document-status ${getStatusClass()}`}>{getStatusText()}</span>
                </div>
                <div className="form-group">
                    <label>Document Name</label>
                    <span className="document-name">{editFormData.doc_nm}</span>
                </div>
                <div className="form-group">
                    <label>Current Tags</label>
                    <div className="tags">
                        {getTagNames(editFormData.assoc_tags).map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Document Tags</label>
                    <CreatableSelect
                        isMulti
                        value={tags}
                        onChange={(newValue) => handleTagChange(newValue, availableTags, setAvailableTags, tags, setTags)}
                        options={availableTags}
                        placeholder="Select or create tags"
                        className="document-tags-select"
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
                        maxLength={500}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {/* <small className="char-limit">Max length 500 Char</small> */}
                </div>
                <div className="form-group">
                    <label>Publish</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value={0}
                                checked={publish === 0}
                                onChange={() => setPublish(0)}
                            /> No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={1}
                                checked={publish === 1}
                                onChange={() => setPublish(1)}
                            /> Yes
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Document State</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="active"
                                checked={status === 'active'}
                                onChange={() => setStatus('active')}
                            /> Active
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="archived"
                                checked={status === 'archived'}
                                onChange={() => setStatus('archived')}
                            /> Archive
                        </label>
                    </div>
                </div>
                <div className="form-actions">
                    <div>
                        <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="update-btn">Update</button>
                    </div>
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to delete the document`)) {
                                handleDeleteArtifact(editFormData.id, artifacts, setArtifacts, handleClose);
                            }
                        }}>Delete Artifact</button>
                </div>
            </form>
            <div className="usage-instructions">
                <h2>📢 Usage Instructions</h2>
                <ul>
                    <li><i className='bx bx-paper-plane'></i> You may select existing tag(s) for your document. If no suitable tag available then key in a new tag and hit enter.</li>
                    <li><i className='bx bx-paper-plane'></i> If you select new tags then new tags will be updated against the document.</li>
                    <li><i className='bx bx-paper-plane'></i> You may select maximum of 10 tags per document.</li>
                    <li><i className='bx bx-paper-plane'></i> If you choose to Archive the document, it will be set to  Un-publish state and all tags will be removed.</li>
                    <li><i className='bx bx-paper-plane'></i> You may choose a new document type for the same document.</li>
                    <li><i className='bx bx-paper-plane'></i> You need to Publish the document to be search ready for the end user. You may Publish / Un-publish any document later as well.</li>
                </ul>
            </div>
        </div>
    );
};

export default EditMetaData;
