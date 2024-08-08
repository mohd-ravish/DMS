const express = require('express');
const verifyUser = require('../middlewares/auth');
const tagsController = require('../controllers/tagsController');

const router = express.Router();

router.get('/fetchAllTags', verifyUser, tagsController.fetchAllTags);
router.post('/createTag', verifyUser, tagsController.createTag);
router.put('/updateTag/:id', verifyUser, tagsController.updateTag);
router.post('/saveSearchedTag', verifyUser, tagsController.saveSearchedTag);
router.get('/getTopSearchedTags', tagsController.getTopSearchedTags);
router.get('/getCountSearches', tagsController.getCountSearches);

module.exports = router;