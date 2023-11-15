const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const User = require("../Models/UserModel");
const mongoose = require("mongoose");
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/userInfo", userVerification);

router.delete("/userInfo/:id", async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (user) {
    res.json({ status: true, message: "User deleted successfully" });
  } else {
    res.json({ status: false, message: "User not found" });
  }
});

router.put("/userInfo/:id", async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.id),
      { $set: { preferences: req.body.preferences } }
    );
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
