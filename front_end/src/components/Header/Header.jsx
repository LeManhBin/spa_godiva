import { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);

  const handleToggleNavbar = () => {
    setIsOpenNavbar(!isOpenNavbar)
  }
  
  return (
    <div className="fixed z-50 top-0 left-0 right-0 h-[90px]  mx-auto flex items-center justify-between border-b border-white px-10 bg-[#61168C] mb-[90px]">
        <div className="flex flex-col items-center justify-center text-[#FFD700]">
            <h1 className="cormorant-font text-2xl font-semibold tracking-wide">GODIVA KOREA</h1>
            <p className="leading-none montserrat-font">Nơi nhan sắc tái sinh</p>
        </div>
        {
          isOpenNavbar &&
          <div className="fixed inset-0 bg-black opacity-70 z-10 lg:hidden" onClick={handleToggleNavbar}></div>
        }
        <ul className={`flex items-center gap-[60px] text-white montserrat-font duration-300 ease-in-out max-lg:flex-col max-lg:bg-white max-lg:text-black max-lg:w-[50%] max-sm:w-[80%] max-lg:fixed max-lg:pt-[100px] max-lg:top-0 ${isOpenNavbar ? 'max-lg:right-0' : 'max-lg:right-[-100%]'} max-lg:bottom-0 max-lg:border max-lg:z-50`}>
            <HiOutlineX size={30} className="absolute top-2.5 left-2.5 cursor-pointer lg:hidden" onClick={handleToggleNavbar}/>
            <NavLink to={"/"} className={({isActive}) => isActive && 'text-[#FFA732]' } onClick={handleToggleNavbar}>
              <li className="uppercase font-medium text-sm cursor-pointer tracking-widest">Trang chủ</li>
            </NavLink>
            <NavLink to={"/about"} className={({isActive}) => isActive && 'text-[#FFA732]' } onClick={handleToggleNavbar}>
              <li className="uppercase font-medium text-sm cursor-pointer tracking-widest">Giới thiệu</li>
            </NavLink>
            <NavLink to={"/service"} className={({isActive}) => isActive && 'text-[#FFA732]' } onClick={handleToggleNavbar}>
              <li className="uppercase font-medium text-sm cursor-pointer tracking-widest">Dịch vụ</li>
            </NavLink>
            <NavLink to={"/contact"} className={({isActive}) => isActive && 'text-[#FFA732]' } onClick={handleToggleNavbar}>
              <li className="uppercase font-medium text-sm cursor-pointer tracking-widest">Liên hệ</li>
            </NavLink>

        </ul>
        <div className="lg:invisible">
            <HiOutlineMenuAlt3 size={34} cursor="pointer" className="text-white" onClick={handleToggleNavbar}/>
        </div>
    </div>
  )
}
