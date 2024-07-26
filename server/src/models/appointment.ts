import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    date: String,
    purpose: String,
  },
  { timestamps: true }
);

export default model("Appointment", appointmentSchema);
