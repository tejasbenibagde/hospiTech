import React, { useState } from "react";
import { useAddPatientForDoctorMutation } from "../../redux/api/doctorSlice";
import { useSelector } from "react-redux";
import { Input } from "@chakra-ui/react";
import { Form } from "../../components";
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
    medications: [],
    vaccinations: [],
    primaryCarePhysician: {
      name: "",
      contact: "",
    },
    prescriptions: [],
    billing: {
      invoices: [],
      insuranceClaims: [],
    },
  });

  const [addPatient] = useAddPatientForDoctorMutation();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(patient);
    // try {
    //   const newPatient = { ...patient };
    //   await addPatient({ doctorID: user._id, patient: newPatient }).unwrap();
    //   alert("Patient added successfully");
    // } catch (err) {
    //   console.error("Failed to add patient:", err);
    //   alert("Failed to add patient");
    // }
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

  const addMedication = (medication) => {
    setPatient((prevState) => ({
      ...prevState,
      medications: [...prevState.medications, medication],
    }));
  };

  const addVaccination = (vaccination) => {
    setPatient((prevState) => ({
      ...prevState,
      vaccinations: [...prevState.vaccinations, vaccination],
    }));
  };

  const addPrescription = (prescription) => {
    setPatient((prevState) => ({
      ...prevState,
      prescriptions: [...prevState.prescriptions, prescription],
    }));
  };

  const addInvoice = (invoice) => {
    setPatient((prevState) => ({
      ...prevState,
      billing: {
        ...prevState.billing,
        invoices: [...prevState.billing.invoices, invoice],
      },
    }));
  };

  const addInsuranceClaim = (claim) => {
    setPatient((prevState) => ({
      ...prevState,
      billing: {
        ...prevState.billing,
        insuranceClaims: [...prevState.billing.insuranceClaims, claim],
      },
    }));
  };

  const registrationForm = [
    {
      type: "text",
      label: "Enter your name",
      placeholder: "e.g. John Smith",
      value: patient.name,
      onChange: (e) => setPatient({ ...patient, name: e.target.value }),
      isInvalid: !patient.name,
      required: true,
    },
    {
      type: "date",
      label: "Enter your Date Of Birth",
      value: patient.dateOfBirth,
      onChange: (e) => setPatient({ ...patient, dateOfBirth: e.target.value }),
      isInvalid:
        !patient.dateOfBirth || new Date(patient.dateOfBirth) > new Date(),
      required: true,
    },
    {
      type: "number",
      label: "Enter your Contact Number",
      placeholder: "Enter your contact number",
      value: patient.contact,
      onChange: (e) => setPatient({ ...patient, contact: e.target.value }),
      isInvalid: !patient.contact,
      required: true,
    },
    {
      type: "select",
      label: "Select Your Gender",
      value: patient.gender,
      onChange: (e) => setPatient({ ...patient, gender: e.target.value }),
      isInvalid: !patient.gender,
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  const emergencyContactForm = [
    {
      type: "text",
      label: "Name",
      placeholder: "e.g. Jane Doe",
      value: patient.emergencyContact.name,
      onChange: (e) =>
        setPatient({
          ...patient,
          emergencyContact: {
            ...patient.emergencyContact,
            name: e.target.value,
          },
        }),
      isInvalid: !patient.emergencyContact.name,
      required: true,
    },
    {
      type: "text",
      label: "RelationShip",
      placeholder: "e.g. Wife",
      value: patient.emergencyContact.relationship,
      onChange: (e) =>
        setPatient({
          ...patient,
          emergencyContact: {
            ...patient.emergencyContact,
            relationship: e.target.value,
          },
        }),
      isInvalid: !patient.emergencyContact.relationship,
      required: true,
    },
    {
      type: "number",
      label: "Contact Number",
      placeholder: "e.g. 123-456-7890",
      value: patient.emergencyContact.contact,
      onChange: (e) =>
        setPatient({
          ...patient,
          emergencyContact: {
            ...patient.emergencyContact,
            contact: e.target.value,
          },
        }),
      isInvalid: !patient.emergencyContact.contact,
      required: true,
    },
  ];

  const insuranceInformation = [
    {
      type: "text",
      label: "SSN",
      placeholder: "e.g. 123-45-6789",
      value: patient.ssn,
      onChange: (e) => setPatient({ ...patient, ssn: e.target.value }),
      isInvalid: !patient.ssn,
      required: true,
    },
    {
      type: "text",
      label: "Insurance Provider",
      placeholder: "e.g. Aetna",
      value: patient.insurance.provider,
      onChange: (e) =>
        setPatient({
          ...patient,
          insurance: {
            ...patient.insurance,
            provider: e.target.value,
          },
        }),
      isInvalid: !patient.insurance.provider,
      required: true,
    },
    {
      type: "text",
      label: "Policy Number",
      placeholder: "e.g. 123456789",
      value: patient.insurance.policyNumber,
      onChange: (e) =>
        setPatient({
          ...patient,
          insurance: {
            ...patient.insurance,
            policyNumber: e.target.value,
          },
        }),
      isInvalid: !patient.insurance.policyNumber,
      required: true,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <Form
        action={handleFormSubmit}
        inputs={registrationForm}
        title={"Patient Registration"}
      />
      <Form
        action={handleFormSubmit}
        inputs={emergencyContactForm}
        title={"Emergency Contact"}
      />
      <Form
        action={handleFormSubmit}
        inputs={insuranceInformation}
        title={"Insurance Information"}
      />
      <form onSubmit={handleFormSubmit}>
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
      <form onSubmit={handleFormSubmit}>
        <AddMedications addMedication={addMedication} />
      </form>
      <form onSubmit={handleFormSubmit}>
        <AddVaccinations addVaccination={addVaccination} />
      </form>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={patient.primaryCarePhysician.name}
          onChange={(e) =>
            setPatient({
              ...patient,
              primaryCarePhysician: {
                ...patient.primaryCarePhysician,
                name: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Contact"
          value={patient.primaryCarePhysician.contact}
          onChange={(e) =>
            setPatient({
              ...patient,
              primaryCarePhysician: {
                ...patient.primaryCarePhysician,
                contact: e.target.value,
              },
            })
          }
        />
      </form>
      <form onSubmit={handleFormSubmit}>
        <AddPrescriptions addPrescription={addPrescription} />
      </form>
      <form onSubmit={handleFormSubmit}>
        <AddInvoices addInvoice={addInvoice} />
      </form>
      <form onSubmit={handleFormSubmit}>
        <AddInsuranceClaims addInsuranceClaim={addInsuranceClaim} />
      </form>
      <form onSubmit={handleFormSubmit}>
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

const AddMedications = ({ addMedication }) => {
  const [medication, setMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication((prevMedication) => ({
      ...prevMedication,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (medication.name && medication.dosage && medication.frequency) {
      addMedication(medication);
      setMedication({
        name: "",
        dosage: "",
        frequency: "",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={medication.name}
        onChange={handleInputChange}
        placeholder="Medication Name"
      />
      <input
        type="text"
        name="dosage"
        value={medication.dosage}
        onChange={handleInputChange}
        placeholder="Dosage"
      />
      <input
        type="text"
        name="frequency"
        value={medication.frequency}
        onChange={handleInputChange}
        placeholder="Frequency"
      />
      <button type="submit" onClick={handleFormSubmit}>
        Add Medication
      </button>
    </div>
  );
};

const AddVaccinations = ({ addVaccination }) => {
  const [vaccination, setVaccination] = useState({
    name: "",
    date: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVaccination((prevVaccination) => ({
      ...prevVaccination,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (vaccination.name && vaccination.date) {
      addVaccination(vaccination);
      setVaccination({
        name: "",
        date: "",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={vaccination.name}
        onChange={handleInputChange}
        placeholder="Vaccination Name"
      />
      <input
        type="date"
        name="date"
        value={vaccination.date}
        onChange={handleInputChange}
        placeholder="Date"
      />
      <button type="submit" onClick={handleFormSubmit}>
        Add Vaccination
      </button>
    </div>
  );
};

const AddPrescriptions = ({ addPrescription }) => {
  const [prescription, setPrescription] = useState({
    name: "",
    dosage: "",
    instructions: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prevPrescription) => ({
      ...prevPrescription,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (prescription.name && prescription.dosage && prescription.instructions) {
      addPrescription(prescription);
      setPrescription({
        name: "",
        dosage: "",
        instructions: "",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={prescription.name}
        onChange={handleInputChange}
        placeholder="Medication Name"
      />
      <input
        type="text"
        name="dosage"
        value={prescription.dosage}
        onChange={handleInputChange}
        placeholder="Dosage"
      />
      <input
        type="text"
        name="instructions"
        value={prescription.instructions}
        onChange={handleInputChange}
        placeholder="Instructions"
      />
      <button type="submit" onClick={handleFormSubmit}>
        Add Prescription
      </button>
    </div>
  );
};

const AddInvoices = ({ addInvoice }) => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    amount: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (invoice.invoiceNumber && invoice.amount && invoice.status) {
      addInvoice(invoice);
      setInvoice({
        invoiceNumber: "",
        amount: "",
        status: "",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        name="invoiceNumber"
        value={invoice.invoiceNumber}
        onChange={handleInputChange}
        placeholder="Invoice Number"
      />
      <input
        type="number"
        name="amount"
        value={invoice.amount}
        onChange={handleInputChange}
        placeholder="Amount"
      />
      <input
        type="text"
        name="status"
        value={invoice.status}
        onChange={handleInputChange}
        placeholder="Status"
      />
      <button type="submit" onClick={handleFormSubmit}>
        Add Invoice
      </button>
    </div>
  );
};

const AddInsuranceClaims = ({ addInsuranceClaim }) => {
  const [claim, setClaim] = useState({
    claimNumber: "",
    amount: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaim((prevClaim) => ({
      ...prevClaim,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (claim.claimNumber && claim.amount && claim.status) {
      addInsuranceClaim(claim);
      setClaim({
        claimNumber: "",
        amount: "",
        status: "",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        name="claimNumber"
        value={claim.claimNumber}
        onChange={handleInputChange}
        placeholder="Claim Number"
      />
      <input
        type="number"
        name="amount"
        value={claim.amount}
        onChange={handleInputChange}
        placeholder="Amount"
      />
      <input
        type="text"
        name="status"
        value={claim.status}
        onChange={handleInputChange}
        placeholder="Status"
      />
      <button type="submit" onClick={handleFormSubmit}>
        Add Claim
      </button>
    </div>
  );
};

export default AddPatient;
