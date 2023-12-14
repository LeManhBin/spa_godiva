import { HiChevronRight } from "react-icons/hi";
import PropTypes from 'prop-types';
 
export const Banner = ({label, from, to}) => {
  return (
    <div className="w-full h-[530px] relative -z-10">
        <img src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover"/>
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
    label: PropTypes.any,
    from: PropTypes.any,
    to: PropTypes.any,
}

