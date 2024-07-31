/* 

⭕❗
Debugging State, Do not interfere with this file
Debugging State, Do not interfere with this file
Debugging State, Do not interfere with this file
Debugging State, Do not interfere with this file
Debugging State, Do not interfere with this file

*/

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddPatientForDoctorMutation } from '../../redux/api';

const AddPatient = () => {
    const { user } = useSelector((state) => state.auth);
    const [addPatient, { isLoading, error }] = useAddPatientForDoctorMutation();

    const [patient, setPatient] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        contact: '',
        emergencyContact: {
            name: '',
            relationship: '',
            contact: ''
        },
        ssn: '',
        insurance: {
            provider: '',
            policyNumber: ''
        },
        medicalHistory: {
            allergies: [],
            chronicConditions: [],
            surgeries: []
        },
        medications: [],
        vaccinations: [],
        primaryCarePhysician: {
            name: '',
            contact: ''
        },
        prescriptions: [],
        billing: {
            invoices: [],
            insuranceClaims: []
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value
        });
    };

    const handleNestedChange = (e, parent) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [parent]: {
                ...patient[parent],
                [name]: value
            }
        });
    };

    const handleArrayChange = (e, parent, arrayName) => {
        const { value } = e.target;
        let arrayValues;

        // Handling different cases for specific fields
        if (parent === 'medications' || parent === 'prescriptions') {
            arrayValues = value.split(',').map(item => {
                const [name, dosage, frequency] = item.split(':').map(part => part.trim());
                return { name, dosage, frequency };
            });
        } else if (parent === 'billing' && arrayName === 'invoices') {
            arrayValues = value.split(',').map(item => {
                const [invoiceNumber, amount, status] = item.split(':').map(part => part.trim());
                return { invoiceNumber, amount, status };
            });
        } else if (parent === 'billing' && arrayName === 'insuranceClaims') {
            arrayValues = value.split(',').map(item => {
                const [claimNumber, amount, status] = item.split(':').map(part => part.trim());
                return { claimNumber, amount, status };
            });
        } else {
            arrayValues = value.split(',').map(item => item.trim());
        }

        setPatient({
            ...patient,
            [parent]: {
                ...patient[parent],
                [arrayName]: arrayValues
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(patient);
        // try {
        //     const newPatient = { ...patient };
        //     await addPatient({ doctorID: user._id, patient: newPatient }).unwrap();
        //     alert('Patient added successfully');
        // } catch (err) {
        //     console.error('Failed to add patient:', err);
        //     alert('Failed to add patient');
        // }
    };

    return (
        <div>
            <h1>Add Patient</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={patient.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    value={patient.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                />
                <input
                    type="text"
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                />
                <input
                    type="text"
                    name="contact"
                    value={patient.contact}
                    onChange={handleChange}
                    placeholder="Contact"
                />
                <h2>Emergency Contact</h2>
                <input
                    type="text"
                    name="name"
                    value={patient.emergencyContact.name}
                    onChange={(e) => handleNestedChange(e, 'emergencyContact')}
                    placeholder="Emergency Contact Name"
                />
                <input
                    type="text"
                    name="relationship"
                    value={patient.emergencyContact.relationship}
                    onChange={(e) => handleNestedChange(e, 'emergencyContact')}
                    placeholder="Emergency Contact Relationship"
                />
                <input
                    type="text"
                    name="contact"
                    value={patient.emergencyContact.contact}
                    onChange={(e) => handleNestedChange(e, 'emergencyContact')}
                    placeholder="Emergency Contact Phone"
                />
                <input
                    type="text"
                    name="ssn"
                    value={patient.ssn}
                    onChange={handleChange}
                    placeholder="SSN"
                />
                <h2>Insurance</h2>
                <input
                    type="text"
                    name="provider"
                    value={patient.insurance.provider}
                    onChange={(e) => handleNestedChange(e, 'insurance')}
                    placeholder="Provider"
                />
                <input
                    type="text"
                    name="policyNumber"
                    value={patient.insurance.policyNumber}
                    onChange={(e) => handleNestedChange(e, 'insurance')}
                    placeholder="Policy Number"
                />
                <h2>Medical History</h2>
                <input
                    type="text"
                    name="allergies"
                    value={patient.medicalHistory.allergies.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'medicalHistory', 'allergies')}
                    placeholder="Allergies (comma-separated)"
                />
                <input
                    type="text"
                    name="chronicConditions"
                    value={patient.medicalHistory.chronicConditions.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'medicalHistory', 'chronicConditions')}
                    placeholder="Chronic Conditions (comma-separated)"
                />
                <input
                    type="text"
                    name="surgeries"
                    value={patient.medicalHistory.surgeries.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'medicalHistory', 'surgeries')}
                    placeholder="Surgeries (comma-separated)"
                />
                <h2>Medications</h2>
                <input
                    type="text"
                    name="medications"
                    value={patient.medications.map(med => `${med.name}:${med.dosage}:${med.frequency}`).join(', ')}
                    onChange={(e) => handleArrayChange(e, 'medications')}
                    placeholder="Medications (format: name:dosage:frequency, comma-separated)"
                />
                <h2>Vaccinations</h2>
                <input
                    type="text"
                    name="vaccinations"
                    value={patient.vaccinations.map(vacc => `${vacc.name}:${vacc.date}`).join(', ')}
                    onChange={(e) => handleArrayChange(e, 'vaccinations')}
                    placeholder="Vaccinations (format: name:date, comma-separated)"
                />
                <h2>Primary Care Physician</h2>
                <input
                    type="text"
                    name="name"
                    value={patient.primaryCarePhysician.name}
                    onChange={(e) => handleNestedChange(e, 'primaryCarePhysician')}
                    placeholder="Primary Care Physician Name"
                />
                <input
                    type="text"
                    name="contact"
                    value={patient.primaryCarePhysician.contact}
                    onChange={(e) => handleNestedChange(e, 'primaryCarePhysician')}
                    placeholder="Primary Care Physician Contact"
                />
                <h2>Prescriptions</h2>
                <input
                    type="text"
                    name="prescriptions"
                    value={patient.prescriptions.map(pres => `${pres.name}:${pres.dosage}:${pres.instructions}`).join(', ')}
                    onChange={(e) => handleArrayChange(e, 'prescriptions')}
                    placeholder="Prescriptions (format: name:dosage:instructions, comma-separated)"
                />
                <h2>Billing</h2>
                <h3>Invoices</h3>
                <input
                    type="text"
                    name="invoices"
                    value={patient.billing.invoices.map(inv => `${inv.invoiceNumber}:${inv.amount}:${inv.status}`).join(', ')}
                    onChange={(e) => handleArrayChange(e, 'billing', 'invoices')}
                    placeholder="Invoices (format: invoiceNumber:amount:status, comma-separated)"
                />
                <h3>Insurance Claims</h3>
                <input
                    type="text"
                    name="insuranceClaims"
                    value={patient.billing.insuranceClaims.map(claim => `${claim.claimNumber}:${claim.amount}:${claim.status}`).join(', ')}
                    onChange={(e) => handleArrayChange(e, 'billing', 'insuranceClaims')}
                    placeholder="Insurance Claims (format: claimNumber:amount:status, comma-separated)"
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Patient'}
                </button>
            </form>
            {error && <div>Error: {error.message}</div>}
        </div>
    );
};

export default AddPatient;
