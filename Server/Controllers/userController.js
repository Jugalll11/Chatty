const User = require("../Model/userModel");
const Hashing = require("../PasswordHasher");

module.exports.register = async (req, res, next) => {
  const { Name, Username, Email } = req.body;
  if (await User.findOne({ Email: Email })) {
    res.send({
      message: "This Email Already Exists",
      status: "false",
    });
  } else if (await User.findOne({ Username: Username })) {
    res.send({
      message: "This Username Already Exists",
      status: "false",
    });
  } else {
    const Password = Hashing.hashpassword(req.body.Password);
    const newUser = await User.create({
      Email: Email,
      Password: Password,
      Username: Username,
      Name: Name,
    });
    res.send({
      message: "Account Created Succesfully",
      status: "true",
    });
  }
};

module.exports.login = async (req, res, next) => {
  res.send("200");
  console.log("Logged");
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select([
      "Email", "Username", "Pfp", "_id"
    ]);
    console.log(users)
    return res.json(users)
  } catch (error) {
    next(error);
  }
};
