// reduc/api/doctorSlice.js

import { apiUrl } from "../../constants";
import { apiSlice } from "./apiSlice";

const baseURL = `${apiUrl}/api/doctors`;

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      method: "POST",
      url: `${baseURL}/register`,
      transformResponse: (response) => response.data,
    }),
    getPatient: builder.query({
      query: ({ doctorID, patientID }) => ({
        url: `${baseURL}/patients/${doctorID}/${patientID}`,
      }),
    }),
  }),
});

export const { useGetPatientQuery, useRegisterMutation } = doctorApiSlice;
