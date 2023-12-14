import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDeletePackage, fetchGetAllPackage } from "../../../api/package.api";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { convertMoneyToVND } from "../../../constants/convertMoney";
import { toast } from "react-toastify";
import { useState } from "react";
import { AddNewPackageModal, EditPackageModel } from "./components";

export const ServicePackageMangerPage = () => {
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
    page,
    limit
  }
  const {data: packageData} = useQuery({
    queryKey: ["GET_PACKAGE", payload],
    queryFn: fetchGetAllPackage,
  })

  const totalPage = packageData?.data?.pagination.total
  const currentPage = Number(packageData?.data?.pagination?.page)

  const handleChangePagination = (page) => {
    navigate(`/admin/service-package?page=${page}&limit=5`)
  }

  const deleteMutation = useMutation({
    mutationFn: (packageId) => fetchDeletePackage(packageId)
})

  const handleConfirmDelete = (packageId) => {
      if (confirm("Bạn có chắc với thao tác này?") == true) {
          deleteMutation.mutate(packageId, {
              onSuccess: () => {
                  toast.success("Xoá thành công!")
                  queryClient.invalidateQueries({ queryKey: ['GET_PACKAGE'] })
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
        <AddNewPackageModal setIsOpen={setIsOpenAddModel}/>
      }
      {
        isOpenEditModel && 
        <EditPackageModel setIsOpen={setIsOpenEditModel} idTerm={idTerm}/>
      }
      <div className="flex justify-end w-full">
        <button className="px-2.5 py-1.5 bg-blue-500 rounded-md text-white mb-5 font-semibold" onClick={() => setIsOpenAddModel(true)}>Thêm mới</button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên gói
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Giá
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              packageData?.data?.data?.map((pack) => {
                return(
                  <tr key={pack?._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {pack?.name}
                    </th>
                    <td className="px-6 py-4">
                      {
                        pack?.description.join(" - ")
                      }
                    </td>
                    <td className="px-6 py-4">{convertMoneyToVND(pack?.price)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center h-full gap-2.5">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleOpenModelEdit(pack?._id)}>Chỉnh sửa</a>
                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleConfirmDelete (pack?._id)}>Xoá</a>
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
  );
};
