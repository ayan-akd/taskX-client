import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import CustomSpinner from "../shared/CustomSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  } else if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
