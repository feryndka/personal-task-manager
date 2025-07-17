export const getUser = () => {
  const userData = localStorage.getItem("user-data");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};
