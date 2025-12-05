const Card = require("../models/Card");
const List = require("../models/List");
const Activity = require("../models/Activity");

// create card
exports.createCard = async (req, res) => {
  try {
    const { title, description, assignee } = req.body;
    const boardId = req.params.id;
    const listId = req.params.listId;

    const card = await Card.create({
      title,
      description: description || "",
      board: boardId,
      list: listId,
      assignee: assignee || null,
      position: 0
    });

    // Insert at end of list
    const list = await List.findById(listId);
    list.cards.push(card._id);
    await list.save();

    // Activity
    await Activity.create({
      text: `${req.user.name} created card ${card.title}`,
      board: boardId,
    });

    res.json(card);
  } catch (err) {
    console.error("Create card error:", err);
    res.status(500).send("Server error");
  }
};

//  Update card (MOVE + UPDATE) 
exports.updateCard = async (req, res) => {
  try {
    const { title, description, listId, assignee, position } = req.body;
    const boardId = req.params.id;
    const cardId = req.params.cardId;

    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ msg: "Card not found" });

    const oldListId = String(card.list);

    //  CASE 1: MOVING TO DIFFERENT LIST 
    if (listId && listId !== oldListId) {
      const oldList = await List.findById(oldListId);
      oldList.cards = oldList.cards.filter(
        (c) => String(c) !== String(cardId)
      );
      await oldList.save();

      const newList = await List.findById(listId);

      // Insert card at correct position
      newList.cards.splice(position, 0, cardId);
      await newList.save();

      card.list = listId;
      card.position = position;
    }

    //  CASE 2: SAME LIST REORDER 
    else if (position !== undefined) {
      const list = await List.findById(oldListId);

      // remove card
      list.cards = list.cards.filter((c) => String(c) !== String(cardId));

      // insert at new position
      list.cards.splice(position, 0, cardId);
      await list.save();

      card.position = position;
    }

    //  UPDATE OTHER FIELDS 
    if (title) card.title = title;
    if (description) card.description = description;
    if (assignee) card.assignee = assignee;

    await card.save();

    // Activity
    await Activity.create({
      text: `${req.user.name} updated card ${card.title}`,
      board: boardId,
    });

    res.json(card);
  } catch (err) {
    console.error("Update card error:", err);
    res.status(500).send("Server error");
  }
};
