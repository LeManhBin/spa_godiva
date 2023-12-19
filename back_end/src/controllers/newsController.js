import { News } from "../models/NewsModel"
import { uploadImage } from "../services/uploadImage"

export const getAllNews = async (req, res) => {
    try {
        const {page, limit} = req.query
        const pageNumber = parseInt(page); 
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber;

        const news = await News.find({}).sort({ createdAt: -1 }).skip(startIndex).limit(limitNumber)
        const totalPage = await News.countDocuments({})

        res.status(200).json({
            data: news,
            pagination: {
                page: page,
                total: totalPage
            },
            message: "Get news success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getNewsById = async (req, res) => {
    try {
        const {id} = req.params
        const news = await News.findById(id)

        if(!news) {
            return res.status(404).json({
                message: "News not found"
            })
        }
        res.status(200).json({
            data: news,
            message: "Get news success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteNews = async (req, res) => {
    try {
        const {id} = req.params;
        const news = await News.findById(id)

        if(!news) {
            return res.status(404).json({
                message: "News not found"
            })
        }

        const newsDeleted = await News.deleteOne({_id: id})

        res.status(200).json({
            data: newsDeleted,
            message: "Delete news success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} 

export const CreateNews = async (req, res) => {
    try {
        uploadImage.single("image")(req, res, async (err) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" });
            }
            const {title, content} = req.body
            const { filename } = req.file;
            
            if (!filename) {
              return res.status(400).json({ message: "Không tìm thấy ảnh tải lên" });
            }
      
            const news = await News.create({
              title: title,
              content: content,
              image: filename,
            });
            res
              .status(200)
              .json({ data: news, message: "Thành công" });
          });
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

export const updateNews = async (req, res) => {
    try {
        uploadImage.single("image")(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" });
            }

            const { id } = req.params;
            const news = await News.findById(id);

            if (!news) {
                return res.status(404).json({ message: "News not found" });
            }

            const { title, content } = req.body;
            let updatedImage = news.image;
            if (req.file) {
                const { filename } = req.file;
                updatedImage = filename; 
            }

            const newsUpdated = await News.findByIdAndUpdate(
                { _id: id },
                {
                    title: title,
                    content: content,
                    image: updatedImage,
                },
                { new: true } 
            );

            res.status(200).json({ data: newsUpdated, message: "Thành công" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};