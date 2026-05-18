const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

router.post("/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/employees/search", async (req, res) => {
  try {
    const employees = await Employee.find({
      department: req.query.department,
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
