const express = require('express');
const {authUser, gettAllUsers} = require('../controllers/userControllers');
const { protect } = require('../Middlewares/authMiddleware');

const router = express.Router()

router.route("/").get(protect, gettAllUsers)
router.route('/login').post(authUser)

module.exports = router