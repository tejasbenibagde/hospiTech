import { Schema, model } from "mongoose";

const emergencyContactSchema = new Schema({
  name: String,
  relationship: String,
  contact: String,
});

const insuranceSchema = new Schema({
  provider: String,
  policyNumber: String,
});

const medicalHistorySchema = new Schema({
  allergies: [String],
  chronicConditions: [String],
  surgeries: [String],
});

const medicationSchema = new Schema({
  name: String,
  dosage: String,
  frequency: String,
});

const vaccinationSchema = new Schema({
  name: String,
  date: String,
});

const primaryCarePhysicianSchema = new Schema({
  name: String,
  contact: String,
});

const prescriptionSchema = new Schema({
  name: String,
  dosage: String,
  instructions: String,
});

const invoiceSchema = new Schema({
  invoiceNumber: String,
  amount: Number,
  status: String,
});

const insuranceClaimSchema = new Schema({
  claimNumber: String,
  amount: Number,
  status: String,
});

const billingSchema = new Schema({
  invoices: [invoiceSchema],
  insuranceClaims: [insuranceClaimSchema],
});

const patientSchema = new Schema(
  {
    name: String,
    dateOfBirth: String,
    gender: String,
    contact: String,
    emergencyContact: emergencyContactSchema,
    ssn: String,
    insurance: insuranceSchema,
    medicalHistory: medicalHistorySchema,
    medications: [medicationSchema],
    vaccinations: [vaccinationSchema],
    primaryCarePhysician: primaryCarePhysicianSchema,
    prescriptions: [prescriptionSchema],
    billing: billingSchema,
  },
  { timestamps: true }
);

export default model("Patient", patientSchema);
