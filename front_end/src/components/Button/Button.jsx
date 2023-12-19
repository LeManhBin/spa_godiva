import PropTypes from 'prop-types';

export const Button = ({className="", label, mode = "dark", onCallBack, type}) => {
  return (
    <button type={type} onClick={onCallBack} className={`px-10 py-[15px] duration-300 ease-in-out border ${mode == 'dark' ? 'bg-mainColor text-white hover:bg-white hover:text-mainColor' : 'bg-white text-mainColor hover:bg-mainColor hover:text-white'} italic cormorant-font ${className}`}>{label}</button>
  )
}

Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    mode: PropTypes.string,
    onCallBack: PropTypes.any,
    type: PropTypes.string
}
