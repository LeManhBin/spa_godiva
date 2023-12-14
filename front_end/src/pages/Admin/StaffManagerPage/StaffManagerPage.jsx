import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchDeleteStaff, fetchGetAllStaff } from "../../../api/staff.api"
import { IMAGE_URL } from "../../../constants/url";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useState } from "react";
import { AddStaffModel } from "./components";

export const StaffManagerPage = () => {
  const [isOpenAddModel, setIsOpenAddModel] = useState(false)

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

  const {data: staffData} = useQuery({
    queryKey: ["GET_STAFF", payload],
    queryFn: fetchGetAllStaff
  })

  const totalPage = staffData?.data?.pagination.total
  const currentPage = Number(staffData?.data?.pagination?.page)

  const handleChangePagination = (page) => {
    navigate(`/admin/staff?page=${page}&limit=3`)
  }


  const deleteMutation = useMutation({
    mutationFn: (serviceId) => fetchDeleteStaff(serviceId)
  })

  const handleConfirmDelete = (id) => {
      if (confirm("Bạn có chắc với thao tác này?") == true) {
          deleteMutation.mutate(id, {
              onSuccess: () => {
                  toast.success("Xoá thành công!")
                  queryClient.invalidateQueries({ queryKey: ['GET_STAFF'] })
              }
          })
      } else {
        return 0
      }
  }

  return (
    <div>
      {
        isOpenAddModel &&
        <AddStaffModel setIsOpen={setIsOpenAddModel}/>
      }
      <div className="flex justify-end w-full">
        <button className="px-2.5 py-1.5 bg-blue-500 rounded-md text-white mb-5 font-semibold" onClick={() => setIsOpenAddModel(true)}>Thêm mới</button>
      </div>
      <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Tên nhân viên
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Hình ảnh
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Vị trí
                      </th>
                      <th scope="col" className="px-6 py-3">
                          ACTION
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  staffData?.data?.data.map((staff) => {
                    return(
                      <tr key={staff._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {staff?.name}
                        </th>
                        <td className="px-6 py-4">
                            <img src={`${IMAGE_URL}/${staff.avatar}`} alt="avatar" className="h-28"/>
                        </td>
                        <td className="px-6 py-4">
                            {staff?.position}
                        </td>
                        <td className="px-6 py-4">
                          <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleConfirmDelete(staff?._id)}>Xoá</a>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>
      </div>
      <div className="flex justify-center mt-5">
          <Pagination defaultCurrent={page} current={currentPage} defaultPageSize={3} total={totalPage} onChange={(page) => handleChangePagination(page)}/>    
      </div>
    </div>
  )
}
