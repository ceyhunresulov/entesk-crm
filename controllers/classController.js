import Class from "../models/classModel.js";

export const createClass = async (req, res) => {
  const { name } = req.body;
  try {
    const existingClass = await Class.findOne({ name });
    if (existingClass) {
      return res
        .status(400)
        .json({ message: "A class with the same name already exists" });
    }

    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ errror: err.message });
  }
};
