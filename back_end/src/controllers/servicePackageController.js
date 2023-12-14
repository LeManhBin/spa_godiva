import { Package } from "../models/PackageModel"

export const getAllPackage = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const pageNumber = parseInt(page); 
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber;
        const servicePackage = await Package.find({}).skip(startIndex).limit(limitNumber)
        const totalPage = await Package.countDocuments({})

        res.status(200).json({
            data: servicePackage,
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

export const getPackageById = async (req, res) => {
    try {
        const {id} = req.params;
        const servicePackage = await Package.findById(id);

        if(!servicePackage) {
            return res.status(404).json({
                message: 'Package not found'
            })
        }

        res.status(200).json({
            data: servicePackage,
            message: "Get service package"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createPackage = async (req, res) => {
    try {
        const {name, price, description} = req.body

        if(!name || !description || !price) {
            return res.status(400).json({
                message: 'Bad request'
            })
        }

        const servicePackage = await Package.create({
            name: name,
            description: description,
            price: price
        })

        res.status(200).json({
            data: servicePackage,
            message: 'Create package success'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const deletePackage = async (req, res) => {
    try {
        const {id} = req.params;
        const servicePackage = await Package.findById(id);

        if(!servicePackage) {
            return res.status(404).json({
                message: 'Package not found'
            })
        }

        const packageDeleted = await Package.deleteOne({_id: id})

        res.status(200).json({
            data: packageDeleted,
            message: 'Delete package success'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })  
    }
}

export const updatePackage = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, price} = req.body;
        
        const servicePackage = await Package.findById(id);

        if(!servicePackage) {
            return res.status(404).json({
                message: 'Package not found'
            })
        }

        if(!name || !description || !price) {
            return res.status(400).json({
                message: 'Bad request'
            })
        }

        const packageUpdated = await Package.findByIdAndUpdate({ _id: id }, {
            name: name,
            description: description,
            price: price,
        })

        res.status(200).json({
            data: packageUpdated,
            message: 'Update package success'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })  
    }
}
