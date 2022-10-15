const User = require("../SchemaModels/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const userInfo = req.body;
  try {
    const searchedUser = await User.findOne({ email: userInfo.email });
    if (searchedUser) {
      res.status(401).json({ errors: [{ msg: "user already exist" }] });
    }
    if (!searchedUser) {
      const hashedPasword = await bcrypt.hash(userInfo.password, 10);
      const user = new User({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        age: userInfo.age,
        email: userInfo.email,
        password: userInfo.password,
        gender: userInfo.gender,
        Pict: userInfo.Pict,
        Phone: userInfo.Phone,
        address: userInfo.address,
        role: userInfo.role,
      });
      await user.save();
      const token = jwt.sign({ id: user._id }, "shhhhh");
      res
        .status(200)
        .json({ errors: [{ message: "saved successfully", user, token }] });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed exist" }] });
  }
};

const logIn = async (req, res) => {
  const userInfo = req.body;
  try {
    const user = await User.findOne({ email: userInfo.email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "you must register before" }] });
    } else {
      const result = await bcrypt.compare(userInfo.password, user.password);
      if (!result) {
        res.status(401).json({ errors: [{ msg: "wrong password" }] });
      } else {
        const token = await jwt.sign({ id: user._id }, "shhhhh");
        res.status(401).json({ user, token });
      }
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed" }] });
  }
};

module.exports = { logIn, signUp };
