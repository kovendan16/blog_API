const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const existname = await User.findOne({ name: req.body.username });
    if (existname)
      return res.send(
        "already name exist add numberic numbers like ex :user01"
      );

    const existemail = await User.findOne({ name: req.body.email });
    if (existemail) return res.send("already register");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Wrong credentials!");

    const email = await User.findOne({ email: req.body.email });
    if (!email) return res.status(400).json("check you emai!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
