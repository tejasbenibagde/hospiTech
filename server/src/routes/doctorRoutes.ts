import { Router as useRouter } from "express";
import {
  registerDoctor,
  loginDoctor,
  getPatientDetailsForDoctor,
  addPatient,
  getPatientDetailsByID,
  deletePatient,
} from "@controller";
import {
  doctorRegisterValidationRules,
  doctorLoginValidationRules,
  validatePatient,
  validateID,
} from "@validation";
import { validate, verifyToken } from "@middleware";
const router = useRouter();

router.post(
  "/register",
  doctorRegisterValidationRules(),
  validate,
  registerDoctor
);
router.post("/login", doctorLoginValidationRules(), validate, loginDoctor);
router.get("/patients/:doctorID", verifyToken, getPatientDetailsForDoctor);
router.get(
  "/patients/:doctorID/:patientID",
  verifyToken,
  getPatientDetailsByID
);
router.post(
  "/patients/:doctorID",
  validatePatient(),
  validate,
  verifyToken,
  addPatient
);
router.delete(
  "/patients/:doctorID/:patientID",
  validateID(),
  validate,
  verifyToken,
  deletePatient
);

export default router;
