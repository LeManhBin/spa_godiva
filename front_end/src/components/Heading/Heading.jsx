import PropTypes from 'prop-types';

export const Heading = ({label, title, content, position = "center", className}) => {
  return (
    <div className={`flex flex-col items-${position} gap-8`}>
        <h5 className={`tracking-widest font-medium text-[#FFA732] ${className}`}>{label}</h5>
        <h1 className={`text-4xl font-bold text-center cormorant-font ${className}`}>{title}</h1>
        <p className={`font-thin text-${position} w-[70%]`}>{content}</p>
    </div>
  )
}

Heading.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string,
}
