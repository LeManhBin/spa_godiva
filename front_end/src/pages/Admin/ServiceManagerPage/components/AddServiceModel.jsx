import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { fetchCreateService } from "../../../../api/service.api";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const AddServiceModel = ({setIsOpen}) => {
    const queryClient = useQueryClient()

    const [serviceState, setServiceState] = useState({
        name: "",
        description: "",
        priceBeforeDiscount: "",
        priceAfterDiscount: ""
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setServiceState({
            ...serviceState,
            [name]: value
        })
    }

    const addServiceMutation = useMutation({
        mutationFn: fetchCreateService
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(serviceState.priceBeforeDiscount < serviceState.priceAfterDiscount) {
            toast.warning("Giá khuyến mãi phải nhỏ hơn giá gốc")
        }else {
            addServiceMutation.mutate(serviceState, {
                onSuccess: (res) => {
                    if(res.status === 200) {
                        toast.success("Thêm dịch vụ thành công!")
                        queryClient.invalidateQueries({ queryKey: ['GET_SERVICES'] })
                        setIsOpen(false)
                    }else {
                        toast.error("Thêm dịch vụ thất bại")
                    }
                }
            })
        }
        
    }
  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="fixed inset-0 bg-black opacity-70" onClick={() => setIsOpen(false)}></div>
        <div className="absolute z-50 left-[50%] translate-x-[30%] w-full bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Thêm mới dịch vụ
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setIsOpen(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên dịch vụ</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên dịch vụ" required value={serviceState.name} onChange={handleOnChange} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="priceBeforeDiscount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá gốc</label>
                        <input type="number" name="priceBeforeDiscount" id="priceBeforeDiscount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required value={serviceState.priceBeforeDiscount} onChange={handleOnChange}/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="priceAfterDiscount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá đã giảm</label>
                        <input type="number" name="priceAfterDiscount" id="priceAfterDiscount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required value={serviceState.priceAfterDiscount} onChange={handleOnChange}/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả ngắn</label>
                        <textarea id="description" name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập mô tả" value={serviceState.description} onChange={handleOnChange}></textarea>                    
                    </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Thêm dịch vụ
                </button>
            </form>
        </div>
    </div>
  )
}


AddServiceModel.propTypes = {
    setIsOpen: PropTypes.any
}
  

export default AddServiceModel