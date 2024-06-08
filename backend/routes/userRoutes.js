const express = require('express');
const {authUser} = require('../controllers/userControllers')

const router = express.Router()

router.route('/login').post(authUser)

module.exports = router