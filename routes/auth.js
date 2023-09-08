const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
<<<<<<< HEAD
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
=======
    const existemail = await User.findOne({ name: req.body.email });
    if (existemail) return res.send("already register");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

>>>>>>> b5ed66af72d591f0ef679153e508a7a6a2b27965
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
<<<<<<< HEAD
    // Find a user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Email not found.");
=======
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Wrong credentials!");

    const email = await User.findOne({ email: req.body.email });
    if (!email) return res.status(400).json("check you emai!");
>>>>>>> b5ed66af72d591f0ef679153e508a7a6a2b27965

    // Compare the provided password with the stored hashed password
    const validated = await bcrypt.compare(req.body.password, user.password);
<<<<<<< HEAD
    if (!validated) return res.status(400).json("Wrong credentials.");
=======
    if (!validated) return res.status(400).json("Wrong credentials!");
>>>>>>> b5ed66af72d591f0ef679153e508a7a6a2b27965

    // If the credentials are valid, send back the user details without the password
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
