// reduc/api/doctorSlice.js

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
    getPatient: builder.query({
      query: ({ doctorID, patientID }) => ({
        url: `${baseURL}/patients/${doctorID}/${patientID}`,
      }),
    }),
  }),
});

export const { useGetPatientQuery, useLoginMutation, useRegisterMutation } =
  doctorApiSlice;
