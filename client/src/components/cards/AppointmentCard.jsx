import CircleButton from "../CircleButton";
import { GoArrowUpRight, GoPencil, GoTrash } from "react-icons/go";

function AppointmentCard({ appointment }) {
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
        <CircleButton icon={GoTrash}></CircleButton>
        <CircleButton icon={GoPencil}></CircleButton>
        <CircleButton icon={GoArrowUpRight}></CircleButton>
      </div>
    </div>
  );
}

export default AppointmentCard;
