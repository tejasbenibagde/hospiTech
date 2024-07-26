import { body, check } from "express-validator";

const validateAppointment = () => [
  check("doctorID").isMongoId().withMessage("Invalid Doctor ID"),
  body("patient")
    .isMongoId()
    .withMessage("Patient ID must be a valid Mongo ID"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in ISO8601 format"),

  body("purpose")
    .notEmpty()
    .withMessage("Purpose is required")
    .isLength({ min: 5 })
    .withMessage("Purpose must be at least 5 characters long"),
];
const validateUpdateAppointment = () => [
  check("doctorID").isMongoId().withMessage("Invalid Doctor ID"),
  check("appointmentID").isMongoId().withMessage("Invalid Appointment ID"),
  body("date")
    .isISO8601()
    .withMessage("Date must be in ISO 8601 format")
    .optional(),
  body("purpose").isString().withMessage("Purpose must be a string").optional(),
];

const validateAppointmentByID = () => [
  check("doctorID").isMongoId().withMessage("Invalid Doctor ID"),
  check("appointmentID").isMongoId().withMessage("Invalid Appointment ID"),
];

export {
  validateAppointment,
  validateUpdateAppointment,
  validateAppointmentByID,
};
