const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
// require("dotenv").config({ path: './backend/.env' });
require("dotenv").config();


// Create a user using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({success, errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      let [username, useremail] = [req.body.name, req.body.email];
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({success, authToken,username,useremail});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error occured");
    }
  }
);

// Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({success,authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error occured");
    }
  }
);

// Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post("/getuser",fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error occured");
  }
});

router.post("/updatepassword",fetchuser, 
  async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    let success = false;
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials",success });
      }
      if(user.id.toString() !== req.user.id){
        return res.status(401).send("Authorisation failed");
      }
      const passwordCompare = await bcrypt.compare(oldPassword, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials",success });
      }
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(newPassword, salt);
      user.password = securePassword;
      const result = await user.save();
      success=true;
      res.send({"message":"Password updated successfully",success});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error occured");
    }
  }
);
module.exports = router;
