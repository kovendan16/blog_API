const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // Check if a user with the same username already exists
    const existUsername = await User.findOne({ username: req.body.username });
    if (existUsername)
      return res
        .status(400)
        .json("Username already exists. Add a numeric suffix if needed.");

    // Check if a user with the same email already exists
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) return res.status(400).json("Email already registered.");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // Save the new user to the database
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // Find a user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Email not found.");

    // Compare the provided password with the stored hashed password
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).json("Wrong credentials.");

    // If the credentials are valid, send back the user details without the password
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
