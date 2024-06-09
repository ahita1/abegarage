// Import the express module
const express = require("express");

// Call the router method from express to create the router
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");

// Define routes
router.post("/api/vehicle", vehicleController.addVehicle);
router.get("/api/vehicle/:id", vehicleController.getVehicleById);
router.get(
  "/api/vehicles/:customer_id",
  vehicleController.getVehicleByCustomerId
);
router.put("/api/vehicle", vehicleController.updateVehicle);

// Export the router
module.exports = router;
