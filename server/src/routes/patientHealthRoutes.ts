import { getPatientHealthMetrics, addPatientHealthMetrics } from "@controller";
import { Router as useRouter } from "express";
import { validate, verifyToken } from "@middleware";
import { validateMetrics, validatePatientID } from "@validation";

const router = useRouter();

router.post(
  "/:patientID",
  verifyToken,
  validateMetrics(),
  validate,
  addPatientHealthMetrics
);

router.get(
  "/:patientID",
  verifyToken,
  validatePatientID(),
  validate,
  getPatientHealthMetrics
);

export default router;
