import CircleButton from "../CircleButton";
import { GoArrowUpRight } from "react-icons/go";

function PHistoryCard() {
  const appointments = [
    {
      Name: "Rajshree Girpunje",
      Gender: "F",
      Contact: "8754826863",
      DOB: "10-01-2001",
      id: "2424574",
    },
    {
      Name: "Jagat Lilavat",
      Gender: "M",
      Contact: "6554826863",
      DOB: "09-12-2003",
      id: "6824578",
    },
    {
      Name: "Ritik Sure",
      Gender: "M",
      Contact: "9954826863",
      DOB: "12-09-1996",
      id: "3473524",
    },
    {
      Name: "Prem Jadhav",
      Gender: "M",
      Contact: "6453626863",
      DOB: "08-01-2009",
      id: "4978452",
    },
  ];

  return (
    <div className="w-full flex flex-wrap gap-5">
      {appointments.map((appointment) => (
        <div key={appointment.id} style={{ width: "calc(100%)" }}>
          <div className="appointment-card bg-card-bg rounded-2xl flex flex-col justify-between gap-3 bg-opacity-35 backdrop-blur-sm">
            <div className="appointment flex flex-row justify-between items-center  text pt-4 pl-4 pr-4">
              <div className="patient-name text-xl font-semibold flex flex-row gap-2 items-center ">
                {appointment.Name}

                <div className="status bg-red-500 rounded-md h-5 w-5  flex text-color-dark text-sm justify-center items-center">
                  {appointment.Gender}
                </div>
              </div>
              <div className="patient-id text-red-500 font-semibold text-sm">
                id: {appointment.id}
              </div>
            </div>
            <div className="info-arrow flex flex-row justify-between pb-3">
              <div className="patient-info text pl-4 pr-4 text-sm text-left leading-4 ">
                <p className="contact">Contact: {appointment.Contact}</p>
                <p className="time">Time: {appointment.DOB}</p>
              </div>
              <div className="card-btns flex justify-end pr-3">
                <CircleButton icon={GoArrowUpRight}></CircleButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PHistoryCard;
