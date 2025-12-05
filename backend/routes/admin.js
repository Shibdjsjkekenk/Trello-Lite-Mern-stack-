const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");

//  get all user admin only 
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// chnage user role admin only
router.put("/users/:id/role", auth, admin, async (req, res) => {
  try {
    const { role } = req.body;

    const allowed = ["user", "admin"];
    if (!allowed.includes(role))
      return res.status(400).json({ msg: "Invalid role" });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    res.json(user);

  } catch (err) {
    console.error("Role update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// del user admin only
router.delete("/users/:id", auth, admin, async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndDelete(id);

    res.json({ msg: "User deleted successfully" });

  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
