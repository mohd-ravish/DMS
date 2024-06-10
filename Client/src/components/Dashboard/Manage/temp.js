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