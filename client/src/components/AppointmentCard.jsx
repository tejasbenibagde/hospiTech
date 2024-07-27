
import CircleButton from "../components/CircleButton";
import { GoArrowUpRight, GoPencil, GoTrash } from "react-icons/go";

function AppointmentCard() {
  const appointments = [
    {
      Name: "Raj Shahu",
      status: "pending",
      Contact: "8754826863",
      Time: "12:40PM",
      Description: "Meeting with Doctor",
      id: "1",
    },
    {
      Name: "Harry Pande",
      status: "pending",
      Contact: "6554826863",
      Time: "02:00AM",
      Description: "Meeting with Doctor",
      id: "2",
    },
    {
      Name: "Ritik Hure",
      status: "complete",
      Contact: "9954826863",
      Time: "10:40AM",
      Description: "Medicine Checking",
      id: "3",
    },
    {
      Name: "Pratik Shende",
      status: "complete",
      Contact: "6453626863",
      Time: "01:40PM",
      Description: "Meeting with Doctor",
      id: "4",
    },
  ];

  return (
    <div className="w-full flex flex-wrap gap-5">
      {appointments.map((appointment) => (
        <div key={appointment.id} style={{ width: "calc(100%)" }}>
          <div className="appointment-card bg-card-bg rounded-2xl flex flex-col justify-between gap-2 bg-opacity-35 backdrop-blur-sm">
            <div className="appointment flex flex-row justify-between items-center  text-teal-50 pt-4 pl-4 pr-4">
              <div className="patient-name text-xl font-semibold">
                {appointment.Name}
              </div>
              <div className="status bg-red-500 rounded-lg h-6 p-1 flex items-center">
                {appointment.status}
              </div>
              <div className="patient-id text-red-500 font-semibold">
                id: {appointment.id}
              </div>
            </div>
            <div className="patient-info text-teal-50 pl-4 pr-4 text-sm leading-4">
              <p className="contact">Contact: {appointment.Contact}</p>
              <p className="time">Time: {appointment.Time}</p>
              <p className="description">
                Description: {appointment.Description}
              </p>
            </div>
            <div className="card-btns flex justify-end gap-4 p-3">
              <CircleButton icon={GoTrash}></CircleButton>
              <CircleButton icon={GoPencil}></CircleButton>
              <CircleButton icon={GoArrowUpRight}></CircleButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentCard;
