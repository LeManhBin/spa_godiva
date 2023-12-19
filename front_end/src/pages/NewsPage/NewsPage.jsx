import { useQuery } from "@tanstack/react-query"
import { Banner, NewsCard } from "../../components"
import { fetchGetAllNews } from "../../api/news.api"
import useScrollToTop from "../../hooks/useScrollToTop"


export const NewsPage = () => {
  useScrollToTop()
  const { data: newsData } = useQuery({
    queryKey: ["GET_NEWS"],
    queryFn: fetchGetAllNews,
  })
  return (
    <div className="">
        <Banner banner="https://images.unsplash.com/photo-1563865436914-44ee14a35e4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Sự kiện của chúng tôi" from="Trang chủ" to="Tin tức"/>
        <section className="max-w-7xl mx-auto px-5 grid grid-cols-3 mt-20 gap-10 max-md:grid-cols-2 max-sm:grid-cols-1">
          {newsData?.data?.data?.map((news) => {
                return (
                  <NewsCard key={news._id} data={news}/>
                );
          })}
        </section>
    </div>
  )
}
