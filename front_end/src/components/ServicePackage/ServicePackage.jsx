import { useContext } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { WebContext } from "../../contexts/AppContext";
import { convertMoneyToVND } from "../../constants/convertMoney";
import PropTypes from 'prop-types';

export const ServicePackage = ({packageData}) => {
  const [, dispatch] = useContext(WebContext)

  const handleOpenModel = () => {
      dispatch({type: "OPEN_MODEL"})
  }
  return (
    <div className="py-[60px] px-[20px] min-h-[500px] flex flex-col items-center justify-between bg-white">
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-2xl cormorant-font tracking-wider text-center uppercase">{packageData?.name}</h2>
          <h1 className="text-2xl tracking-wider font-medium cormorant-font whitespace-nowrap">{convertMoneyToVND(packageData?.price)} <span className="text-base italic text-[#FFA732] font-light">/Liệu trình</span></h1>
          <ul className="flex flex-col gap-2.5 cormorant-font">
              {
                packageData?.description?.map((desc) => {
                  return(
                    <li key={desc} className="font-light italic flex items-start gap-2"> <HiOutlineCheck size={20} className="text-[#FFA732]"/> {desc}</li>
                  )
                })
              }
          </ul>
        </div>

        <button className="py-1 border-b italic font-thin cormorant-font" onClick={handleOpenModel}>Nhận tư vấn</button>
    </div>
  )
}

ServicePackage.propTypes = {
  packageData: PropTypes.any
}
