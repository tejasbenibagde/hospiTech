import { ObjectId, Schema, model } from "mongoose";

export interface IPatient extends Document {
  _id: ObjectId | string;
  name: string;
  dateOfBirth: string;
  gender: string;
  contact: string;
  emergencyContact: {
    name: string;
    relationship: string;
    contact: string;
  };
  ssn: string;
  insurance: {
    provider: string;
    policyNumber: string;
  };
  medicalHistory: {
    allergies: string[];
    chronicConditions: string[];
    surgeries: string[];
  };
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  vaccinations: {
    name: string;
    date: string;
  }[];
  primaryCarePhysician: {
    name: string;
    contact: string;
  };
  prescriptions: {
    name: string;
    dosage: string;
    instructions: string;
  }[];
  billing: {
    invoices: {
      invoiceNumber: string;
      amount: number;
      status: string;
    }[];
    insuranceClaims: {
      claimNumber: string;
      amount: number;
      status: string;
    }[];
  };
}

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

const patientSchema = new Schema<IPatient>(
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

export default model<IPatient>("Patient", patientSchema);
