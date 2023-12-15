import {
  Button,
  ExpertCard,
  Heading,
  ServicePackage,
  ServiceWidget,
} from "../../components";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { REVIEW, SERVICE_WIDGET } from "../../constants/fakeData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useContext } from "react";
import { WebContext } from "../../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { fetchGetAllService } from "../../api/service.api";
import { convertMoneyToVND } from "../../constants/convertMoney";
import { fetchGetAllPackage } from "../../api/package.api";
import { fetchGetBanner } from "../../api/banner.api";
import { IMAGE_URL } from "../../constants/url";
import { fetchGetAllStaff } from "../../api/staff.api";
import useScrollToTop from "../../hooks/useScrollToTop";

const Homepage = () => {
  useScrollToTop()
  const [, dispatch] = useContext(WebContext)

  const handleOpenModel = () => {
      dispatch({type: "OPEN_MODEL"})
  }

  const {data: serviceData} = useQuery({
    queryKey: "GET_SERVICES",
    queryFn: fetchGetAllService,

  })

  const {data: packageData} = useQuery({
    queryKey: "GET_PACKAGE",
    queryFn: fetchGetAllPackage,
  })

  const {data: bannerData} = useQuery({
    queryKey: ["GET_BANNER"],
    queryFn: fetchGetBanner,
  })

  const {data: staffData} = useQuery({
    queryKey: ["GET_STAFF"],
    queryFn: fetchGetAllStaff,
  })
  return (
    <div className="">
        <div className=" relative top-[90px] bg-[#F2F1EB]">
          <img src={`${IMAGE_URL}/${bannerData?.data?.data[0].image}`} alt="" className="w-full h-full object-cover" />
        </div>
      <section className="bg-[#F2F1EB]">
        <div className="flex max-w-7xl mx-auto py-20 px-10 max-sm:flex-col max-sm:gap-10">
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
      <section>
        <div className="flex flex-col items-center py-20 gap-5 px-5">
          <HiOutlineBadgeCheck size={40} className="" />
          <p className="max-w-2xl text-center italic text-xl font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            exercitationem dolorem modi repudiandae voluptatum itaque vitae quia
            aut atque aperiam autem quibusdam! Cum quis expedita quibusdam
            cumque corporis doloremque deleniti.
          </p>
          <p className="whisper-font font-medium text-5xl">Yến Như</p>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-5 max-w-7xl mx-auto px-5 max-sm:grid-cols-1">
        <div className="mr-10 max-sm:mr-0">
          <img
            src="https://askproject.net/blanche/wp-content/uploads/sites/77/2022/05/health-and-spa-K7WXBN3.jpg"
            alt=""
            className="hover:translate-y-[-10px] duration-300 ease-in-out"
          />
          <p className="text-lg italic mt-2.5 cormorant-font font-medium">
            NATURAL PRODUCT
          </p>
        </div>
        <div className="ml-10 max-sm:ml-0">
          <img
            src="https://askproject.net/blanche/wp-content/uploads/sites/77/2022/05/spa-salon-AK9SSCX.jpg"
            alt=""
            className="hover:translate-y-[-10px] duration-300 ease-in-out"
          />
          <p className="text-lg italic mt-2.5 cormorant-font font-medium">
            NATURAL PRODUCT
          </p>
        </div>
        <div className="mr-10 max-sm:mr-0">
          <img
            src="https://askproject.net/blanche/wp-content/uploads/sites/77/2022/05/spa-salon-AK9SSCX.jpg"
            alt=""
            className="hover:translate-y-[-10px] duration-300 ease-in-out"
          />
          <p className="text-lg italic mt-2.5 cormorant-font font-medium">
            NATURAL PRODUCT
          </p>
        </div>
        <div className="flex flex-col justify-end ml-10 max-sm:ml-0">
          <img
            src="https://askproject.net/blanche/wp-content/uploads/sites/77/2022/05/health-and-spa-K7WXBN3.jpg"
            alt=""
            className="hover:translate-y-[-10px] duration-300 ease-in-out"
          />
          <p className="text-lg italic mt-2.5 cormorant-font font-medium">
            NATURAL PRODUCT
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-24 max-sm:py-12 px-5">
        <Heading
          label="DỊCH VỤ CỦA CHÚNG TÔI"
          title="DETOX INSIDE OUT"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar."
        />
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
        <div className="h-[500px] w-[100%] max-sm:h-[400px] bg-slate-500 rounded mt-20">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/8zYz_TYCnkc?si=xlP2r606zMotkbfc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="bg-[#F2F1EB] py-24 max-sm:py-12 px-5">
          <div className="max-w-7xl mx-auto">
            <Heading label="SPECIAL OFFER" title="PRICING PACKAGE" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar."/>
            <div className="flex items-center justify-center gap-10 mt-[75px]">
              <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
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
              {packageData?.data.data.map((pack) => {
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
      <section className="max-w-7xl mx-auto py-24 max-sm:py-12 px-5">
        <div className="flex gap-10 max-sm:flex-col">
          <div className="flex-1">
            <Heading
              label="ĐIỀU TRỊ"
              title="CHÚNG TÔI MANG ĐẾN NHỮNG PHƯƠNG PHÁP TUYỆT VỜI NHẤT"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra eget massa ut mattis. Sed eget molestie lacus. Vivamus vulputate in eros vitae tempor."
              position="start"
              className="text-start"
            />
            <Button label="Đặt lịch" className="mt-10" onCallBack={handleOpenModel}/>
          </div>
          <div className="flex-1">
            <img
              src="https://askproject.net/blanche/wp-content/uploads/sites/77/2022/05/health-and-spa-K7WXBN3.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-10 mt-[100px] max-sm:mt-[50px] max-sm:flex-col">
        <div className="flex-1">
              <Heading label="FAQS" title="CÁC CÂU HỎI THƯỜNG GẶP" position="start"/>
              <div className="flex flex-col gap-5">
                <details className="p-2 border">
                  <summary className="cormorant-font font-semibold leading-none text-lg">Làm cách nào để đặt lịch hẹn tại GODIVA ?</summary>
                  <p className="ontserrat-font mt-2.5 font-light">Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                </details>
                <details className="p-2 border">
                  <summary className="cormorant-font font-semibold leading-none text-lg">Tại GODIVA có những dịch vụ nào ?</summary>
                  <p className="ontserrat-font mt-2.5 font-light">Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                </details>
                <details className="p-2 border">
                  <summary className="cormorant-font font-semibold leading-none text-lg">Tư vấn phương pháp điều trị phù hợp ?</summary>
                  <p className="ontserrat-font mt-2.5 font-light">Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                </details>
              </div>
            </div>
            <div className="flex-1">
              <img src="https://askproject.net/blanche/wp-content/uploads/sites/77/2022/05/health-and-spa-K7WXBN3.jpg" alt="" />
            </div>
        </div>
        <div>
          <div className="py-[100px] max-sm:py-[50px] px-5">
            <HiOutlineBadgeCheck size={40} className="mx-auto" />
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
      </section>
      <section className="bg-[#F2F1EB] py-24 max-sm:py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <Heading label="CHUYÊN VIÊN" title="GẶP GỠ CHUYÊN GIA CỦA CHÚNG TÔI" />
          <div className="mt-[70px]">
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
              {staffData?.data?.data?.map((expert) => {
                return (
                  <SwiperSlide key={expert._id}>
                    <ExpertCard
                      name={expert.name}
                      position={expert.position}
                      avatar={expert.avatar}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
