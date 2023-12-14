import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchGetPackageById, fetchUpdatePackage } from "../../../../api/package.api";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const EditPackageModel = ({setIsOpen, idTerm}) => {
  const queryClient = useQueryClient()

  const [packageState, setPackageState] = useState({
    name: "",
    description: [],
    price: ""
  })
  const [descriptionValue, setDescriptionValue] = useState('');

  
  useEffect(() => {
    fetchGetPackageById(idTerm).then((res) => {
      setPackageState({
        name: res?.data?.data.name,
        price: res?.data?.data.price,
      }),
      setDescriptionValue(res?.data?.data?.description?.join("/"))
    });
  }, [idTerm]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPackageState({
      ...packageState,
      [name]: value,
    })
  }

  const addServiceMutation = useMutation({
    mutationFn: fetchUpdatePackage
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    addServiceMutation.mutate( {idTerm, payload: { ...packageState, description: descriptionValue.split('/').map(item => item.trim()) }}, {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success("Cập nhật gói dịch vụ thành công!")
          queryClient.invalidateQueries({ queryKey: ['GET_PACKAGE'] })
          setIsOpen(false)
        } else {
          toast.error("Cập nhật gói dịch vụ thất bại")
        }
      }
    })
  }
  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="fixed inset-0 bg-black opacity-70" onClick={() => setIsOpen(false)}></div>
      <div className="absolute z-50 left-[50%] translate-x-[30%] w-full bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cập nhật gói dịch vụ
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setIsOpen(false)}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên gói dịch vụ</label>
              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tên dịch vụ" required value={packageState.name} onChange={handleOnChange} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
              <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required value={packageState.price} onChange={handleOnChange} />
            </div>
            <div className="col-span-2">
              <div className="flex gap-2.5 items-center">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                <span className="mb-2 text-xs text-red-500">Mô tả cách nhau bởi dấu &quot;/&quot;</span>
              </div>
              <textarea id="description" name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập mô tả" value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)}></textarea>
            </div>
          </div>
          <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
            Cập nhật gói dịch vụ
          </button>
        </form>
      </div>
    </div>
  )
}

EditPackageModel.propTypes = {
  setIsOpen: PropTypes.any,
  idTerm: PropTypes.string
}

export default EditPackageModel