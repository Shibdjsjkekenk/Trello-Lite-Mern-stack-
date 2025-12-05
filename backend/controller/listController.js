const List = require("../models/List");
const Board = require("../models/Board");
const Activity = require("../models/Activity");

exports.createList = async (req, res) => {
  try {
    const { title } = req.body;
    const boardId = req.params.id;

    let list = await List.create({
      title,
      board: boardId,
      cards: []
    });

    // add list inside board
    const board = await Board.findById(boardId);
    board.lists.push(list._id);
    await board.save();

    // activity
    await Activity.create({
      text: `${req.user.name} created list ${title}`,
      board: boardId,
    });

    res.json(list);
  } catch (err) {
    console.error("Create list error:", err);
    res.status(500).json({ msg: "Server error while creating list" });
  }
};
