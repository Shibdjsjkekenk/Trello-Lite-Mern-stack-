const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  createBoard,
  getBoard,
  getUserBoards,
  addMember,
  removeMember,
  deleteBoard,
} = require("../controller/boardController");

const { createList } = require("../controller/listController");
const { createCard, updateCard } = require("../controller/cardController");
const { getBoardActivities } = require("../controller/activityController");

// user
router.get("/", auth, getUserBoards);
router.post("/", auth, createBoard);
router.get("/:id", auth, getBoard);
router.post("/:id/lists", auth, createList);
router.post("/:id/lists/:listId/cards", auth, createCard);
router.put("/:id/cards/:cardId", auth, updateCard);
router.get("/:id/activities", auth, getBoardActivities);

// admin
router.post("/:id/add-member", auth, admin, addMember);
router.post("/:id/remove-member", auth, admin, removeMember);
router.delete("/:id", auth, admin, deleteBoard);

module.exports = router;
