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
    deleteAppointmentByID: builder.mutation({
      query: ({ doctorID, appointmentID }) => ({
        url: `${baseURL}/${doctorID}/${appointmentID}`,
        method: "DELETE",
      }),
    }),
    updateAppointmentByID: builder.mutation({
      query: ({ doctorID, appointmentID, data }) => ({
        url: `${baseURL}/${doctorID}/${appointmentID}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddAppointmentMutation,
  useGetAllAppointmentsQuery,
  useDeleteAppointmentByIDMutation,
  useUpdateAppointmentByIDMutation,
} = appointmentSlice;
