// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const orderController = require("../controllers/order.controller");
// Import middleware

// Create a route to handle the add employee request on post
router.post("/api/order", orderController.createOrder);
router.get("/api/order", orderController.getAllOrders);
// router.put("/api/employee", employeeController.updateEmployee);
router.delete("/api/order/:id", orderController.deleteOrder);
// router.get("/api/employee", employeeController.getAllEmployees);
router.get("/api/order/:id", orderController.getOrderById);
module.exports = router;
