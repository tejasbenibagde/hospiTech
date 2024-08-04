import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddAppointmentMutation } from "../../redux/api"; // Adjust the import path as needed

const AddAppointment = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [addAppointment, { isLoading, error }] = useAddAppointmentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!purpose || !date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addAppointment({
        doctorID: user._id,
        data: { patient: id, date, purpose },
      }).unwrap();
      alert("Appointment scheduled successfully.");
      setPurpose("");
      setDate("");
    } catch (err) {
      console.error("Failed to schedule appointment: ", err);
    }
  };

  return (
    <div className="appointment-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Purpose
          </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Enter the purpose"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter the Date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? "Scheduling..." : "Schedule"}
        </button>
        {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddAppointment;
