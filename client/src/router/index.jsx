import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Appointments,
  Home,
  PatientHistory,
  Patients,
  Notifications,
  Login,
  Register,
  AddPatient,
  PatientDetail,
  AddAppointement,
} from "../pages";
import App from "../App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/add-patient" element={<AddPatient />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/add-appointments/:id" element={<AddAppointement />} />
      <Route path="/patient-history" element={<PatientHistory />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/patient/:id" element={<PatientDetail />} />
    </Route>
  )
);

export default router;
