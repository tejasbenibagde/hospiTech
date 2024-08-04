import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPatientByIDQuery } from "../../redux/api/doctorSlice";

const PatientDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const {
    data: patientDetails,
    error,
    isLoading,
  } = useGetPatientByIDQuery({
    doctorID: user._id,
    patientID: id,
  });

  if (isLoading) return <div>Loading patient details...</div>;
  if (error) return <div>Error loading patient details: {error.message}</div>;

  console.log(patientDetails);

  return (
    <div className="patient-detail">
      <div className="p-5">
        <Link to={`/add-appointments/${id}`} className="text bg-primary">
          Add Appointment
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">{patientDetails?.name}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p className="text-gray-700">Contact: {patientDetails?.contact}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <p className="text-gray-700">Gender: {patientDetails?.gender}</p>
        <p className="text-gray-700">
          Date of Birth: {patientDetails?.dateOfBirth}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Allergies</h2>
        <ul className="list-disc list-inside text-gray-700">
          {patientDetails?.medicalHistory?.allergies?.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Insurance Information</h2>
        <p className="text-gray-700">
          Insurance Provider: {patientDetails?.insurance.provider}
        </p>
        <p className="text-gray-700">
          Policy Number: {patientDetails?.insurance.policyNumber}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Emergency Contact</h2>
        <p className="text-gray-700">
          Name: {patientDetails?.emergencyContact.name}
        </p>
        <p className="text-gray-700">
          Relationship: {patientDetails?.emergencyContact.relationship}
        </p>
        <p className="text-gray-700">
          Phone: {patientDetails?.emergencyContact.contact}
        </p>
      </div>
    </div>
  );
};

export default PatientDetail;
