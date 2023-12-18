import { HiChevronRight } from "react-icons/hi";
import PropTypes from 'prop-types';
 
export const Banner = ({ banner,label, from, to}) => {
  return (
    <div className="w-full h-[530px] relative -z-10">
        <img src={banner} alt="banner" className="w-full h-full object-cover"/>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] text-white flex flex-col items-center">
            <h1 className="text-4xl text-center uppercase cormorant-font font-semibold">{label}</h1>
            <div className="flex items-center gap-5 cormorant-font italic font-medium">
                <p>{from}</p>
                <HiChevronRight size={20}/>
                <p>{to}</p>
            </div>
        </div>
    </div>
  )
}

Banner.propTypes = {
    banner: PropTypes.any,
    label: PropTypes.any,
    from: PropTypes.any,
    to: PropTypes.any,
}

