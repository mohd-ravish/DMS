const express = require('express');
const verifyUser = require('../middlewares/auth');
const documentController = require('../controllers/artifactController');

const router = express.Router();

router.get('/fetchDocTypes', verifyUser, documentController.fetchDocTypes);
router.put('/updateDocType/:id', verifyUser, documentController.updateDocType);
router.post('/addNewDocType', verifyUser, documentController.addNewDocType);
router.delete('/deleteDocType/:id', verifyUser, documentController.deleteDocType);
router.get('/fetchMyArtifacts', verifyUser, documentController.fetchMyArtifacts);
router.get('/fetchAllArtifacts', verifyUser, documentController.fetchAllArtifacts);
router.delete('/deleteArtifact/:id', verifyUser, documentController.deleteArtifact);
router.get('/fetchTopContributors', documentController.fetchTopContributors);
router.get('/fetchCountOfArtifacts', documentController.fetchCountOfArtifacts);

module.exports = router;