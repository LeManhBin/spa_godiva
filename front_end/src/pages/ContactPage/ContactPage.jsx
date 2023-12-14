import { useRef } from "react";
import { Banner, Button, Heading } from "../../components"
import emailjs from '@emailjs/browser'
import { useNavigate } from "react-router-dom";
export const ContactPage = () => {
  const form = useRef();
  const navigate = useNavigate()
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
    <div className="">
      <Banner label="Liên hệ" from="Trang chủ" to="Liên hệ"/>
      <div className="bg-[#F2F1EB] px-5">
        <div className="py-[100px] max-w-7xl mx-auto flex justify-between max-md:flex-col max-md:gap-5">
            <div className="flex flex-col items-center">
                <h1 className="uppercase text-3xl cormorant-font font-medium text-center">Địa chỉ</h1>
                <p className="italic cormorant-font text-lg text-center max-w-[400px]">89 Lê Đình Lý, phường Vĩnh Trung, Quận Thanh Khê, Tp Đà Nẵng</p>
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
        <Heading label="Liên hệ" title="Gửi tin nhắn cho chúng tôi" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar."/>
        <form action="" ref={form} className="mt-10 flex flex-col gap-5" onSubmit={sendEmail}>
            <input type="text" name="user_name" required placeholder="Họ và tên" className="w-full outline-none py-1.5 border-b italic cormorant-font"/>
            <div className="flex gap-2.5">
                <input type="text" name="user_phone" required placeholder="Số điện thoại" className="w-full outline-none py-1.5 border-b italic cormorant-font"/>
                <input type="text" name="user_email" required placeholder="Email" className="w-full outline-none py-1.5 border-b italic cormorant-font"/>
            </div>
            <textarea name="message" id="" required cols="30" rows="3" placeholder="Nội dung" className="w-full outline-none py-1.5 border-b italic cormorant-font"></textarea>
            <Button type="submit" label="Gửi" className="w-max mx-auto px-14"/>
        </form>
      </div>
      <div className="max-w-7xl mx-auto h-[500px] mt-[100px]">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1673147834854!2d108.20914047592197!3d16.056805139768866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b651ecdbc7%3A0xd796e2d6aebe9618!2zODkgTMOqIMSQw6xuaCBMw70sIFbEqW5oIFRydW5nLCBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1702307209233!5m2!1svi!2s" className="w-full h-full"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}
