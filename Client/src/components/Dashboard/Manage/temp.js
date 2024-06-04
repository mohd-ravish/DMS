import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const AddUrl = ({ docTypes, availableTags, handleTagChange, tags, setTags }) => {
    const [urlDetails, setUrlDetails] = useState({
        infoHead: "",
        url: "",
        docType: "",
        description: "",
        publish: "no",
    })

    const handleUrlDetails = (e) => {
        const { value, name } = e.target
        setUrlDetails((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    // const [infoHead, setinfoHead] = useState("");
    // const [url, setUrl] = useState("");
    // const [docType, setDocType] = useState("");
    // const [description, setDescription] = useState("");
    // const [publish, setPublish] = useState("no");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("infoHead", infoHead);
        // formData.append("url", url);
        // formData.append("tags", JSON.stringify(tags.map(tag => tag.value)));
        // formData.append("docType", docType);
        // formData.append("description", description);
        // formData.append("publish", publish);

        try {
            const response = await Axios.post("http://localhost:4500/addUrl", urlDetails, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.data.status === "success") {
                toast.success("URL added successfully", {
                    position: "top-center"
                });
                setUrlDetails({
                    infoHead: "",
                    url: "",
                    docType: "",
                    description: "",
                    publish: "no",
                })
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
            <form className="upload-document-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Information Head</label>
                    <input
                        type="text"
                        name="infoHead"
                        value={urlDetails.infoHead}
                        onChange={handleUrlDetails}
                        placeholder="Title to the Documentation / Information"
                        maxLength="100"
                    />
                    <small>Max length 100 char</small>
                </div>
                <div className="form-group">
                    <label>Document/Info URL</label>
                    <input
                        type="text"
                        name="url"
                        value={urlDetails.url}
                        onChange={handleUrlDetails}
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
                    <select value={urlDetails.docType} onChange={handleUrlDetails}>
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
                        name="description"
                        value={urlDetails.description}
                        onChange={handleUrlDetails}
                    />
                    <small>Max length 500 Char</small>
                </div>
                <div className="form-group">
                    <label>Publish Now</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="no"
                                value="no"
                                checked={urlDetails.publish === 'no'}
                                onChange={handleUrlDetails}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="yes"
                                value="yes"
                                checked={urlDetails.publish === 'yes'}
                                onChange={handleUrlDetails}
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