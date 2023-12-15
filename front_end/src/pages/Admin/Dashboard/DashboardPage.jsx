import { useQuery } from "@tanstack/react-query"
import { fetchGetAllPackage } from "../../../api/package.api"
import { fetchGetAllService } from "../../../api/service.api"
import { fetchGetAllStaff } from "../../../api/staff.api"

export const DashboardPage = () => {
  const {data: packageData} = useQuery({
    queryKey: ["GET_PACKAGE"],
    queryFn: fetchGetAllPackage
  })
  const {data: serviceData} = useQuery({
    queryKey: ["GET_SERVICES"],
    queryFn: fetchGetAllService
  })
  const {data: staffData} = useQuery({
    queryKey: ["GET_STAFF"],
    queryFn: fetchGetAllStaff
  })
  return (
    <div>
      <div className="grid  grid-cols-3 gap-5">
        <div className="px-5 py-5 border-2 rounded-md flex flex-col gap-2">
          <p className="font-medium text-gray-500">Gói dịch vụ</p>
          <h1 className="text-3xl font-semibold">{packageData?.data?.data.length}</h1>
        </div>
        <div className="px-5 py-5 border-2 rounded-md flex flex-col gap-2">
          <p className="font-medium text-gray-500">Dịch vụ</p>
          <h1 className="text-3xl font-semibold">{serviceData?.data?.data.length}</h1>
        </div>
        <div className="px-5 py-5 border-2 rounded-md flex flex-col gap-2">
          <p className="font-medium text-gray-500">Nhân viên</p>
          <h1 className="text-3xl font-semibold">{staffData?.data?.data.length}</h1>
        </div>
      </div>
    </div>
  )
}
