import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pagination } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchDeleteCustomer, fetchGetAllCustomer, fetchGetCustomerById } from "../../../api/customer.api"
import { toast } from "react-toastify"

const CustomerManagerPage = () => {
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

  const {data: customerData} = useQuery({
    queryKey: ["GET_CUSTOMERS", payload],
    queryFn: fetchGetAllCustomer,
  })

  const totalPage = customerData?.data?.pagination?.total
  const currentPage = Number(customerData?.data?.pagination?.page)

  const handleChangePagination = (page) => {
    navigate(`/admin/customer?page=${page}&limit=5`)
  }

  const deleteMutation = useMutation({
    mutationFn: (customerId) => fetchDeleteCustomer(customerId)
  })

  const seenMutation = useMutation({
    mutationFn: (customerId) => fetchGetCustomerById(customerId)
  })

  const handleConfirmDelete = (customerId) => {
      if (confirm("Bạn có chắc với thao tác này?") == true) {
          deleteMutation.mutate(customerId, {
              onSuccess: () => {
                  toast.success("Xoá thành công!")
                  queryClient.invalidateQueries({ queryKey: ['GET_CUSTOMERS'] })
              }
          })
      } else {
        return 0
      }
  }

  const handleSeenCustomer = (customerId) => {
    seenMutation.mutate(customerId, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_CUSTOMERS'] })
        }
    })
  }
  return (
    <div>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end items-center gap-2.5 w-full px-10 mb-10 font-bold">
                Thông báo chưa đọc: <p className="text-red-500 text-lg">{customerData?.data?.data.filter((item) => item?.status == 0).length}</p>
            </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="">
                      <th scope="col" className="px-6 py-3">
                          Tên khách hàng
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Số điện thoại
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Lời nhắn
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  customerData?.data?.data.map((customer) => {
                    return(
                      <tr key={customer?._id} className={`${customer?.status == 0 && 'font-bold'}`}>
                        <th className="px-6 py-4">
                            {customer?.name}
                        </th>
                        <td className="px-6 py-4 max-w-[500px]">
                            {customer.phoneNumber}
                        </td>
                        <td className="px-6 py-4">
                            {customer.email}
                        </td>
                        <td className="px-6 py-4">
                            {customer.message}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center h-full gap-2.5">
                            <input type="checkbox" checked={customer?.status} onClick={() => handleSeenCustomer(customer?._id)}/>
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleConfirmDelete(customer?._id)}>Xoá</a>
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

export default CustomerManagerPage