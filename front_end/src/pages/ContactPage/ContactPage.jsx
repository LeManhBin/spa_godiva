import { useRef, useState } from "react";
import { Banner, Button, Heading } from "../../components"
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop"
import { useMutation } from "@tanstack/react-query";
import { fetchRegisterCustomer } from "../../api/customer.api";
import { toast } from "react-toastify";

export const ContactPage = () => {
  useScrollToTop()
  const form = useRef();
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const sendMailMutation = useMutation({
    mutationFn: fetchRegisterCustomer
  })
  
  const sendEmail = (e) => {
    e.preventDefault()
    sendMailMutation.mutate(formState, {
        onSuccess: (res) => {
          if(res.status === 200) {
              navigate("/success")
          }else {
              toast.error("Có lỗi xảy ra vui lòng thử lại")
          }
      }
    })
  };
  return (
    <div className="">
      <Banner banner="https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Liên hệ" from="Trang chủ" to="Liên hệ"/>
      <div className="bg-mainColor px-5">
        <div className="py-[100px] max-w-7xl mx-auto flex justify-between max-md:flex-col max-md:gap-5 text-white">
            <div className="flex flex-col items-center">
                <h1 className="uppercase text-3xl cormorant-font font-medium text-center">Địa chỉ</h1>
                <p className="italic cormorant-font text-lg text-center max-w-[400px]">89 Lê Đình Lý, phường Vĩnh Trung, Quận Thanh Khê, Tp Đà Nẵng</p>
                <p className="italic cormorant-font text-lg text-center max-w-[400px]">67 Hùng Vương, phường Vĩnh Trung, Quận Thanh Khê, Tp Đà Nẵng</p>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="uppercase text-3xl cormorant-font font-medium text-center">Số điện thoại</h1>
                <p className="italic cormorant-font text-lg text-center">0911110562</p>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="uppercase text-3xl cormorant-font font-medium text-center">Email</h1>
                <p className="italic cormorant-font text-lg text-center">thammyhanquocgodiva@gmail.com</p>
            </div>
        </div>
      </div>
      <div className="mt-[70px] max-w-7xl mx-auto px-24 max-sm:px-12">
        <Heading label="Liên hệ" title="Gửi tin nhắn cho chúng tôi" content="Liên hệ với chung tôi để nhận ưu đãi và dịch vụ tốt nhất"/>
        <form action="" ref={form} className="mt-10 flex flex-col gap-5" onSubmit={sendEmail}>
            <input type="text" name="name" required placeholder="Họ và tên" className="w-full outline-none py-1.5 border-b italic cormorant-font" value={formState.name} onChange={handleOnChange}/>
            <div className="flex gap-2.5">
                <input type="text" name="phoneNumber" required placeholder="Số điện thoại" className="w-full outline-none py-1.5 border-b italic cormorant-font" value={formState.phoneNumber} onChange={handleOnChange}/>
                <input type="text" name="email" required placeholder="Email" className="w-full outline-none py-1.5 border-b italic cormorant-font" value={formState.email} onChange={handleOnChange}/>
            </div>
            <textarea name="message" id="" required cols="30" rows="3" placeholder="Nội dung" className="w-full outline-none py-1.5 border-b italic cormorant-font" value={formState.message} onChange={handleOnChange}></textarea>
            <Button type="submit" label="Gửi" className="w-max mx-auto px-14"/>
        </form>
      </div>
      <div className="max-w-7xl mx-auto h-[500px] mt-[100px]">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1673147834854!2d108.20914047592197!3d16.056805139768866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b651ecdbc7%3A0xd796e2d6aebe9618!2zODkgTMOqIMSQw6xuaCBMw70sIFbEqW5oIFRydW5nLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1702307209233!5m2!1svi!2s" className="w-full h-full"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}
