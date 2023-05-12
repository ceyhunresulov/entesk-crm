import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: { type: Array },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  teachers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

export const Class = mongoose.model("Class", classSchema);
