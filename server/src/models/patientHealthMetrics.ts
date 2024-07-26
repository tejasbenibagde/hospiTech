import { Schema, model } from "mongoose";

const BloodPressureSchema = new Schema({
  systolic: {
    type: Number,
    required: true,
  },
  diastolic: {
    type: Number,
    required: true,
  },
});

const HealthMetricSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    bloodPressure: BloodPressureSchema,
    weight: {
      type: Number,
      required: true,
    },
    bloodSugar: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PatientHealthMetricSchema = new Schema(
  {
    patientID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    healthmetrics: [HealthMetricSchema],
  },
  { timestamps: true }
);

export default model("PatientHealthMetrics", PatientHealthMetricSchema);
