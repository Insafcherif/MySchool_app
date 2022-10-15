const express = require("express");
const router = express.Router();
const upload = require("../Midelwars/Upload");
const {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
} = require("../Controllers/UserControllers");

router.get("/allusers", getAllUsers);
router.get("/:id", getOneUser);
router.post("/adduser", upload.single("Pict"), addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
