import { body, check } from "express-validator";

const validateMetrics = () => {
  return [
    check("patientID").isMongoId().withMessage("Invalid Patient ID"),
    body("date")
      .notEmpty()
      .withMessage("Date is required")
      .isISO8601()
      .withMessage("Date must be a valid ISO 8601 date"),

    body("bloodPressure.systolic")
      .notEmpty()
      .withMessage("Systolic blood pressure is required")
      .isNumeric()
      .withMessage("Systolic blood pressure must be a number"),

    body("bloodPressure.diastolic")
      .notEmpty()
      .withMessage("Diastolic blood pressure is required")
      .isNumeric()
      .withMessage("Diastolic blood pressure must be a number"),

    body("weight")
      .notEmpty()
      .withMessage("Weight is required")
      .isNumeric()
      .withMessage("Weight must be a number"),

    body("bloodSugar")
      .notEmpty()
      .withMessage("Blood sugar is required")
      .isNumeric()
      .withMessage("Blood sugar must be a number"),
  ];
};

const validatePatientID = () => [
  check("patientID").isMongoId().withMessage("Invalid Patient ID"),
];

export { validateMetrics, validatePatientID };
