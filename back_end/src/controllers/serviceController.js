import { Service } from "../models/ServiceModel"

export const createService = async (req, res) => {
    try {
        const {name, description, priceBeforeDiscount, priceAfterDiscount} = req.body;

        if(!name || !description) {
            return res.status(400).json({
                message: 'Bad request'
            })
        }

        if(Number(priceBeforeDiscount) < Number(priceAfterDiscount)) {
            return res.status(400).json({
                message: 'The price before the promotion must be less than the price after the promotion'
            })
        }

        const service = await Service.create({
            name: name,
            description: description,
            priceBeforeDiscount: priceBeforeDiscount,
            priceAfterDiscount: priceAfterDiscount,
        })

        res.status(200).json({
            data: service,
            message: 'Create service success'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllService = async (req, res) => {
    try {
        const {page, limit} = req.query
        const pageNumber = parseInt(page); 
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber;

        const services = await Service.find({}).skip(startIndex).limit(limitNumber)
        const totalPage = await Service.countDocuments({})

        res.status(200).json({
            data: services,
            pagination: {
                page: page,
                total: totalPage
            },
            message: 'Create service success'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getServiceById = async (req, res) => {
    try {
        const {id} = req.params
        const service = await Service.findById(id)
        if(!service) {
            return res.status(404).json({
                message: 'Service not found'
            })
        }

        res.status(200).json({
            data: service,
            message: "Get service"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteService = async (req, res) => {
    try {
        const {serviceId} = req.params;
        const service = await Service.findById(serviceId);

        if(!service) {
            return res.status(404).json({
                message: 'Service not found'
            })
        }

        const serviceDeleted = await Service.deleteOne({_id: serviceId})

        res.status(200).json({
            data: serviceDeleted,
            message: 'Delete service success'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })  
    }
}

export const updateService = async (req, res) => {
    try {
        const {serviceId} = req.params;
        const {name, description, priceBeforeDiscount, priceAfterDiscount} = req.body;
        
        const service = await Service.findById(serviceId);

        if(!service) {
            return res.status(404).json({
                message: 'Service not found'
            })
        }

        if(!name || !description || !priceAfterDiscount) {
            return res.status(400).json({
                message: 'Bad request'
            })
        }

        const serviceUpdated = await Service.findByIdAndUpdate({ _id: serviceId }, {
            name: name,
            description: description,
            priceBeforeDiscount: priceBeforeDiscount,
            priceAfterDiscount: priceAfterDiscount,
        })

        res.status(200).json({
            data: serviceUpdated,
            message: 'Update service success'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })  
    }
}