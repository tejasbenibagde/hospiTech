import { useSelector } from "react-redux";
import { AppointementCard } from "../../components";
import { useGetAllAppointmentsQuery } from "../../redux/api";

import { CircleButton } from "../../components";
import { GoArrowUpRight, GoPencil, GoTrash } from "react-icons/go";

const Appointments = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: appointmentsData,
    error: appointmentsError,
    isLoading: appointmentsLoading,
  } = useGetAllAppointmentsQuery(user._id);
  console.log(!appointmentsLoading && appointmentsData);

  return (
    <div className="w-full flex flex-wrap gap-5">
      {appointmentsData &&
        appointmentsData.map((appointment) => (
          <div key={appointment._id} className="w-full">
            <AppointementCard appointment={appointment} />
          </div>
        ))}
    </div>
  );
};

export default Appointments;
