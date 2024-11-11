const express = require("express");
const Employee = require("../models/Employee");
const multer = require("multer");
const router = express.Router();

// Image upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only jpg/png files are allowed"));
    } else {
      cb(null, true);
    }
  },
});

// Route to create a new employee
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses, imageUrl } = req.body;

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null, 
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
});

// GET EMPLOYEE BY ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee details', error });
  
  }
  
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});

// Edit employee details
router.put('/:id', upload.single("image"), async (req, res) => {
  try {
    // Get the updated details from req.body
    const { name, email, mobile, designation, gender, courses } = req.body;

    // Find the existing employee
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // If a new image is uploaded, update imageUrl
    const updatedImage = req.file ? req.file.path : employee.imageUrl;

    // Update the employee data
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobile,
        designation,
        gender,
        courses,
        imageUrl: updatedImage, // If there's a new image, update it, otherwise keep the old one
      },
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
});

module.exports = router;
