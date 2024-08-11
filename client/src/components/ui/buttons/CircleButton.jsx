import PropTypes from "prop-types"; // Import PropTypes

const CircleButton = ({ icon: Icon }) => {
  return (
    <div className="trash bg-red-500 text-color-dark font-extrabold text-base w-10 h-10 rounded-full flex justify-center items-center">
      <Icon />
    </div>
  );
};

CircleButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

export default CircleButton;
