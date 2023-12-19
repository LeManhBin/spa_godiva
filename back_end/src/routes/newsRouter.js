import express from 'express'
import { CreateNews, deleteNews, getAllNews, getNewsById, updateNews } from "../controllers/newsController"

const router = express.Router()

router.get('/news', getAllNews)
router.get('/news/:id', getNewsById)
router.post('/news', CreateNews)
router.delete('/news/:id', deleteNews)
router.put('/news/:id', updateNews)

export default router