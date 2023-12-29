import express from 'express'
import { changeStatusCustomer, deleteCustomer, getAllCustomer, registerCustomer } from '../controllers/customerController'

const router = express.Router()

router.get('/customer', getAllCustomer)
router.get('/customer/:id', changeStatusCustomer)
router.post('/customer', registerCustomer)
router.delete('/customer/:id', deleteCustomer)

export default router