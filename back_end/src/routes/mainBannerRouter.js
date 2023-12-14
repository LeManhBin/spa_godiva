import express from 'express';
import { createBanner, getBanner, updateBanner } from '../controllers/mainBannerController';
const router = express.Router();

router.get('/main-banner', getBanner);
router.post('/main-banner', createBanner);
router.put('/main-banner/:id', updateBanner);

export default router