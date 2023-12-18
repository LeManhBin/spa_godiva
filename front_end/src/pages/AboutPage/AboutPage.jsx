import { HiOutlineBadgeCheck, HiOutlineCheck } from "react-icons/hi";
import {
  Banner,
  Button,
  ExpertCard,
  Heading,
  ServiceWidget,
} from "../../components";
import {  REVIEW, SERVICE_WIDGET } from "../../constants/fakeData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useContext, useRef } from "react";
import { WebContext } from "../../contexts/AppContext";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { fetchGetAllStaff } from "../../api/staff.api";
import { useQuery } from "@tanstack/react-query";
import useScrollToTop from "../../hooks/useScrollToTop";
import about1 from "../../assets/images/about1.jpg";
import about2 from "../../assets/images/about2.jpg";
import about3 from "../../assets/images/about3.jpg";
import MotionFade from "../../components/MotionFade";

export const AboutPage = () => {
  useScrollToTop()
  
  const [, dispatch] = useContext(WebContext);
  const navigate = useNavigate();
  const form = useRef();

  const handleOpenModel = () => {
    dispatch({ type: "OPEN_MODEL" });
  };

  const {data: staffData} = useQuery({
    queryKey: ["GET_STAFF"],
    queryFn: fetchGetAllStaff,
  })

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bw5xsqs",
        "template_3d55kdo",
        form.current,
        "dhxYMMKZxbMpMsOma"
      )
      .then(
        () => {
          navigate("/success");
        },
        (error) => {
          alert(error.text);
        }
      );
  };

  return (
    <div className="">
      <Banner banner="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Giới thiệu" from="Trang chủ" to="Giới thiệu" />
      <MotionFade>
        <section className="max-w-7xl mx-auto py-24 max-sm:py-12 px-5">
          <div className="flex gap-10 max-sm:flex-col">
            <div className="flex-1">
              <Heading
                label="Về chúng tôi"
                title="Điều trị giúp bạn thoải mái hơn"
                position="start"
                className="text-start"
              />
              <ul className="font-thin w-[70%]">
                <li className="flex gap-5 mt-2.5"> <HiOutlineCheck size={20} className="text-[#FFA732]"/>Công nghệ tắm trắng tiên tiến giúp da trắng sáng bật tone chỉ sau 1 liệu trình.</li>
                <li className="flex gap-5 mt-2.5"> <HiOutlineCheck size={20} className="text-[#FFA732]"/>Massage trị liệu chuyên sâu đánh tan cơn đau, giải tỏa căng thẳng, thư giãn toàn thân.</li>
                <li className="flex gap-5 mt-2.5"> <HiOutlineCheck size={20} className="text-[#FFA732]"/>Liệu trình chăm sóc da mặt bằng tinh chất thiên nhiên giúp da căng mịn, giảm nếp nhăn, trẻ hóa toàn diện.</li>
                <li className="flex gap-5 mt-2.5"> <HiOutlineCheck size={20} className="text-[#FFA732]"/>Giảm béo không phẫu thuật an toàn hiệu quả, lấy lại vóc dáng thon gọn nhanh chóng.</li>
              </ul>
              <Button
                label="Đặt lịch"
                className="mt-10"
                onCallBack={handleOpenModel}
              />
            </div>
            <div className="flex-1">
              <img
                src={about2}
                alt=""
              />
            </div>
          </div>
        </section>
      </MotionFade>
      <section className="px-5">
        <div className="flex flex-col items-center py-20 max-sm:px-12 gap-5">
          <HiOutlineBadgeCheck size={40} className="" />
          <p className="max-w-2xl text-center italic text-xl font-light">
            Tại GODIVA, chúng tôi cam kết mang đến cho khách hàng những dịch vụ thẩm mỹ chất lượng cao, giá cả phải chăng và đội ngũ nhân viên chuyên nghiệp. Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí!
          </p>
          <p className="whisper-font font-medium text-5xl">Yến Như</p>
        </div>
      </section>
      <section className="bg-[#61168C] pb-10">
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
        <div className="max-w-7xl mx-auto">
          <div className="h-[500px] w-[100%] max-sm:h-[400px] rounded mt-20 px-5">
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
        </div>
      </section>
      <section className="py-24 px-5 max-sm:py-12">
        <div className="max-w-7xl mx-auto">
          <Heading
            label="CHUYÊN VIÊN"
            title="GẶP GỠ CHUYÊN GIA CỦA CHÚNG TÔI"
          />
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
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
            {staffData?.data.data.map((expert) => {
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
      </section>
      <div className="py-[100px] max-sm:py-14 px-5">
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
      <div className="max-w-7xl mx-auto px-5">
        <MotionFade>
        <div className="flex gap-10 max-sm:flex-col">
          <div className="flex-1">
            <Heading
              label="Vì sao nên chọn chúng tôi"
              title="Chúng tôi mang lại những dịch vụ trên cả mong đợi"
              position="start"
              className="max-sm:text-center max-sm:mx-auto"
            />
            <div className="flex justify-start gap-2.5 mt-2.5 mb-10">
              <HiOutlineCheck size={24} className="text-[#FFA732]" />
              <div className="">
                <h3 className="cormorant-font font-semibold leading-none text-lg">
                  Giá cả phải chăng
                </h3>
                <p className="montserrat-font mt-2.5 font-light">
                  Chúng tôi cam kết đem đến cho khách hàng những trải nghiệm làm đẹp tuyệt vời nhất với chi phí hợp lý nhất.
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-2.5 mt-2.5 mb-10">
              <HiOutlineCheck size={24} className="text-[#FFA732]" />
              <div className="">
                <h3 className="cormorant-font font-semibold leading-none text-lg">
                  Điều trị đặc biệt
                </h3>
                <p className="montserrat-font mt-2.5 font-light">
                  Chúng tôi luôn tìm kiếm những phương pháp điều trị mới nhất và hiệu quả nhất để mang lại cho khách hàng những kết quả tốt nhất.
                </p>
              </div>
            </div>
            <div className="flex justify-start gap-2.5 mt-2.5 mb-10">
              <HiOutlineCheck size={24} className="text-[#FFA732]" />
              <div className="">
                <h3 className="cormorant-font font-semibold leading-none text-lg">
                  Đội ngũ nhân viên chuyên nghiệp
                </h3>
                <p className="montserrat-font mt-2.5 font-light">
                Đội ngũ nhân viên của chúng tôi được đào tạo bài bản và có kinh nghiệm, luôn tận tâm, chu đáo và sẵn sàng đáp ứng mọi nhu cầu của khách hàng
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={about1}
              alt=""
            />
          </div>
        </div>
        </MotionFade>
        <MotionFade>
          <div className="flex flex-row-reverse max-sm:flex-col gap-10 mt-[100px] max-sm:mt-[50px]">
            <div className="flex-1">
              <Heading
                label="FAQS"
                title="CÁC CÂU HỎI THƯỜNG GẶP"
                position="start"
                className={"max-sm:mx-auto"}
              />
              <div className="flex flex-col gap-5">
                <details className="p-2 border">
                  <summary className="cormorant-font font-semibold leading-none text-lg">
                    Làm cách nào để đặt lịch hẹn tại GODIVA ?
                  </summary>
                  <p className="ontserrat-font mt-2.5 font-light">
                    Epcot is a theme park at Walt Disney World Resort featuring
                    exciting attractions, international pavilions, award-winning
                    fireworks and seasonal special events.
                  </p>
                </details>
                <details className="p-2 border">
                  <summary className="cormorant-font font-semibold leading-none text-lg">
                    Tại GODIVA có những dịch vụ nào ?
                  </summary>
                  <p className="ontserrat-font mt-2.5 font-light">
                    Epcot is a theme park at Walt Disney World Resort featuring
                    exciting attractions, international pavilions, award-winning
                    fireworks and seasonal special events.
                  </p>
                </details>
                <details className="p-2 border">
                  <summary className="cormorant-font font-semibold leading-none text-lg">
                    Tư vấn phương pháp điều trị phù hợp ?
                  </summary>
                  <p className="ontserrat-font mt-2.5 font-light">
                    Epcot is a theme park at Walt Disney World Resort featuring
                    exciting attractions, international pavilions, award-winning
                    fireworks and seasonal special events.
                  </p>
                </details>
              </div>
            </div>
            <div className="flex-1">
              <img
                src={about3}
                alt=""
              />
            </div>
          </div>
        </MotionFade>
      </div>
      <div className="max-w-7xl mx-auto bg-[#F2F1EB] py-[100px] mt-[100px] max-sm:py-[50px] px-5">
        <Heading
          label="NEWSLETTER"
          title="Đăng ký nhận ưu đãi ngay"
          content="Liên hệ với chung tôi để nhận ưu đãi và dịch vụ tốt nhất"
        />
        <form
          action=""
          ref={form}
          className="mt-10 flex flex-col gap-5 px-40 max-sm:px-0"
          onSubmit={sendEmail}
        >
          <input
            type="text"
            required
            placeholder="Họ và tên"
            name="user_name"
            className="w-full outline-none py-1.5 border-b italic cormorant-font bg-transparent"
          />
          <div className="flex gap-2.5">
            <input
              type="text"
              required
              placeholder="Số điện thoại"
              name="user_phone"
              className="w-full outline-none py-1.5 border-b italic cormorant-font bg-transparent"
            />
            <input
              type="text"
              required
              placeholder="Email"
              name="user_email"
              className="w-full outline-none py-1.5 border-b italic cormorant-font bg-transparent"
            />
          </div>
          <textarea
            name="message"
            id=""
            required
            cols="30"
            rows="3"
            placeholder="Nội dung"
            className="w-full outline-none py-1.5 border-b italic cormorant-font bg-transparent"
          ></textarea>
          <Button type="submit" label="Đăng ký" className="w-max mx-auto" />
        </form>
      </div>
    </div>
  );
};
