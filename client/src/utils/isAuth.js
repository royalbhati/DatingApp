import jwtDecode from "jwt-decode";

const isAuthenticated = () => {
  const expiresAt = jwtDecode(localStorage.getItem("jwtToken")).exp;
  return new Date().getTime() < expiresAt;
};

export default isAuthenticated;
