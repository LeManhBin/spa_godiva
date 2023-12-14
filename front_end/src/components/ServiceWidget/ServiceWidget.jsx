import PropTypes from 'prop-types';

export const ServiceWidget = ({label, content, thumbnail}) => {
  return (
    <div className="relative w-full">
        <img src={thumbnail} alt="image" className="opacity-10 max-sm:w-[50%] max-sm:mx-auto"/>
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-20 w-full px-11 max-sm:p-0">
            <h1 className="text-center text-2xl font-semibold tracking-widest cormorant-font">{label}</h1>
            <p className="text-center text-base font-light mt-2.5 text-gray-600 cormorant-font">{content}</p>
        </div>
    </div>
  )
}

ServiceWidget.propTypes = {
  label: PropTypes.string,
  thumbnail: PropTypes.string,
  content: PropTypes.string,
}
