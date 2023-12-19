
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { fetchCreateNews } from '../../../../api/news.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AddNewsModel = ({setIsOpen}) => {
    const queryClient = useQueryClient()

    const [newsState, setNewsState] = useState({
        title: "",
        image: null,
    })

    const [content, setContent] = useState('');


    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setNewsState({
            ...newsState,
            [name]: value
        })
    }

    const addServiceMutation = useMutation({
        mutationFn: fetchCreateNews
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('title', newsState.title)
        formData.append('image', newsState.image)
        formData.append('content', content)
        addServiceMutation.mutate(formData, {
            onSuccess: (res) => {
                if(res.status === 200) {
                    toast.success("Thêm tin tức thành công!")
                    queryClient.invalidateQueries({ queryKey: ['GET_NEWS'] })
                    setIsOpen(false)
                }else {
                    toast.error("Thêm tin tức thất bại")
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
                    Thêm mới tin tức
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setIsOpen(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                        <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nhập tiêu đề tin tức" required value={newsState.title} onChange={handleOnChange} />
                    </div>
                    <div className="col-span-2">
                        <div className="flex gap-2.5 items-center">
                            <label htmlFor="upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh</label>
                        </div>
                        <input type="file" id='upload' onChange={(e) => setNewsState({...newsState, image: e.target.files[0]})}/>
                    </div>
                    <div className="col-span-2 h-[300px]">
                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung</label>
                        <ReactQuill theme="snow" className='h-[240px]' placeholder="Nhập nội dung" value={content} onChange={setContent} />              
                    </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Thêm tin tức
                </button>
            </form>
        </div>
    </div>
  )
}

AddNewsModel.propTypes = {
    setIsOpen: PropTypes.any
}

export default AddNewsModel