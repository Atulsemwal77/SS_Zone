import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const decoded = jwtDecode(token);

  if (decoded.role !== "ADMIN") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AdminProtectedRoute;
