import { Outlet } from "react-router-dom"
import { AppointmentPopup, Footer, Header } from "../../components"
import { useContext } from "react"
import { WebContext } from "../../contexts/AppContext"

const MainLayout = () => {
  const [state] = useContext(WebContext)

  return (
    <div className="relative">
        <Header/>
        {
          state.isOpenRegisterModal && <AppointmentPopup/>
        }
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout