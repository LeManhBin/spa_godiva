import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { fetchLogin } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginPage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [formState, setFormState] = useState({
        userName: "",
        password: "",
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    useEffect(() => {
        if(token) {
          navigate("/admin")
        }
    },[])

    const loginMutation = useMutation({
        mutationFn: (state) => fetchLogin(state)
    })

    const handleLogin = (e) => {
        e.preventDefault()
        loginMutation.mutate(formState, {
            onSuccess: (loginResponse) => {
                if(loginResponse?.status === 200) {
                    navigate("/admin")
                    toast.success("Đăng nhập thành công")
                    localStorage.setItem("auth", JSON.stringify(loginResponse?.data.data))
                    localStorage.setItem("token", JSON.stringify(loginResponse?.data.token))
                }else {
                    toast.error("Tài khoản hoặc mật khẩu không chính xác")
                }
            },
        })        
    }  
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="cormorant-font flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                GODIVA
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Đăng nhập
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản</label>
                            <input type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tài khoản" required value={formState.userName} onChange={handleOnChange}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={formState.password} onChange={handleOnChange}/>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
