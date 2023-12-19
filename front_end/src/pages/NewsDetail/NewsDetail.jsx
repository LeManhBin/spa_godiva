import { useParams } from "react-router-dom"
import { Banner } from "../../components"
import { useQuery } from "@tanstack/react-query"
import { fetchNewsById } from "../../api/news.api"
import { IMAGE_URL } from "../../constants/url"
import useScrollToTop from "../../hooks/useScrollToTop"

export const NewsDetail = () => {
  useScrollToTop()
  const {id} = useParams()

  const {data: newsDetailData} = useQuery({
    queryKey: ["GET_NEWS_BY_ID", id],
    queryFn: () => fetchNewsById(id)
  })

  console.log(newsDetailData);
  return (
    <div className="">
        <Banner banner="https://images.unsplash.com/photo-1563865436914-44ee14a35e4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Sự kiện của chúng tôi" from="Trang chủ" to="Tin tức"/>
        <section className="max-w-7xl mx-auto px-5 mt-20">
            <p className='text-[#F47F40] tracking-widest font-medium mb-5'>MAY 23, 2022</p>
            <img src={`${IMAGE_URL}/${newsDetailData?.data?.data?.image}`} alt=""  className="max-h-[600px] object-cover"/>
            <h1 className='cormorant-font text-2xl font-medium my-5'>{newsDetailData?.data?.data?.title}</h1>
            <p className="montserrat-font" dangerouslySetInnerHTML={{ __html: newsDetailData?.data?.data?.content }}></p>
        </section>
    </div>
  )
}
