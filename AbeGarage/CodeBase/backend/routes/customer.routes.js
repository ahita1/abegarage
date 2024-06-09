// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const customerController = require("../controllers/customer.controller");
// Import middleware Customer

// Create a route to handle the add employee request on post
router.post("/api/customer", customerController.createCustomer);
router.put("/api/customer", customerController.updateCustomer);
router.get("/api/customer/:id", customerController.getCustomerById);
router.get("/api/customer", customerController.getAllCustomers);
router.delete("/api/customer/:id", customerController.deleteCustomer);
module.exports = router;
