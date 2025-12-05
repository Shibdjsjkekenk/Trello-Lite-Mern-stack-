const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { getAllBoards } = require("../controller/boardController");

// /api/admin/boards
router.get("/", auth, admin, getAllBoards);

module.exports = router;
