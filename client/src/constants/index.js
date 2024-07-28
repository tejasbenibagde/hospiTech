const apiUrl =
  import.meta.env.VITE_PRODUCTION === "false"
    ? import.meta.env.VITE_DEV_SERVER_URL
    : import.meta.env.VITE_PROD_SERVER_URL;

export { apiUrl };
