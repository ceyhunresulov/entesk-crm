import Student from "../models/studentModel.js";
import Class from "../models/classModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: { error: err.message } });
  }
};

// Get Student
export const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: { error: err.message } });
  }
};

// Create student
export const createStudent = async (req, res) => {
  const { email } = req.body.email;
  try {
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "A student with the same email already exists" });
    }

    const classesId = req.body.classes;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const student = new Student({ ...req.body, password: hashedPassword });
    await student.save();

    await Class.updateMany(
      { _id: { $in: classesId } },
      { $addToSet: { students: student._id } }
    );

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login student

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: student.email, id: student._id },
      process.env.SECRET_KEY,
      { expiresIn: "20s" }
    );

    res.status(200).json({ student, token });
  } catch (err) {
    res.status(500).json({ message: { error: err.message } });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  let updatedData = req.body;

  try {
    if (updatedData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updatedData.password, salt);
      updatedData = { ...updatedData, password: hashedPassword };
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updateStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: { error: err.message } });
  }
};

// Delete student

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: { error: err.message } });
  }
};
