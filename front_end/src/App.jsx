
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout/MainLayout"
import Homepage from "./pages/HomePage/Homepage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ServicePage from "./pages/ServicePage"
import SuccessPage from "./pages/SuccessPage"
import AdminLayout from "./Layouts/AdminLayout/AdminLayout"
import Dashboard from "./pages/Admin/Dashboard"
import ServiceMangerPage from "./pages/Admin/ServiceManagerPage"
import ServicePackageMangerPage from "./pages/Admin/ServicePackageMangerPage"
import LoginPage from "./pages/LoginPage"
import BannerManagerPage from "./pages/Admin/BannerManagerPage"
import StaffManagerPage from "./pages/Admin/StaffManagerPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}> 
            <Route index element={<Homepage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/service" element={<ServicePage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
          </Route>
          <Route path="/admin" element={<AdminLayout/>} >
            <Route index element={<Dashboard/>}/>
            <Route path="service" element={<ServiceMangerPage/>}/>
            <Route path="service-package" element={<ServicePackageMangerPage/>}/>
            <Route path="staff" element={<StaffManagerPage/>}/>
            <Route path="banner" element={<BannerManagerPage/>}/>
          </Route>
          <Route path="/success" element={<SuccessPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
