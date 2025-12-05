const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");

// create board
exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      owner: req.user.id,
      members: [req.user.id], // By default only creator is a member
    });

    res.json(board);
  } catch (err) {
    console.error("Create board error:", err);
    res.status(500).json({ msg: "Server error creating board" });
  }
};

// get single board
exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate({
        path: "lists",
        populate: { path: "cards", options: { sort: { position: 1 } } },
      })
      .exec();

    if (!board) return res.status(404).json({ msg: "Board not found" });

    res.json(board);
  } catch (err) {
    console.error("Get board error:", err);
    res.status(500).json({ msg: "Server error fetching board" });
  }
};

// get user board
exports.getUserBoards = async (req, res) => {
  try {
    const boards = await Board.find({ members: req.user.id }).select(
      "title _id"
    );

    res.json(boards);
  } catch (err) {
    console.error("Get boards error:", err);
    res.status(500).json({ msg: "Server error loading boards" });
  }
};

// add memeber to board admin only
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ msg: "Board not found" });

    if (!board.members.includes(userId)) {
      board.members.push(userId);
      await board.save();
    }

    res.json({ msg: "Member added", board });
  } catch (err) {
    console.error("Add member error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// remove member from board admin only
exports.removeMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ msg: "Board not found" });

    board.members = board.members.filter(
      (id) => String(id) !== String(userId)
    );
    await board.save();

    res.json({ msg: "Member removed", board });
  } catch (err) {
    console.error("Remove member error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// delete board admin only
exports.deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.id;

    await Board.findByIdAndDelete(boardId);
    await List.deleteMany({ board: boardId });
    await Card.deleteMany({ board: boardId });

    res.json({ msg: "Board deleted successfully" });
  } catch (err) {
    console.error("Delete board error:", err);
    res.status(500).json({ msg: "Server error deleting board" });
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find()
      .populate("owner", "name email")
      .populate("members", "name email");

    res.json(boards);
  } catch (err) {
    console.error("Error loading boards:", err);
    res.status(500).json({ msg: "Server error loading boards" });
  }
};


