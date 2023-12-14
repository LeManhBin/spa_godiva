import express from "express";
import { createService, deleteService, getAllService, getServiceById, updateService } from "../controllers/serviceController";

const router = express.Router();

router.post('/service', createService);
router.get('/service', getAllService),
router.get('/service/:id', getServiceById),
router.delete('/service/:serviceId', deleteService)
router.put('/service/:serviceId', updateService)

export default router