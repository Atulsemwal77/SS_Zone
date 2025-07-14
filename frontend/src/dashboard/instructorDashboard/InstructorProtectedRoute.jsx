import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const InstructorProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/instructor/login" state={{ from: location }} replace />;
  }

  const decoded = jwtDecode(token);

  if (decoded.role !== "INSTRUCTOR") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default InstructorProtectedRoute;
