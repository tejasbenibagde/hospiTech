import { body, check } from "express-validator";

const doctorRegisterValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
};
const doctorLoginValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
};

const validatePatient = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name must be a string")
      .notEmpty()
      .withMessage("Name is required"),
    body("dateOfBirth")
      .isString()
      .withMessage("Date of Birth must be a string")
      .notEmpty()
      .withMessage("Date of Birth is required"),
    body("gender")
      .isString()
      .withMessage("Gender must be a string")
      .notEmpty()
      .withMessage("Gender is required"),
    body("contact")
      .isString()
      .withMessage("Contact must be a string")
      .notEmpty()
      .withMessage("Contact is required"),
    body("emergencyContact.name")
      .isString()
      .withMessage("Emergency contact name must be a string")
      .notEmpty()
      .withMessage("Emergency contact name is required"),
    body("emergencyContact.relationship")
      .isString()
      .withMessage("Emergency contact relationship must be a string")
      .notEmpty()
      .withMessage("Emergency contact relationship is required"),
    body("emergencyContact.contact")
      .isString()
      .withMessage("Emergency contact contact must be a string")
      .notEmpty()
      .withMessage("Emergency contact contact is required"),
    body("ssn")
      .isString()
      .withMessage("SSN must be a string")
      .notEmpty()
      .withMessage("SSN is required"),
    body("insurance.provider")
      .isString()
      .withMessage("Insurance provider must be a string")
      .notEmpty()
      .withMessage("Insurance provider is required"),
    body("insurance.policyNumber")
      .isString()
      .withMessage("Insurance policy number must be a string")
      .notEmpty()
      .withMessage("Insurance policy number is required"),
    body("medicalHistory.allergies")
      .isArray()
      .withMessage("Allergies must be an array")
      .notEmpty()
      .withMessage("Allergies are required"),
    body("medicalHistory.chronicConditions")
      .isArray()
      .withMessage("Chronic conditions must be an array")
      .notEmpty()
      .withMessage("Chronic conditions are required"),
    body("medicalHistory.surgeries")
      .isArray()
      .withMessage("Surgeries must be an array")
      .notEmpty()
      .withMessage("Surgeries are required"),
    body("medications")
      .isArray()
      .withMessage("Medications must be an array")
      .notEmpty()
      .withMessage("Medications are required"),
    body("medications.*.name")
      .isString()
      .withMessage("Medication name must be a string")
      .notEmpty()
      .withMessage("Medication name is required"),
    body("medications.*.dosage")
      .isString()
      .withMessage("Medication dosage must be a string")
      .notEmpty()
      .withMessage("Medication dosage is required"),
    body("medications.*.frequency")
      .isString()
      .withMessage("Medication frequency must be a string")
      .notEmpty()
      .withMessage("Medication frequency is required"),
    body("vaccinations")
      .isArray()
      .withMessage("Vaccinations must be an array")
      .notEmpty()
      .withMessage("Vaccinations are required"),
    body("vaccinations.*.name")
      .isString()
      .withMessage("Vaccination name must be a string")
      .notEmpty()
      .withMessage("Vaccination name is required"),
    body("vaccinations.*.date")
      .isString()
      .withMessage("Vaccination date must be a string")
      .notEmpty()
      .withMessage("Vaccination date is required"),
    body("primaryCarePhysician.name")
      .isString()
      .withMessage("Primary care physician name must be a string")
      .notEmpty()
      .withMessage("Primary care physician name is required"),
    body("primaryCarePhysician.contact")
      .isString()
      .withMessage("Primary care physician contact must be a string")
      .notEmpty()
      .withMessage("Primary care physician contact is required"),
    body("prescriptions")
      .isArray()
      .withMessage("Prescriptions must be an array")
      .notEmpty()
      .withMessage("Prescriptions are required"),
    body("prescriptions.*.name")
      .isString()
      .withMessage("Prescription name must be a string")
      .notEmpty()
      .withMessage("Prescription name is required"),
    body("prescriptions.*.dosage")
      .isString()
      .withMessage("Prescription dosage must be a string")
      .notEmpty()
      .withMessage("Prescription dosage is required"),
    body("prescriptions.*.instructions")
      .isString()
      .withMessage("Prescription instructions must be a string")
      .notEmpty()
      .withMessage("Prescription instructions are required"),
    body("billing.invoices")
      .isArray()
      .withMessage("Invoices must be an array")
      .notEmpty()
      .withMessage("Invoices are required"),
    body("billing.invoices.*.invoiceNumber")
      .isString()
      .withMessage("Invoice number must be a string")
      .notEmpty()
      .withMessage("Invoice number is required"),
    body("billing.invoices.*.amount")
      .isNumeric()
      .withMessage("Invoice amount must be a number")
      .notEmpty()
      .withMessage("Invoice amount is required"),
    body("billing.invoices.*.status")
      .isString()
      .withMessage("Invoice status must be a string")
      .notEmpty()
      .withMessage("Invoice status is required"),
    body("billing.insuranceClaims")
      .isArray()
      .withMessage("Insurance claims must be an array")
      .notEmpty()
      .withMessage("Insurance claims are required"),
    body("billing.insuranceClaims.*.claimNumber")
      .isString()
      .withMessage("Claim number must be a string")
      .notEmpty()
      .withMessage("Claim number is required"),
    body("billing.insuranceClaims.*.amount")
      .isNumeric()
      .withMessage("Claim amount must be a number")
      .notEmpty()
      .withMessage("Claim amount is required"),
    body("billing.insuranceClaims.*.status")
      .isString()
      .withMessage("Claim status must be a string")
      .notEmpty()
      .withMessage("Claim status is required"),
  ];
};

const validateID = () => {
  return [
    check("doctorID").isMongoId().withMessage("Invalid Doctor ID"),
    check("patientID").isMongoId().withMessage("Invalid Patient ID"),
  ];
};

export {
  doctorRegisterValidationRules,
  doctorLoginValidationRules,
  validatePatient,
  validateID
};
