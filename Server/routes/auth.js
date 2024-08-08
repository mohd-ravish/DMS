const express = require('express');
const verifyUser = require('../middlewares/auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.post("/login", authController.login);
router.get("/verifyUser", verifyUser, authController.verifyUser);
router.post("/logout", verifyUser, authController.logout);

module.exports = router;