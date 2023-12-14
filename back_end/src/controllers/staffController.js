import { Staff } from "../models/StaffModel"
import { uploadImage } from "../services/uploadImage";

export const getAllStaff = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const pageNumber = parseInt(page); 
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber; 
        const staff = await Staff.find({}).skip(startIndex).limit(limitNumber);
        const totalPage = await Staff.countDocuments({})

        res.status(200).json({
            data: staff,
            message: "success",
            pagination: {
                page: page,
                total: totalPage
            }
        })  
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getStaffById = async (req, res) => {
    try {
        const {id} = req.params
        const staff = await Staff.findById(id);
        if(!staff) {
            return res.status(404).json({
                message: "Staff not found"
            })  
        }
        res.status(200).json({
            data: staff,
            message: "success"
        })  
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createStaff = async (req, res) => {
    try {
        uploadImage.single('avatar')(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" });
            }

            const {name, position} = req.body;
            const { filename } = req.file;

            if(!name || !position) {
                return res.status(400).json({ message: "Bad request" });
            }

            if (!filename) {
              return res.status(400).json({ message: "Không tìm thấy ảnh tải lên" });
            }

            const staff = await Staff.create({
                name: name,
                position: position,
                avatar: filename
            })
            
            res.status(200).json({
                data: staff,
                message: "Create staff success"
            })
            
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteStaff = async (req, res) => {
    try {
        const {id} = req.params;
        const staff = await Staff.findById(id)

        if(!staff) {
            return res.status(404).json({
                message: "Staff not found"
            })
        }

        const staffDeleted = await Staff.deleteOne({_id: id})

        res.status(200).json({
            data: staffDeleted,
            message: "Delete staff success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}