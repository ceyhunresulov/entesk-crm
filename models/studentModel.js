import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
});

export default mongoose.model("Student", studentSchema);
