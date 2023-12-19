
import { useNavigate } from 'react-router-dom';
import { convertDateFormat } from '../../constants/convertDate'
import { IMAGE_URL } from '../../constants/url'
import PropTypes from 'prop-types';

export const NewsCard = ({data}) => {
  const navigate = useNavigate()
  return (
    <div className='cursor-pointer max-w-xs' onClick={() => navigate(`/news/${data?._id}`)}>
        <div className='overflow-hidden h-80'>
            <img src={`${IMAGE_URL}/${data?.image}`} alt="avatar" className="duration-300 ease-in-out w-full h-full object-cover hover:scale-125 hover:rotate-12"/>
        </div>
        <div className='mt-2.5 flex flex-col gap-2'>
            <p className='text-[#F47F40] tracking-widest font-medium'>{convertDateFormat(data?.createdAt)}</p>
            <p className='cormorant-font line-clamp-2 text-xl'>{data?.title}</p>
            <p className='underline cormorant-font hover:text-[#F47F40]' >Đọc ngay</p>
        </div>
    </div>
  )
}

NewsCard.propTypes = {
  data: PropTypes.any
}