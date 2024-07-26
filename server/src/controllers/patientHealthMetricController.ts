import { PatientHealthMetrics } from "@model";
import { Request, Response } from "express";

const addPatientHealthMetrics = async (req: Request, res: Response) => {
  const { patientID } = req.params;
  const healthMetricData = req.body;

  try {
    const patientHealthMetrics = await PatientHealthMetrics.findOne({
      patientID,
    });
    if (patientHealthMetrics) {
      patientHealthMetrics.healthmetrics.push(healthMetricData);
      await patientHealthMetrics.save();
    } else {
      await PatientHealthMetrics.create({
        patientID,
        healthmetrics: [healthMetricData],
      });
    }

    res.status(201).json({ message: "Health metric added successfully" });
  } catch (error) {
    console.error("Error creating health metric:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getPatientHealthMetrics = () => {};
export { addPatientHealthMetrics, getPatientHealthMetrics };
