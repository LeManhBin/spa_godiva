import { useContext, useRef } from "react"
import Button from "../Button"
import { WebContext } from "../../contexts/AppContext"
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

export const Footer = () => {
    const [, dispatch] = useContext(WebContext)
    const navigate = useNavigate()
    const handleOpenModel = () => {
        dispatch({type: "OPEN_MODEL"})
    }

    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_bw5xsqs', 'template_3d55kdo', form.current, 'dhxYMMKZxbMpMsOma')
            .then(() => {
                navigate('/success')
            }, (error) => {
                alert(error.text)
        });
    };
  return (
    <footer className="py-20">
        <div className="h-[300px] relative">
          <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""  className="w-full h-full object-cover"/>
          <div className="absolute inset-0 max-w-7xl mx-auto flex items-center justify-between px-10 max-sm:flex-col max-sm:justify-center max-sm:items-start max-sm:gap-5">
              <div>
                <p className="tracking-widest font-medium text-white">APPOINTMENT</p>
                <h1 className="text-5xl mt-2.5 text-white cormorant-font max-lg:text-3xl">BOOK YOUR APPOINTMENT</h1>
              </div>
              <Button label="Đặt lịch" mode="dark" className="bg-transparent text-white" onCallBack={handleOpenModel}/>
          </div>
        </div>
        <div className="pt-[100px] max-sm:pt-[50px] max-w-7xl mx-auto flex justify-between flex-wrap gap-5 px-5">
            <div className="flex flex-col items-start">
                <div className="flex flex-col items-center justify-center text-black">
                    <h1 className="cormorant-font text-2xl font-semibold tracking-wide">GODIVA KOREA</h1>
                    <p className="leading-none montserrat-font">Nơi nhan sắc tái sinh</p>
                </div>
                <p className="montserrat-font mt-2.5 font-light">Lorem ipsum dolor sit amet consectetur</p>
            </div>   
            <div>
                <h3 className="cormorant-font text-2xl font-medium tracking-widest ">Thông tin liên hệ</h3>
                <ul className="flex flex-col gap-2.5 mt-2.5 montserrat-font font-light">
                    <li className="">89 Lê Đình Lý, phường Vĩnh Trung, Quận Thanh Khê, Tp Đà Nẵng</li>
                    <li className="tracking-widest ">0911110562</li>
                    <li className="">thammyhanquocgodiva@gmail.com</li>
                    <li className="">8:30 đến 19:30 hàng ngày</li>
                </ul>
            </div>
            <div className="">
                <h1 className="text-2xl font-medium cormorant-font">Đăng ký để nhận ưu đãi</h1>
                <form action="" ref={form} className="w-full flex flex-col gap-2.5 mt-2.5" onSubmit={sendEmail}>
                    <div className="flex flex-col gap-2.5 w-full">
                        <label htmlFor="" className="montserrat-font font-light">Họ và tên</label>
                        <input type="text" required placeholder="Nhập họ và tên" name="user_name" className="outline-none px-2.5 py-1.5 border"/>
                    </div>
                    <div className="flex flex-col gap-2.5 w-full">
                        <label htmlFor="" className="montserrat-font font-light">Email</label>
                        <input type="text" required placeholder="Nhập email" name="user_email" className="outline-none px-2.5 py-1.5 border"/>
                    </div>
                    <div className="flex flex-col gap-2.5 w-full">
                        <label htmlFor="" className="montserrat-font font-light">Số điện thoại</label>
                        <input type="text" required placeholder="Nhập số điện thoại" name="user_phone" className="outline-none px-2.5 py-1.5 border"/>
                    </div>
                    <div className="flex flex-col gap-2.5 w-full">
                        <label htmlFor="" className="montserrat-font font-light">Lời nhắn</label>
                        <textarea name="message" id="" cols="30" rows="3" placeholder="Nhập lời nhắn" className="outline-none px-2.5 py-1.5 border"></textarea>
                    </div>
                    <Button type="submit" label="Gửi"/>
                </form>
            </div>

        </div>
    </footer>
  )
}
