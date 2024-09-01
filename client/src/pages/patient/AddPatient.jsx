import React, { useState } from "react";
import { useAddPatientForDoctorMutation } from "../../redux/api/doctorSlice";
import { useSelector } from "react-redux";
import { Form } from "../../components";
import { Button } from "@chakra-ui/react";

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

  const registrationForm = [
    {
      name: "name",
      type: "text",
      label: "Enter patient's name",
      placeholder: "e.g. John Smith",
      value: patient.name,
      onChange: (e) => setPatient({ ...patient, name: e.target.value }),
      isInvalid: !patient.name,
      required: true,
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: "Enter patient's Date Of Birth",
      value: patient.dateOfBirth,
      onChange: (e) => setPatient({ ...patient, dateOfBirth: e.target.value }),
      isInvalid:
        !patient.dateOfBirth || new Date(patient.dateOfBirth) > new Date(),
      required: true,
    },
    {
      name: "contact",
      type: "number",
      label: "Enter patient's Contact Number",
      placeholder: "e.g. 123466789",
      value: patient.contact,
      onChange: (e) => setPatient({ ...patient, contact: e.target.value }),
      isInvalid: !patient.contact,
      required: true,
    },
    {
      type: "select",
      label: "Select patiet's Gender",
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

  const allergiesForm = [
    {
      type: "itemlist",
      label: "Allergies",
      placeholder: "e.g. peanuts",
      items: patient.medicalHistory.allergies,
      setItems: (item) => addItemToMedicalHistory("allergies", item),
      isInvalid: !patient.medicalHistory.allergies,
    },
    {
      type: "itemlist",
      label: "Chronic Conditions",
      placeholder: "e.g. fever",
      items: patient.medicalHistory.chronicConditions,
      setItems: (item) => addItemToMedicalHistory("chronicConditions", item),
      isInvalid: !patient.medicalHistory.chronicConditions,
    },
    {
      type: "itemlist",
      label: "Surgeries",
      placeholder: "e.g. fever",
      items: patient.medicalHistory.surgeries,
      setItems: (item) => addItemToMedicalHistory("surgeries", item),
      isInvalid: !patient.medicalHistory.surgeries,
    },
  ];
  const [medicationState, setMedicationState] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });
  const [prescriptionState, setPrescriptionState] = useState({
    name: "",
    dosage: "",
    instructions: "",
  });
  const [vaccination, setVaccination] = useState({
    name: "",
    date: "",
  });
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    amount: "",
    status: "",
  });
  const [claims, setClaims] = useState({
    claimNumber: "",
    amount: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicationState((prevMedication) => ({
      ...prevMedication,
      [name]: value,
    }));
  };
  const handleInputChangeForPrescription = (e) => {
    const { name, value } = e.target;
    setPrescriptionState((prevMedication) => ({
      ...prevMedication,
      [name]: value,
    }));
  };
  const handleInputChangeForInvoice = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };
  const handleInputChangeForClaims = (e) => {
    const { name, value } = e.target;
    setClaims((prevClaim) => ({
      ...prevClaim,
      [name]: value,
    }));
  };
  const handleInputChangeForVaccination = (e) => {
    const { name, value } = e.target;
    setVaccination((prevVaccination) => ({
      ...prevVaccination,
      [name]: value,
    }));
  };
  const handleAddMedication = (e) => {
    e.preventDefault();
    if (
      medicationState.name &&
      medicationState.dosage &&
      medicationState.frequency
    ) {
      console.log("Medication State:", medicationState);
      setPatient((prevState) => ({
        ...prevState,
        medications: Array.isArray(prevState.medications)
          ? [...prevState.medications, medicationState]
          : [medicationState],
      }));
      console.log(patient);
      setMedicationState({
        name: "",
        dosage: "",
        frequency: "",
      });
    }
  };
  const handleAddPrescription = (e) => {
    e.preventDefault();
    if (
      prescriptionState.name &&
      prescriptionState.dosage &&
      prescriptionState.frequency
    ) {
      console.log("Prescription State", prescriptionState);
      setPatient((prevState) => ({
        ...prevState,
        prescriptions: Array.isArray(prevState.prescriptions)
          ? [...prevState.prescriptions, prescriptionState]
          : [prescriptionState],
      }));
      console.log(patient);
      setPrescriptionState({
        name: "",
        dosage: "",
        instructions: "",
      });
    }
  };
  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (invoice.number && invoice.amount && invoice.status) {
      setPatient((prevState) => ({
        ...prevState,
        billing: {
          ...prevState.billing,
          invoices: Array.isArray(prevState.billing.invoices)
            ? [...prevState.billing.invoices, invoice]
            : [invoice],
        },
      }));
      console.log("Invoices", invoice);
      console.log(patient);
      setInvoice({
        invoiceNumber: "",
        amount: "",
        status: "",
      });
    }
  };
  const handleAddClaims = (e) => {
    e.preventDefault();
    if (claims.claimNumber && claims.amount && claims.status) {
      setPatient((prevState) => ({
        ...prevState,
        billing: {
          ...prevState.billing,
          insuranceClaims: Array.isArray(prevState.billing.insuranceClaims)
            ? [...prevState.billing.insuranceClaims, claims]
            : [claims],
        },
      }));
      console.log("Claims", claims);
      console.log(patient);
      setClaims({
        claimNumber: "",
        amount: "",
        status: "",
      });
    }
  };

  const handleAddVaccination = (e) => {
    e.preventDefault();
    if (vaccination.name && vaccination.date) {
      console.log("Vaccination State:", vaccination);
      setPatient((prevState) => ({
        ...prevState,
        vaccinations: Array.isArray(prevState.vaccinations)
          ? [...prevState.vaccinations, vaccination]
          : [vaccination],
      }));
      console.log(patient);
      setVaccination({
        name: "",
        date: "",
      });
    }
  };

  const medicationsForm = [
    {
      type: "multiItemList",
      form: [
        {
          name: "name",
          label: "Medication Name",
          type: "text",
          value: medicationState.name,
          placeholder: "e.g. Paracetamol",
          onChange: handleInputChange,
        },
        {
          name: "dosage",
          type: "text",
          label: "Medication Dosage",
          value: medicationState.dosage,
          placeholder: "e.g. 100mg",
          onChange: handleInputChange,
        },
        {
          name: "frequency",
          type: "text",
          label: "Medication Frequency",
          value: medicationState.frequency,
          placeholder: "e.g. Twice a day",
          onChange: handleInputChange,
        },
      ],
      add: handleAddMedication,
    },
  ];
  const vaccinationForm = [
    {
      type: "multiItemList",
      form: [
        {
          name: "name",
          type: "text",
          label: "enter the Vaccination name",
          value: vaccination.name,
          placeholder: "e.g. COVID-19",
          onChange: handleInputChangeForVaccination,
        },
        {
          type: "date",
          label: "Enter the Vaccination date",
          value: vaccination.date,
          onChange: (e) =>
            setVaccination({ ...vaccination, date: e.target.value }),
          isInvalid:
            !vaccination.date || new Date(vaccination.date) > new Date(),
          required: true,
        },
      ],
      add: handleAddVaccination,
    },
  ];
  const physicianForm = [
    {
      type: "text",
      label: "Name",
      placeholder: "e.g. Jane Doe",
      value: patient.primaryCarePhysician.name,
      onChange: (e) =>
        setPatient({
          ...patient,
          primaryCarePhysician: {
            ...patient.primaryCarePhysician,
            name: e.target.value,
          },
        }),
      isInvalid: !patient.primaryCarePhysician.name,
      required: true,
    },
    {
      type: "number",
      label: "Contact Details",
      placeholder: "e.g. +123 456",
      value: patient.primaryCarePhysician.contact,
      onChange: (e) =>
        setPatient({
          ...patient,
          primaryCarePhysician: {
            ...patient.primaryCarePhysician,
            contact: e.target.value,
          },
        }),
      isInvalid: !patient.primaryCarePhysician.contact,
      required: true,
    },
  ];

  const prescriptionsForm = [
    {
      type: "multiItemList",
      form: [
        {
          name: "name",
          type: "text",
          value: prescriptionState.name,
          label: "Medication Name",
          placeholder: "e.g. Ampicillin",
          onChange: handleInputChangeForPrescription,
        },
        {
          name: "dosage",
          type: "text",
          value: prescriptionState.dosage,
          label: "Dosage",
          placeholder: "e.g. twice a day",
          onChange: handleInputChangeForPrescription,
        },
        {
          name: "instructions",
          type: "text",
          value: prescriptionState.instructions,
          label: "instructions",
          placeholder: "e.g. eat after having a meal",
          onChange: handleInputChangeForPrescription,
        },
      ],
      add: handleAddPrescription,
    },
  ];

  const invoiceForm = [
    {
      type: "multiItemList",
      form: [
        {
          name: "invoiceNumber",
          type: "text",
          value: invoice.number,
          label: "Invoice Number",
          placeholder: "e.g. 123456789",
          onChange: handleInputChangeForInvoice,
        },
        {
          name: "amount",
          type: "number",
          value: invoice.amount,
          label: "Amount",
          placeholder: "e.g. 12000",
          onChange: handleInputChangeForInvoice,
        },
        {
          name: "status",
          type: "text",
          value: invoice.status,
          label: "Status",
          placeholder: "Pending",
          onChange: handleInputChangeForInvoice,
        },
      ],
      add: handleAddInvoice,
    },
  ];
  const insuranceClaimsForm = [
    {
      type: "multiItemList",
      form: [
        {
          name: "claimNumber",
          type: "number",
          value: claims.claimNumber,
          label: "Invoice Number",
          placeholder:"e.g. 123456789",
          onChange: handleInputChangeForClaims,
        },
        {
          name: "amount",
          type: "number",
          value: claims.amount,
          label: "Amount",
          placeholder:"e.g. 200000",
          onChange: handleInputChangeForClaims,
        },
        {
          name: "status",
          type: "text",
          value: claims.status,
          label: "Status",
          placeholder:"Pending",
          onChange: handleInputChangeForClaims,
        },
      ],
      add: handleAddClaims,
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
      <Form
        action={handleFormSubmit}
        inputs={allergiesForm}
        title={"Allergies"}
      />
      <Form inputs={medicationsForm} title={"Medications"} />
      <Form inputs={vaccinationForm} title={"Vaccinations"} />
      <Form inputs={physicianForm} title={"Primary Care Physician"} />
      <Form inputs={prescriptionsForm} title={"Prescriptions"} />
      <Form inputs={invoiceForm} title={"Invoice"} />
      <Form inputs={insuranceClaimsForm} title={"Insurance Claims"} />
      <form onSubmit={handleFormSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddPatient;
