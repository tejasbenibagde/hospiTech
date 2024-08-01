import { apiUrl } from "../../constants";
import { apiSlice } from "./apiSlice";

const baseURL = `${apiUrl}/api/doctors`;

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${baseURL}/register`,
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${baseURL}/login`,
        body: data,
      }),
    }),
    getPatientsByDoctor: builder.query({
      query: (doctorID) => ({
        url: `${baseURL}/patients/${doctorID}`,
      }),
    }),
    addPatientForDoctor: builder.mutation({
      query: ({ doctorID, patient }) => ({
        url: `${baseURL}/patients/${doctorID}`,
        method: "POST",
        body: patient,
      }),
    }),
    getPatientByID: builder.query({
      query: ({ doctorID, patientID }) => ({
        url: `${baseURL}/patients/${doctorID}/${patientID}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetPatientByIDQuery,
  useGetPatientsByDoctorQuery,
  useAddPatientForDoctorMutation,
} = doctorApiSlice;
