import { Schema, model, CallbackError, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IPatient } from "./patient";
export interface IDoctor extends Document {
  username: string;
  email: string;
  password: string;
  patients: (Schema.Types.ObjectId | IPatient)[];
}

const doctorSchema = new Schema<IDoctor>(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  const doctor = this as IDoctor;

  if (doctor.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(doctor.password, 10);
      doctor.password = hashedPassword;
      next();
    } catch (err) {
      next(err as CallbackError);
    }
  } else {
    next();
  }
});

export default model<IDoctor>("Doctor", doctorSchema);
