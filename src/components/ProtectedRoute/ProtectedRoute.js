import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isUserLoggedIn, children }) =>
  isUserLoggedIn ? children : <Navigate to="/" replace />;

ProtectedRoute.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  children: PropTypes.object,
};

export default ProtectedRoute;
