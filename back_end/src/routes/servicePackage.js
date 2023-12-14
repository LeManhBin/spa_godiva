import express from 'express'
import { createPackage, deletePackage, getAllPackage, getPackageById, updatePackage } from '../controllers/servicePackageController'

const router = express.Router()

router.get('/package', getAllPackage)
router.get('/package/:id', getPackageById)
router.post('/package', createPackage)
router.delete('/package/:id', deletePackage)
router.put('/package/:id', updatePackage)

export default router