// redux/api/apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../constants";

const baseQuery = fetchBaseQuery({ baseUrl: apiUrl });

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Doctor"],
  endpoints: () => ({}),
});

export { apiSlice };
