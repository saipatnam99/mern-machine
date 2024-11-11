const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], required: true },
  imageUrl: { type: String },
  createDate: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
