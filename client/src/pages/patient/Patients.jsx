import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPatientsByDoctorQuery,
  useGetPatientByIDQuery,
} from "../../redux/api/doctorSlice";
import { truncate, copyToClipboard } from "../../utils";

import { IoMdAdd } from "react-icons/io";
import { IoCopy } from "react-icons/io5";

const Patients = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: patientsData,
    error: patientsError,
    isLoading: patientsLoading,
  } = useGetPatientsByDoctorQuery(user._id);

  if (patientsLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <input
          type="text"
          placeholder="search patient by id or name here..."
          className="w-full py-2 px-5 rounded-full"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text px-5 h-10 bg-card-bg rounded-full flex items-center justify-center">
            Filter By: Latest
          </h1>
        </div>
        <div>
          <Link
            to={"/add-patient"}
            className="h-10 w-10 bg-primary flex items-center justify-center rounded-full"
          >
            <IoMdAdd size={20} color={"#F5E9DD"} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {patientsData?.map((patient) => (
          <div key={patient._id} className="bg-card-bg p-5 rounded-3xl">
            <div className="flex w-full items-center justify-between">
              <h2 className="text">
                {patient.name}{" "}
                <span className="bg-primary px-1 rounded-lg">
                  {patient.gender === "Female" ? "F" : "M"}
                </span>
              </h2>
              <div className="flex flex-row gap-1 items-center justify-center">
                <p className="text-primary font-[900]">
                  {truncate(patient._id)}
                </p>
                <button
                  onClick={() => copyToClipboard(patient._id)}
                  className="p-1 bg-[#00000024] rounded-full"
                >
                  <IoCopy color="red" />
                </button>
              </div>
            </div>
            <div className="flex w-full items-end justify-between">
              <div>
                <h2 className="text">Contact: {patient.contact}</h2>
                <p className="text">DOB: {patient.dateOfBirth}</p>
              </div>
              <Link
                to={`/patient/${patient._id}`}
                className="h-10 w-10 bg-primary rounded-full"
              ></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
