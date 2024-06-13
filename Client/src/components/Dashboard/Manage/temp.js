// Route to search documents by tags
// router.post('/searchArtifacts', async (req, res) => {
//     const { selectedTags } = req.body;
//     try {
//         const tagConditions = selectedTags.map(tag => `assoc_tags LIKE ?`).join(' OR ');
//         const query = `
//             SELECT * FROM documents
//             WHERE doc_status = 'active' AND (${tagConditions})
//         `;

//         const values = selectedTags.map(tag => `%,${tag.value},%`);
//         const [results] = await db.query(query, values);

//         res.json({ status: 'success', data: results });
//     } catch (error) {
//         console.error('Error fetching documents:', error);
//         res.status(500).json({ status: 'error', message: 'Server error' });
//     }
// });

// Funciton to search artifacts
// export const handleSearchSubmit = async (tags, setDocuments) => {
//     try {
//         const response = await Axios.post('http://localhost:4500/artifacts/searchArtifacts', {
//             selectedTags: tags,
//         }, {
//             headers: {
//                 Authorization: localStorage.getItem("token"),
//             },
//         });
//         if (response.data.status === 'success') {
//             setDocuments(response.data.data);
//         } else {
//             console.log("Failed to fetch documents");
//         }
//     } catch (error) {
//         console.log("Error searching documents:", error);
//     }
// };


// {doc.doc_format === 'url' ? <a href={doc.doc_path} target='_blank'><h3><i className='bx bx-link'></i>{doc.doc_nm}</h3></a> : <p><h3><i className='bx bx-download'></i> {doc.doc_nm}</h3></p>}

// Set up Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/uploads");
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const baseName = path.basename(file.originalname, ext);
//         cb(null, `${baseName}-${Date.now()}${ext}`);
//     }
// });
// export const handleTagChange = async (newValue, availableTags, setAvailableTags, tags, setTags) => {
//     if (newValue.length > 10) {
//         toast.warn("You can only add up to 10 tags.", {
//             position: "top-center"
//         });
//         return;
//     }
//     const newTags = newValue.filter(option => option.__isNew__);
//     if (newTags.length > 0) {
//         try {
//             const response = await Axios.post("http://localhost:4500/tags/createTag", { tag_nm: newTags[0].label }, {
//                 headers: {
//                     Authorization: localStorage.getItem("token"),
//                 },
//             });
//             if (response.data.status === "success") {
//                 const newTagId = response.data.data.id;
//                 setAvailableTags([...availableTags, { value: newTagId, label: newTags[0].label }]);
//                 setTags([...tags, { value: newTagId, label: newTags[0].label }]);
//             } else {
//                 console.log("Failed to create tag");
//             }
//         } catch (error) {
//             console.log("An error occurred while creating tag");
//         }
//     } else {
//         setTags(newValue);
//     }
// };
// export const handleDocumentSubmit = async (e, limit, file, tags, docType, description, publish, setFile, setTags, setDocType, setDescription, setPublish) => {
//     e.preventDefault();
//     const fileSize = file.size / 1024; // In KB
//     if (fileSize > limit) {
//         toast.error("File size exceeds the allowed limit", {
//             position: "top-center"
//         });
//         return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("tags", tags.map(tag => tag.value));
//     formData.append("docType", docType);
//     formData.append("description", description);
//     formData.append("publish", publish);
//     try {
//         const response = await Axios.post("http://localhost:4500/upload/uploadDocument", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Authorization: localStorage.getItem("token"),
//             },
//         });
//         if (response.data.status === "success") {
//             toast.success(response.data.message, {
//                 position: "top-center"
//             });
//             setFile(null);
//             setTags([]);
//             setDocType("");
//             setDescription("");
//             setPublish("no");
//         } else {
//             toast.error(response.data.message, {
//                 position: "top-center"
//             });
//         }
//     } catch (error) {
//         toast.error("An error occurred while uploading the document", {
//             position: "top-center"
//         });
//     }
// };
// export const handleTagChange = (newValue, setTags, newTags, setNewTags) => {
//     if (newValue.length > 10) {
//         toast.warn("You can only add up to 10 tags.", {
//             position: "top-center"
//         });
//         return;
//     }
//     const newTagsAdded = newValue.filter(option => option.__isNew__);
//     const existingTags = newValue.filter(option => !option.__isNew__);
//     if (newTagsAdded.length > 0) {
//         const newTagNames = newTagsAdded.map(tag => tag.label);
//         setNewTags([...newTags, ...newTagNames]);
//         setTags([...existingTags, ...newTagsAdded]);
//     } else {
//         setTags(newValue);
//     }
// };
// export const handleDocumentSubmit = async (e, limit, file, tags, newTags, docType, description, publish, setFile, setTags, setNewTags, setDocType, setDescription, setPublish) => {
//     e.preventDefault();
//     const fileSize = file.size / 1024; // In KB
//     if (fileSize > limit) {
//         toast.error("File size exceeds the allowed limit", {
//             position: "top-center"
//         });
//         return;
//     }

//     try {
//         // Create new tags if any
//         const createdTags = await Promise.all(newTags.map(async (tag) => {
//             const response = await Axios.post("http://localhost:4500/tags/createTag", { tag_nm: tag }, {
//                 headers: {
//                     Authorization: localStorage.getItem("token"),
//                 },
//             });
//             if (response.data.status === "success") {
//                 return { value: response.data.data.id, label: tag };
//             } else {
//                 throw new Error(`Failed to create tag: ${tag}`);
//             }
//         }));

//         const allTags = [...tags, ...createdTags];
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("tags", allTags.map(tag => tag.value));
//         formData.append("docType", docType);
//         formData.append("description", description);
//         formData.append("publish", publish);

//         const response = await Axios.post("http://localhost:4500/upload/uploadDocument", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 Authorization: localStorage.getItem("token"),
//             },
//         });

//         if (response.data.status === "success") {
//             toast.success(response.data.message, {
//                 position: "top-center"
//             });
//             setFile(null);
//             setTags([]);
//             setNewTags([]);
//             setDocType("");
//             setDescription("");
//             setPublish("no");
//         } else {
//             toast.error(response.data.message, {
//                 position: "top-center"
//             });
//         }
//     } catch (error) {
//         toast.error("An error occurred while uploading the document", {
//             position: "top-center"
//         });
//         console.error(error);
//     }
// };
// router.get('/allTags', verifyUser, (req, res) => {
//     const query = "SELECT * FROM tags WHERE status = 'active'";
//     db.query(query, (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ status: "error", message: "Database query error" });
//         }
//         res.json({ status: "success", data: results });
//     });
// });