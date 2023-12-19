import { Swiper } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PropTypes from 'prop-types';

export const Slide = ({children }) => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            }}
            className="mt-10"
        >
            {children}
        </Swiper>
    )
}

Slide.propTypes = {
    children: PropTypes.any,
}
