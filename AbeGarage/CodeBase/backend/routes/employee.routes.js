// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controller");
// Import middleware

// Create a route to handle the add employee request on post
router.post("/api/employees", employeeController.createEmployee);

router.put("/api/employee", employeeController.updateEmployee);
router.delete("/api/employee/:id", employeeController.deleteEmployee);
router.get("/api/employee", employeeController.getAllEmployees);
router.get("/api/employee/:id", employeeController.getEmployeeById);
module.exports = router;
