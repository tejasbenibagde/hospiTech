import { Request, Response } from "express";
import { Appointment, Doctor } from "@model";

const scheduleAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    const { patient, date, purpose } = req.body;

    // Verify that the doctor exists
    const doctor = await Doctor.findById(doctorID);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      patient,
      doctor: doctorID,
      date,
      purpose,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment scheduled successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const { doctorID } = req.params;
    console.log("Doctor ID:", doctorID);

    const appointments = await Appointment.find({ doctor: doctorID })
      .populate({
        path: "patient",
        select: "name contact",
      })
      .exec();

    if (!appointments.length) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAppointmentByID = async (req: Request, res: Response) => {
  try {
    const { doctorID, appointmentID } = req.params;
    const { date, purpose } = req.body;

    // Find the appointment by ID and ensure it belongs to the specified doctor
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentID, doctor: doctorID }, // Query to find the appointment
      { date, purpose }, // Fields to update
      { new: true, runValidators: true } // Options
    ).exec();

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found or not associated with this doctor",
      });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAppointmentByID = async (req: Request, res: Response) => {
  try {
    const { doctorID, appointmentID } = req.params;

    const appointment = await Appointment.findOne({
      _id: appointmentID,
      doctor: doctorID,
    })
      .populate("patient", "name contact")
      .exec();

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found or not associated with this doctor",
      });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteAppointmentByID = async (req: Request, res: Response) => {
  try {
    const { doctorID, appointmentID } = req.params;

    // Find and delete the appointment if it belongs to the specified doctor
    const result = await Appointment.deleteOne({
      _id: appointmentID,
      doctor: doctorID,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({
          message: "Appointment not found or not associated with this doctor",
        });
    }

    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  getAllAppointments,
  scheduleAppointment,
  updateAppointmentByID,
  getAppointmentByID,
  deleteAppointmentByID,
};
