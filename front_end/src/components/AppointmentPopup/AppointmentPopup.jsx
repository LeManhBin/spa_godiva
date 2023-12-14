import { useContext, useRef } from "react";
import Button from "../Button"
import { HiOutlineX } from "react-icons/hi";
import { WebContext } from "../../contexts/AppContext";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

export const AppointmentPopup = () => {
    const [, dispatch] = useContext(WebContext)
    const form = useRef();
    const navigate = useNavigate()
    const handleCloseModel = () => {
        dispatch({type: 'CLOSE_MODEL'})
    }

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
    <div className="fixed z-50 flex h-screen w-screen overflow-hidden justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-70" onClick={handleCloseModel}>
        </div>
        <div className="relative flex items-center gap-2.5 w-[600px] h-[400px] z-20 bg-white max-sm:flex-col max-sm:h-[600px] max-sm:w-[90%]">
            <HiOutlineX size={20} className="absolute top-2.5 right-2.5 cursor-pointer" onClick={handleCloseModel}/>
            <div className="w-[50%] h-full bg-slate-400 max-sm:w-full">
            </div>
            <form action="" ref={form} className="mt-10 flex flex-col gap-5 p-5" onSubmit={sendEmail}>
                <h1 className="text-center text-2xl cormorant-font font-semibold">Đăng ký nhận ưu đãi ngay</h1>
                <input type="text" required placeholder="Họ và tên" name="user_name" className="w-full outline-none py-1.5 border-b italic cormorant-font"/>
                <div className="flex gap-2.5">
                    <input type="text" required placeholder="Số điện thoại" name="user_phone" className="w-full outline-none py-1.5 border-b italic cormorant-font"/>
                    <input type="text" required placeholder="Email" name="user_email" className="w-full outline-none py-1.5 border-b italic cormorant-font"/>
                </div>
                <textarea name="message" id="" cols="30" rows="3" placeholder="Nội dung"  className="w-full outline-none py-1.5 border-b italic cormorant-font"></textarea>
                <Button type="submit" label="Đặt lịch" className="w-max mx-auto px-14"/>
            </form>
        </div>
    </div>
  )
}
