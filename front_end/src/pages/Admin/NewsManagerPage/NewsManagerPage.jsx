import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pagination } from "antd"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchDeleteNews, fetchGetAllNews } from "../../../api/news.api"
import { IMAGE_URL } from "../../../constants/url"
import AddNewsModel from "./components/AddNewsModel"
import UpdateNewsModel from "./components/UpdateNewsModel"

export const NewsManagerPage = () => {
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

    const { data: newsData } = useQuery({
        queryKey: ["GET_NEWS", payload],
        queryFn: fetchGetAllNews,

    })

    const totalPage = newsData?.data?.pagination.total
    const currentPage = Number(newsData?.data?.pagination?.page)

    const handleChangePagination = (page) => {
        navigate(`/admin/news?page=${page}&limit=4`)
    }

    const deleteMutation = useMutation({
        mutationFn: (newsId) => fetchDeleteNews(newsId)
    })

    const handleConfirmDelete = (newsId) => {
        if (confirm("Bạn có chắc với thao tác này?") == true) {
            deleteMutation.mutate(newsId, {
                onSuccess: () => {
                    toast.success("Xoá thành công!")
                    queryClient.invalidateQueries({ queryKey: ['GET_NEWS'] })
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
                <AddNewsModel setIsOpen={setIsOpenAddModel} />
            }
            {
                isOpenEditModel &&
                <UpdateNewsModel setIsOpen={setIsOpenEditModel} idTerm={idTerm} />
            }
            <div className="flex justify-end w-full">
                <button className="px-2.5 py-1.5 bg-blue-500 rounded-md text-white mb-5 font-semibold" onClick={() => setIsOpenAddModel(true)}>Thêm mới</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Tiêu đề
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hình ảnh
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newsData?.data?.data.map((news) => {
                                return (
                                    <tr key={news._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {news.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            <img src={`${IMAGE_URL}/${news.image}`} alt="avatar" className="h-28" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center h-full gap-2.5">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleOpenModelEdit(news?._id)}>Chỉnh sửa</a>
                                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleConfirmDelete(news?._id)}>Xoá</a>
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
                <Pagination defaultCurrent={page} current={currentPage} defaultPageSize={3} total={totalPage} onChange={(page) => handleChangePagination(page)} />
            </div>
        </div>
    )
}
