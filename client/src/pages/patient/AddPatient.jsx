import React, { useState } from "react";
import { useAddPatientForDoctorMutation } from "../../redux/api/doctorSlice";
import { useSelector } from "react-redux";

const AddPatient = () => {
  const { user } = useSelector((state) => state.auth);

  const [patient, setPatient] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    contact: "",
    emergencyContact: {
      name: "",
      relationship: "",
      contact: "",
    },
    ssn: "",
    insurance: {
      provider: "",
      policyNumber: "",
    },
    medicalHistory: {
      allergies: [],
      chronicConditions: [],
      surgeries: [],
    },
    medications: [
      {
        name: "sdsg",
        dosage: "sdfsd",
        frequency: "sdfsd",
      },
    ],
    vaccinations: [
      {
        name: "sdfds",
        date: "acsd",
      },
    ],
    primaryCarePhysician: {
      name: "dssgs",
      contact: "sdvss ad",
    },
    prescriptions: [{ name: "dsfdsf", dosage: "dfsd", instructions: "dfsd" }],
    billing: {
      invoices: [
        {
          invoiceNumber: "dgvsdg",
          amount: 123,
          status: "paid",
        },
      ],
      insuranceClaims: [
        {
          claimNumber: "sgcddsg",
          amount: 123,
          status: "paid",
        },
      ],
    },
  });

  const [addPatient] = useAddPatientForDoctorMutation();
  const handleFormSubmit1 = async (e) => {
    e.preventDefault();
    console.log(patient);
    try {
      const newPatient = { ...patient };
      await addPatient({ doctorID: user._id, patient: newPatient }).unwrap();
      alert("Patient added successfully");
    } catch (err) {
      console.error("Failed to add patient:", err);
      alert("Failed to add patient");
    }
  };

  const addItemToMedicalHistory = (key, item) => {
    setPatient((prevState) => ({
      ...prevState,
      medicalHistory: {
        ...prevState.medicalHistory,
        [key]: [...prevState.medicalHistory[key], item],
      },
    }));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit1}>
        <input
          type="text"
          placeholder="Name"
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={patient.dateOfBirth}
          onChange={(e) =>
            setPatient({ ...patient, dateOfBirth: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Gender"
          value={patient.gender}
          onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact"
          value={patient.contact}
          onChange={(e) => setPatient({ ...patient, contact: e.target.value })}
        />
      </form>
      <form onSubmit={handleFormSubmit1}>
        <input
          type="text"
          placeholder="Emergency Contact Name"
          value={patient.emergencyContact.name}
          onChange={(e) =>
            setPatient({
              ...patient,
              emergencyContact: {
                ...patient.emergencyContact,
                name: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Relationship"
          value={patient.emergencyContact.relationship}
          onChange={(e) =>
            setPatient({
              ...patient,
              emergencyContact: {
                ...patient.emergencyContact,
                relationship: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Contact"
          value={patient.emergencyContact.contact}
          onChange={(e) =>
            setPatient({
              ...patient,
              emergencyContact: {
                ...patient.emergencyContact,
                contact: e.target.value,
              },
            })
          }
        />
      </form>
      <form onSubmit={handleFormSubmit1}>
        <input
          type="text"
          placeholder="SSN"
          value={patient.ssn}
          onChange={(e) => setPatient({ ...patient, ssn: e.target.value })}
        />
        <input
          type="text"
          placeholder="Insurance Provider"
          value={patient.insurance.provider}
          onChange={(e) =>
            setPatient({
              ...patient,
              insurance: {
                ...patient.insurance,
                provider: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Policy Number"
          value={patient.insurance.policyNumber}
          onChange={(e) =>
            setPatient({
              ...patient,
              insurance: {
                ...patient.insurance,
                policyNumber: e.target.value,
              },
            })
          }
        />
      </form>
      <form onSubmit={handleFormSubmit1}>
        <AddItem
          items={patient.medicalHistory.allergies}
          setItems={(item) => addItemToMedicalHistory("allergies", item)}
          placeholder={"Allergies"}
        />

        <AddItem
          items={patient.medicalHistory.chronicConditions}
          setItems={(item) =>
            addItemToMedicalHistory("chronicConditions", item)
          }
          placeholder={"Chronic Conditions"}
        />

        <AddItem
          items={patient.medicalHistory.surgeries}
          setItems={(item) => addItemToMedicalHistory("surgeries", item)}
          placeholder={"Surgeries"}
        />
      </form>
      <form onSubmit={handleFormSubmit1}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const AddItem = ({ items, setItems, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setItems(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button type="submit" onClick={handleFormSubmit}>
        Add
      </button>
      <div>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default AddPatient;
