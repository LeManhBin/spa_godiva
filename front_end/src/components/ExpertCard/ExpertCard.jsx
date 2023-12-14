import { IMAGE_URL } from "../../constants/url";
import "./expertCard.css"
import PropTypes from 'prop-types';

export const ExpertCard = ({name, position, avatar}) => {
  return (
    <div className="expert-card h-[356px] relative overflow-hidden">
        <div className="overlay">
            <div className="flex flex-col h-full w-full items-center justify-center text-white">
                <h2 className="cormorant-font text-2xl font-semibold">{name}</h2>
                <p className="font-light">{position}</p>
            </div>
        </div>
        <img src={`${IMAGE_URL}/${avatar}`}  alt="" className="w-full h-full object-cover"/>
    </div>
  )
}

ExpertCard.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  avatar: PropTypes.string,
}
