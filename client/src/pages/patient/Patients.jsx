import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useGetPatientsByDoctorQuery } from '../../redux/api/doctorSlice';

const Patients = () => {
  const { user } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useGetPatientsByDoctorQuery(user._id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.data.message || "Couldn't load the Patients"}</div>;

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <input
          type='text'
          placeholder='search patient by id or name here...'
          className='w-full py-2 px-5 rounded-full'
        />
      </div>
      <div className='w-fill flex items-center justify-between'>
        <div>
          <h1 className='text px-5 h-10 bg-card-bg rounded-full flex items-center justify-center'>
            Filter By: Latest
          </h1>
        </div>
        <div>
          <Link to={"/add-patient"} className='text w-10 h-10 bg-card-bg rounded-full flex items-center justify-center'>+</Link>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        {data?.map((patient) => (
          <div key={patient._id} className='bg-card-bg p-5 rounded-3xl'>
            <div className='flex w-full items-center justify-between'>
              <h2 className='text'>
                {patient.name} <span className='bg-primary p-[2px] rounded-lg'>{patient.gender === "Female" ? "F" : "M"}</span>
              </h2>
              <p className="text-primary font-[900]">{patient._id}</p>
            </div>
            <div className='flex w-full items-end justify-between'>
              <div>
                <h2 className='text'>Contact: {patient.contact}</h2>
                <p className="text">DOB: {patient.dateOfBirth}</p>
              </div>
              <div className='h-10 w-10 bg-primary rounded-full'>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
