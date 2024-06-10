const express = require('express');
const { getAllChats, accessChat, createGroup, renameGroup, addToGroup, removeFromGroup, deleteGroup } = require('../controllers/chatControllers');
const { protect } = require('../Middlewares/authMiddleware');

const router = express.Router();

router.route("/").get(protect, getAllChats)
router.route("/access").post(protect, accessChat)

// group routes
router.route("/group").post(protect, createGroup).delete(protect, deleteGroup)
router.route("/group/rename").put(protect, renameGroup)
router.route("/group/add").put(protect, addToGroup)
router.route("/group/remove").put(protect, removeFromGroup)



module.exports = router;