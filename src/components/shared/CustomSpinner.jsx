import { PulseSpinner, PushSpinner } from "react-spinners-kit";
import PropTypes from "prop-types";

const CustomSpinner = ({ small }) => {
  return (
    <div className="max-w-screen-xl h-screen flex items-center justify-center mx-auto">
      {small ? (
        <PulseSpinner size={20} color="#F13650"></PulseSpinner>
      ) : (
        <PushSpinner size={200} color="#F13650" loading={true} />
      )}
    </div>
  );
};

CustomSpinner.propTypes = {
  small: PropTypes.bool,
};

export default CustomSpinner;
