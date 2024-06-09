// import customer service
const serviceService = require("../services/service.service");
// Create the add service controller
async function createService(req, res, next) {
    // Check if service name already exists in the database
    const serviceExists = await serviceService.checkIfServiceExists(
        req.body.service_name
    );
    const service1 = req.body;
    const FullFilled = await serviceService.checkIfServiceFullFilled(service1);
    // If service exists, send a response to the client
    if (serviceExists) {
        res.status(400).json({
            error: "This service name is already exists!",
        });
    } else if (FullFilled) {
        res.status(400).json({
            error: "All fields are required",
        });
    } else {
        try {
            const serviceData = req.body;
            // Create the service
            const service = await serviceService.createService(serviceData);
            if (!service) {
                res.status(400).json({
                    error: "Failed to add the service!",
                });
            } else {
                res.status(200).json({
                    status: "true",
                    message: "Service created successfully",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: "Something went wrong!",
            });
        }
    }
}

// Update a service
async function updateService(req, res) {
    
    try {
         const {
            service_id,
            service_name,
            service_description
        
        } = req.body;
        // Call the service to update the service data
        const serviceupdate = await serviceService.updateService(
            service_id,
            service_name,
            service_description
        
        );
        if (!serviceupdate) {
            res.status(400).json({
                error: "Failed to update the service!",
            
            });
        } else {
            res.status(200).json({
                status: "true", 
                message: "Service updated successfully",
                data: serviceupdate,
            })
        
        }
    } catch (error) {
        console.log(err);
        res.status(400).json({
            error: "Something went wrong!",
        });
    }
}
// Get all services

async function getAllService(req, res) {
    try {
        
        const services = await serviceService.getAllService();
        if (!services) {
            
            res.status(400).json({
                
                error: "Failed to get the services!",
            });
        } else {
            
            res.status(200).json({
                
                status: "true",
                message: "Services fetched successfully",
                data: services,

            });
        }
    } catch (error) {
        
        console.log(error);
        res.status(400).json({
            error: "Something went wrong!",
        });
    }
}
// Get service by id

async function getServiceById(req, res) {
    
    try {
        
        const service_id = req.params.id;
        const service = await serviceService.getServiceById(service_id);
        if (!service) {
            
            res.status(400).json({
                
                error: "Failed to get the service!",
            });
        } else {
            
            res.status(200).json({
                
                status: "true",

                message: "Service fetched successfully",
                data: service,
            });
        }
    } catch (error) {
        
        console.log(error);
        res.status(400).json({
            error: "Something went wrong!",
        });                                                                                             
    }

}
module.exports = {
  createService,
  updateService,
  getAllService,
  getServiceById,
};