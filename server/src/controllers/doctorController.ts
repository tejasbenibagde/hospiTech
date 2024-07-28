import { Doctor, Patient, IPatient } from "@model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createToken } from "@util";

const registerDoctor = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor with this email is already registerd" });
    }

    const doctor = new Doctor(req.body);
    await doctor.save();
    return res.status(201).send({ message: "Doctor registered Successfully" });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginDoctor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found in process.env");
    }

    const patients = doctor.patients.map((patient) => String(patient));

    const token = createToken({
      _id: doctor._id,
      username: doctor.username,
      email: doctor.email,
      patients: patients,
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPatientDetailsForDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const patientsForDoctor = await Doctor.findById(doctorID).populate({
      path: "patients",
      options: { sort: { createdAt: -1 } },
    });

    if (!patientsForDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!patientsForDoctor.patients) {
      return res
        .status(404)
        .json({ message: "No patients found for this doctor" });
    }
    return res.status(200).json(patientsForDoctor.patients);
  } catch (error) {
    console.error("Error fetching doctor with patient details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addPatient = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const patientData = req.body;

    const newPatient = new Patient(patientData);
    await newPatient.save();

    const doctor = await Doctor.findByIdAndUpdate(
      doctorID,
      { $push: { patients: newPatient._id } },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res
      .status(201)
      .json({ message: "Patient added successfully", patient: newPatient });
  } catch (error) {
    console.error("Error adding patient to doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPatientDetailsByID = async (req: Request, res: Response) => {
  try {
    const { doctorID, patientID } = req.params;
    const doctor = await Doctor.findById(doctorID).populate("patients");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patients = doctor.patients as IPatient[];

    const patient = patients.find((p) => p._id.toString() === patientID);
    if (!patient) {
      return res
        .status(404)
        .json({ message: "Patient not found for this doctor" });
    }
    const patientDetails = await Patient.findById(patientID);
    if (!patientDetails) {
      return res.status(404).json({ message: "Patient details not found" });
    }
    return res.status(200).json(patientDetails);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePatient = async (req: Request, res: Response) => {
  try {
    const { doctorID, patientID } = req.params;

    const doctor = await Doctor.findById(doctorID);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patientIndex = doctor.patients.findIndex(
      (p) => p.toString() === patientID
    );

    if (patientIndex === -1) {
      return res
        .status(404)
        .json({ message: "Patient not found for this doctor" });
    }

    doctor.patients.splice(patientIndex, 1);
    await doctor.save();

    await Patient.findByIdAndDelete(patientID);

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  registerDoctor,
  loginDoctor,
  getPatientDetailsForDoctor,
  addPatient,
  getPatientDetailsByID,
  deletePatient,
};
