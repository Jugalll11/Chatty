const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  Name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  Username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  Password: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  Pfp:{
    type: mongoose.SchemaTypes.String,
    // required:true,
    default:""
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;