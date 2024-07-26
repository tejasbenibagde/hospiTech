import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { Appointments, Home, PatientHistory, Patients } from "../pages"
import App from "../App"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/patient-history" element={<PatientHistory />} />
    </Route>
  )
)

export default router