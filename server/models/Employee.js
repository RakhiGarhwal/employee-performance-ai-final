const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  skills: [String],
  performanceScore: Number,
  experience: String,
});

module.exports = mongoose.model("Employee", employeeSchema);