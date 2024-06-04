import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const AddUrl = ({ docTypes, availableTags, handleTagChange, tags, setTags }) => {
    const [infoHead, setinfoHead] = useState("");
    const [url, setUrl] = useState("");
    const [docType, setDocType] = useState("");
    const [description, setDescription] = useState("");
    const [publish, setPublish] = useState("no");

    const handleUrlSubmit = async (e) => {
        e.preventDefault();
        const urlDetails = {
            infoHead: infoHead,
            url: url,
            tags: JSON.stringify(tags.map(tag => tag.value)),
            docType: docType,
            description: description,
            publish: publish
          };

        try {
            const response = await Axios.post("http://localhost:4500/addUrl", urlDetails, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.data.status === "success") {
                toast.success("URL added successfully", {
                    position: "top-center"
                });
                setinfoHead("");
                setUrl("");
                setTags([]);
                setDocType("");
                setDescription("");
                setPublish("no");
            } else {
                toast.error("URL add failed", {
                    position: "top-center"
                });
            }
        } catch (error) {
            toast.error("An error occurred while adding the URL", {
                position: "top-center"
            });
        }
    };

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
                        onChange={(e) => setinfoHead(e.target.value)}
                        placeholder="Title to the Documentation / Information"
                        maxLength="100"
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
                    />
                </div>
                <div className="form-group">
                    <label>Document Type</label>
                    <select value={docType} onChange={(e) => setDocType(e.target.value)}>
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