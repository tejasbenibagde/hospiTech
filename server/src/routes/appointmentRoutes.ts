import { Router as useRouter } from "express";
import { verifyToken, validate } from "@middleware";
import {
  getAllAppointments,
  scheduleAppointment,
  updateAppointmentByID,
  getAppointmentByID,
  deleteAppointmentByID
} from "@controller";
import {
  validateAppointment,
  validateUpdateAppointment,
  validateAppointmentByID,
} from "@validation";

const router = useRouter();

router.post(
  "/:doctorID",
  validateAppointment(),
  validate,
  verifyToken,
  scheduleAppointment
);
router.get("/:doctorID", verifyToken, getAllAppointments);
router.put(
  "/:doctorID/:appointmentID",
  validateUpdateAppointment(),
  validate,
  verifyToken,
  updateAppointmentByID
);
router.get(
  "/:doctorID/:appointmentID",
  validateAppointmentByID(),
  validate,
  verifyToken,
  getAppointmentByID
);
router.delete(
  "/:doctorID/:appointmentID",
  validateAppointmentByID(),
  validate,
  verifyToken,
  deleteAppointmentByID
);
export default router;
