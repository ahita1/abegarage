// Import the employee service
const vehicleService = require("../services/vehicle.service");
// Create the add employee controller
async function addVehicle(req, res, next) {
  // console.log(req.headers);
  // Check if employee email already exists in the database
  const vehicleExists = await vehicleService.checkIfVehicleExsists(
    req.body.vehicle_serial
  );
  const vehicle1 = req.body;
  const FullFilled = await vehicleService.checkIfVehicleFullFilled(vehicle1);
  // If employee exists, send a response to the client
  if (vehicleExists) {
    res.status(400).json({
      error: "This vehicle serial is already associated with another vehicle!",
    });
  } else if (FullFilled) {
    res.status(400).json({
      error: "All fields are required",
    });
  } else {
    try {
      const vehicleData = req.body;
      // Create the employee
      const vehicle = await vehicleService.createVehicle(vehicleData);
      console.log(vehicle);
      if (!vehicle) {
        res.status(400).json({
          error: "Failed to add the vehicle!",
        });
      } else {
        res.status(200).json({
          status: "true",
          message: "vehicle added successfully",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}
async function getVehicleById(req, res, next) {
  const VehicleId = req.params.id;
  const vehiclee = await vehicleService.getVehicleById(VehicleId);
  if (!vehiclee) {
    res.status(400).json({
      error: "Failed to get the vehicle! Please try again.",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "Vehicle retrieved successfully",
      data: vehiclee,
    });
  }
}

async function getVehicleByCustomerId(req, res, next) {
  const VehicleCustomerId = req.params.customer_id;
  const vehicleeCustomer = await vehicleService.getVehicleByCustomerId(
    VehicleCustomerId
  );
  console.log(vehicleeCustomer);
  if (!vehicleeCustomer) {
    res.status(400).json({
      error: "Failed to get the vehicle! Please try again.",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "Vehicle retrieved successfully",
      data: vehicleeCustomer,
    });
  }
}

async function updateVehicle(req, res) {
  try {
    const {
      vehicle_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    } = req.body;

    // Call the service to update the employee data
    const vehicleupdate = await vehicleService.updateVehicle(
      vehicle_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color
    );
    console.log(vehicleupdate);

    if (!vehicleupdate) {
      res.status(400).json({
        error: "the data is not exsists",
      });
    } else {
      res.status(200).json({
        message: "Vehicle updated successfully",
      });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  addVehicle,
  getVehicleById,
  updateVehicle,
  getVehicleByCustomerId,
};
