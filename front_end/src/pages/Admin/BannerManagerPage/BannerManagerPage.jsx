import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchGetBanner, fetchUpdateBanner } from "../../../api/banner.api"
import { IMAGE_URL } from "../../../constants/url";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HiCloudUpload } from "react-icons/hi";

export const BannerManagerPage = () => {
  const queryClient = useQueryClient()
  const [bannerFile, setBannerFile] = useState(null)
  const {data: bannerData} = useQuery({
    queryKey: ["GET_BANNER"],
    queryFn: fetchGetBanner,
  })

  const bannerMutation = useMutation({
    mutationFn: fetchUpdateBanner
  })

  const handleOnChange = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setBannerFile(file)
    e.target.value = null
  }

  useEffect(() => {
    return () => {
       bannerFile && URL.revokeObjectURL(bannerFile.preview)
    }
  },[bannerFile])

  const handleSubmit = (id) => {
    if(!bannerFile) {
      toast.error("Vui lòng chọn hình ảnh ")
    }
    const formData = new FormData()
    formData.append("banner", bannerFile)
    bannerMutation.mutate({id ,formData}, {
        onSuccess: (res) => {
            if(res.status === 200) {
                toast.success("Cập nhật hình ảnh thành công!")
                queryClient.invalidateQueries({ queryKey: ['GET_BANNER'] })
            }else {
                toast.error("Cập nhật hình ảnh thất bại")
            }
          }
      })
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full h-[500px]">
        <img src={`${bannerFile?.preview ? bannerFile.preview : `${IMAGE_URL}/${bannerData?.data?.data[0].image}`}`} alt="banner"  className="w-full h-full object-cover"/>
      </div>
      <div>
        <input type="file" id="upload" className="hidden" onChange={handleOnChange }/>
        <label htmlFor="upload" className="flex items-center justify-between border rounded-md w-40 px-2.5 cursor-pointer py-1.5">
          <span>Chọn ảnh</span>
          <HiCloudUpload size={20}/>
        </label>
      </div>
      <button className="px-2.5 py-1.5 bg-blue-500 text-white rounded-md font-semibold" onClick={() => handleSubmit(bannerData?.data?.data[0]._id)}>Chỉnh sửa</button>
    </div>
  )
}
