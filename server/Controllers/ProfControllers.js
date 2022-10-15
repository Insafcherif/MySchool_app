const Prof = require("../SchemaModels/ProfSchema");

const getAllProfs = async (req, res) => {
  try {
    const profs = await Prof.find();
    if (profs.length === 0) {
      res.status(201).json({ msg: "your database is empty" });
    } else {
      res.status(200).json({ profs: profs });
    }
  } catch (error) {
    res.status(400).json({ msg: "get all profs is failed" });
  }
};
const getOneProf = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedProf = await Prof.findOne({ _id: id });
    if (!searchedProf) {
      return res.status(101).json({ msg: "Prof not found" });
    } else {
      res.status(200).json({ prof: searchedProf });
    }
  } catch (error) {
    res.status(400).json({ msg: "getting one Prof is failed" });
  }
};
const addProf = async (req, res) => {
  const profInfo = req.body;
  try {
    const newProf = new Prof({
      firstName: profInfo.firstName,
      lastName: profInfo.lastName,
      age: profInfo.age,
      email: profInfo.email,
      password: profInfo.password,
      bio: profInfo.bio,
      date_of_birth: profInfo.date_of_birth,
      contactType: profInfo.contactType,
      ContactDate: profInfo.ContactDate,
      subject: profInfo.subject,
    });
    const profs = await Prof.find();
    const searchedProf = profs.find(
      (elt) => elt.email == profInfo.email
    );
    if (searchedProf) {
      res.status(201).json({ msg: "Prof already exist" });
    } else {
      await newProf.save();
      res.status(200).json({ prof : newProf });
    }
  } catch (error) {
    res.status(400).json({ msg: "add prof is failed" });
  }
};
const deteleProf = async (req, res) => {
  const id = req.params.id;
  try {
    await Prof.findByIdAndDelete(id);
    const profs = await Prof.find();
    res
      .status(200)
      .json({ msg: "delete is succesfully done", profs: profs });
  } catch (error) {
    res.status(400).json({ msg: "delete Prof is failed" });
  }
};
const updateProf = async (req, res) => {
  const id = req.params.id;
  const profInfo = req.body;
  try {
    const updateProf = await Prof.findByIdAndUpdate(id, profInfo, {
      new: true,
    });

    const profs = await Prof.find();
    res.status(200).json({ msg: "update prof is succesfully", updateProf });
  } catch (error) {
    res.status(400).json({ msg: "update prof is failed" });
  }
};

module.exports = {
  getAllProfs,
  getOneProf,
  addProf,
  deteleProf,
  updateProf,
};
