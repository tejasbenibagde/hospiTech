import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import { connectToDatabase } from "@util";
import {
  patientHealthRoutes,
  doctorRoutes,
  patientRoutes,
  appointmentRoutes,
} from "@route";

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL =
  process.env.PRODUCTION === "false"
    ? process.env.CLIENT_URL
    : process.env.CLIENT_PRODUCTION_URL;

const MONGO_URI =
  process.env.PRODUCTION === "false"
    ? process.env.MONGO_URI
    : process.env.MONGO_PRODUCTION_URI;
connectToDatabase(MONGO_URI).catch(console.error);

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "PUT", "DELETE", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patient-health-metrics", patientHealthRoutes);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
