// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the service controller
const serviceController = require("../controllers/service.controller");
// Import middleware

// Create a route to handle the add Service request on post

router.post("/api/service", serviceController.createService);
router.put("/api/service", serviceController.updateService);
router.get("/api/service", serviceController.getAllService);
router.get("/api/service/:id", serviceController.getServiceById);
module.exports = router;
