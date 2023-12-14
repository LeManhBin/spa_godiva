import express from "express"
import { createStaff, deleteStaff, getAllStaff, getStaffById } from "../controllers/staffController"

const router = express.Router()

router.get("/staff", getAllStaff)
router.get("/staff/:id", getStaffById)
router.post("/staff", createStaff)
router.delete("/staff/:id", deleteStaff)
router.put("/staff/:id")

export default router