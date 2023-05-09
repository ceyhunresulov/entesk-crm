import Class from "../models/classModel.js";

// Create class
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

// Update class
export const updateClass = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: { error: err.message } });
  }
};

// Delete class

export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: { error: err.message } });
  }
};
