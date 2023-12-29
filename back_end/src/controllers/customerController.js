import { Customer } from "../models/CustomerModel"

export const registerCustomer = async (req, res) => {
    try {
        const {name, email, phoneNumber, message} = req.body

        if(!name || !email || !phoneNumber) {
            return res.status(400).json({
                message: "Bad request"
            })
        }

        const newCustomer = await Customer.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            message: message
        })

        res.status(200).json({
            data: newCustomer,
            message: "Success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllCustomer = async(req, res) => {
    try {
        const {page, limit} = req.query
        const pageNumber = parseInt(page); 
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber;
        const customers = await Customer.find({}).sort({ createdAt: -1 }).skip(startIndex).limit(limitNumber)
        const totalPage = await Customer.countDocuments({})
        res.status(200).json({
            data: customers,
            message: "Success",
            pagination: {
                page: page,
                total: totalPage
            },
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const changeStatusCustomer = async (req, res) => {
    try {
        const {id} = req.params
        const customer = await Customer.findById(id)
        if(!customer) {
            res.status(404).json({
                message: "Customer not found"
            })
        }
        const newStatus = await Customer.findByIdAndUpdate({_id: id}, {status: 1}, { new: true }) 
        
        res.status(200).json({
            data: newStatus,
            message: "Success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const {id} = req.params
        const customer = await Customer.findById(id)
        if(!customer) {
            res.status(404).json({
                message: "Customer not found"
            })
        }
        const customerDeleted = await Customer.deleteOne({_id: id})
        
        res.status(200).json({
            data: customerDeleted,
            message: "Success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}