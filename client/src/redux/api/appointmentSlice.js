import { apiUrl } from "../../constants";
import { apiSlice } from "./apiSlice";

const baseURL = `${apiUrl}/api/appointments`;

export const appointmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAppointment: builder.mutation({
      query: ({ doctorID, data }) => ({
        url: `${baseURL}/${doctorID}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllAppointments: builder.query({
      query: (doctorID) => ({
        url: `${baseURL}/${doctorID}`,
      }),
    }),
  }),
});

export const { useAddAppointmentMutation, useGetAllAppointmentsQuery } =
  appointmentSlice;
