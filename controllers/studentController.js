import Student from "../models/studentModel.js";
import Class from "../models/classModel.js";
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
    const student = new Student(req.body);
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
