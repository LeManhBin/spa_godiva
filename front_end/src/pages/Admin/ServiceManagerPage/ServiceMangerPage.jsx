import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchDeleteService, fetchGetAllService } from "../../../api/service.api"
import { useLocation, useNavigate } from "react-router-dom"
import { Pagination } from "antd"
import { toast } from "react-toastify"
import { convertMoneyToVND } from "../../../constants/convertMoney"
import { useState } from "react"
import { AddServiceModel } from "./components"
import UpdateServiceModel from "./components/UpdateServiceModel"

export const ServiceMangerPage = () => {
  const [isOpenAddModel, setIsOpenAddModel] = useState(false)
  const [isOpenEditModel, setIsOpenEditModel] = useState(false)
  const [idTerm, setIdTerm] = useState(null)
  const queryClient = useQueryClient()
  const query = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(query.search);
  // const token = localStorage.getItem("token")
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const payload = {
      page: page,
      limit: limit,
  }

  const {data: serviceData} = useQuery({
    queryKey: ["GET_SERVICES", payload],
    queryFn: fetchGetAllService,

  })

  const totalPage = serviceData?.data?.pagination.total
  const currentPage = Number(serviceData?.data?.pagination?.page)

  const handleChangePagination = (page) => {
    navigate(`/admin/service?page=${page}&limit=5`)
  }

  const deleteMutation = useMutation({
    mutationFn: (serviceId) => fetchDeleteService(serviceId)
  })

  const handleConfirmDelete = (serviceId) => {
      if (confirm("Bạn có chắc với thao tác này?") == true) {
          deleteMutation.mutate(serviceId, {
              onSuccess: () => {
                  toast.success("Xoá thành công!")
                  queryClient.invalidateQueries({ queryKey: ['GET_SERVICES'] })
              }
          })
      } else {
        return 0
      }
  }

  const handleOpenModelEdit = (id) => {
    setIsOpenEditModel(true)
    setIdTerm(id)
  }

  return (
    <div>
      {
        isOpenAddModel &&
        <AddServiceModel setIsOpen={setIsOpenAddModel}/>
      }
      {
        isOpenEditModel &&
        <UpdateServiceModel setIsOpen={setIsOpenEditModel} idTerm={idTerm}/>
      }
      <div className="flex justify-end w-full">
        <button className="px-2.5 py-1.5 bg-blue-500 rounded-md text-white mb-5 font-semibold" onClick={() => setIsOpenAddModel(true)}>Thêm mới</button>
      </div>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="">
                      <th scope="col" className="px-6 py-3">
                          Tên dịch vụ
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Mô tả dịch vụ
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Giá trước khuyễn mãi
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Giá sau khuyến mãi
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  serviceData?.data?.data.map((service) => {
                    return(
                      <tr key={service?._id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {service?.name}
                        </th>
                        <td className="px-6 py-4 max-w-[500px]">
                            {service.description}
                        </td>
                        <td className="px-6 py-4">
                            {
                              convertMoneyToVND(service.priceBeforeDiscount)
                            }
                        </td>
                        <td className="px-6 py-4">
                            {
                              convertMoneyToVND(service.priceAfterDiscount)
                            }
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center h-full gap-2.5">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleOpenModelEdit(service?._id)}>Chỉnh sửa</a>
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleConfirmDelete(service?._id)}>Xoá</a>
                          </div>
                        </td>
                    </tr>
                    )
                  })
                }
              </tbody>
          </table>
      </div>
      <div className="flex justify-center mt-5">
          <Pagination defaultCurrent={page} current={currentPage} defaultPageSize={5} total={totalPage} onChange={(page) => handleChangePagination(page)}/>    
      </div>
    </div>

  )
}
