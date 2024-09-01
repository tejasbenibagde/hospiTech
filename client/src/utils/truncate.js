const truncate = (id, length = 10) => {
  if (id.length > length) {
    return id.substring(0, length) + "...";
  }
  return id;
};
export { truncate };
