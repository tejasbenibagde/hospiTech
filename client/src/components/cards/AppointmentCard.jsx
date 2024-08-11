import CircleButton from "../ui/buttons/CircleButton";
import { GoArrowUpRight, GoPencil, GoTrash } from "react-icons/go";
import { useDeleteAppointmentByIDMutation } from "../../redux/api";
import { useSelector } from "react-redux";
function AppointmentCard({ appointment }) {
  const { user } = useSelector((state) => state.auth);

  const [deleteAppointment] = useDeleteAppointmentByIDMutation();
  const handleDelete = async (e, appointmentID) => {
    e.preventDefault();
    try {
      await deleteAppointment({ doctorID: user._id, appointmentID });
      alert("Appointment deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      alert("Failed to delete appointment");
    }
  };

  return (
    <div style={{ width: "100%" }} className="card">
      <div className="flex items-center justify-between">
        <h1 className="text text-xl font-semibold">
          {appointment.patient.name}
        </h1>
        <h1 className="text-primary">{appointment._id}</h1>
      </div>
      <div>
        <h1 className="text text-sm">Contact: {appointment.patient.contact}</h1>
        <h1 className="text text-sm">Time: {appointment.date}</h1>
        <h1 className="text text-sm">Purpose: {appointment.purpose}</h1>
      </div>
      <div className="card-btns flex justify-end gap-4 p-3">
        <div onClick={(e) => handleDelete(e, appointment._id)}>
          <CircleButton icon={GoTrash} />
        </div>
        <CircleButton icon={GoPencil}></CircleButton>
        <CircleButton icon={GoArrowUpRight}></CircleButton>
      </div>
    </div>
  );
}

export default AppointmentCard;
