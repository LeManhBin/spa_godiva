import { HiOutlineBadgeCheck } from "react-icons/hi"
import { Banner, Heading, ServicePackage, ServiceWidget } from "../../components"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { REVIEW, SERVICE_WIDGET } from "../../constants/fakeData";
import { useQuery } from "@tanstack/react-query";
import { fetchGetAllService } from "../../api/service.api";
import { convertMoneyToVND } from "../../constants/convertMoney";
import { fetchGetAllPackage } from "../../api/package.api";
import useScrollToTop from "../../hooks/useScrollToTop";

export const ServicePage = () => {
  useScrollToTop()
  const {data: serviceData} = useQuery({
    queryKey: "GET_SERVICES",
    queryFn: fetchGetAllService,
  })

  const {data: packageData} = useQuery({
    queryKey: "GET_PACKAGE",
    queryFn: fetchGetAllPackage,
  })

  return (
    <div>
        <Banner banner="https://images.unsplash.com/photo-1563865436914-44ee14a35e4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Dịch vụ của chúng tôi" from="Trang chủ" to="Dịch vụ"/>
        <section className="bg-[#61168C]">
          <div className="flex max-w-7xl mx-auto py-20 px-5 max-sm:flex-col max-sm:gap-10 max-sm:py-10">
          {SERVICE_WIDGET.map((widget) => {
            return (
              <ServiceWidget
                key={widget.id}
                label={widget.label}
                content={widget.content}
                thumbnail={widget.thumbail}
              />
            );
          })}
          </div>
        </section>
        <section className="max-w-7xl mx-auto py-24 max-sm:py-12 p-5">
          <Heading label="DỊCH VỤ CỦA CHÚNG TÔI" title="Danh sách dịch vụ" content="Tắm trắng, massage, chăm sóc da mặt - Giúp bạn trẻ hóa làn da, tự tin tỏa sáng..."/>
          <div className="mt-20 grid grid-cols-2 gap-16 max-sm:grid-cols-1">
            {
              serviceData?.data?.data.map((service) => {
                return(
                  <div key={service?._id} className="flex items-center justify-between border-b pb-4 gap-5">
                    <div>
                      <p className="text-xl cormorant-font font-semibold">
                        {service?.name}
                      </p>
                      <p className="font-light mt-2.5">
                        {service?.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2.5">
                      <p className="font-medium tracking-widest text-gray-500 text-sm line-through whitespace-nowrap">
                        {convertMoneyToVND(service?.priceBeforeDiscount)}
                      </p>
                      <p className="font-medium tracking-widest text-[#FFA732] text-lg whitespace-nowrap">
                        {convertMoneyToVND(service?.priceAfterDiscount)}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
        <section className="bg-[#61168C] py-24 max-sm:py-12 px-5">
          <div className="max-w-7xl mx-auto">
          <Heading label="ƯU ĐÃI ĐẶC BIỆT" title="Danh sách gói dịch vụ" content="Các gói dịch vụ siêu ưu đãi từ GODIVA" className="text-white"/>
            <div className="flex items-center justify-center gap-10 mt-[75px]">
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
              {packageData?.data?.data.map((pack) => {
                return (
                  <SwiperSlide key={pack?._id}>
                    <ServicePackage packageData={pack}/>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            </div>
          </div>
        </section>
        <div className="py-[100px] max-sm:py-[50px] px-5">
            <HiOutlineBadgeCheck size={40} className="mx-auto"/>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mt-10"
            >
              {REVIEW.map((review) => {
                return (
                  <SwiperSlide key={review.id}>
                    <div className="flex flex-col items-center gap-5">
                      <p className="max-w-2xl text-center italic text-xl font-light">
                        {review.content}
                      </p>
                      <div className="flex flex-col items-center gap-2.5">
                        <img
                          src={review.avatar}
                          alt=""
                          className="h-[70px] w-[70px] bg-slate-500 rounded-full object-cover"
                        />
                        <div className="text-center">
                          <p className="tracking-widest font-medium text-xl">
                            {review.name}
                          </p>
                          <p className="text-[#FFA732] italic cormorant-font text-lg font-semibold">
                            {review.positon}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
    </div>
  )
}
