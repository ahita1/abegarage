// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
const installRouter = require("./install.routes");
const employeeRouter = require("./employee.routes");
const customerRouter = require("./customer.routes");
const loginRoutes = require("./login.routes");
const orderRoutes = require("./order.routes");
// Create routes
const vehicleRoutes = require("./vehicle.routes");
router.use(vehicleRoutes);
//import the service routes
const serviceRouter = require("./service.routes");
router.use(serviceRouter);

router.use(loginRoutes);
router.use(installRouter);
router.use(employeeRouter);
router.use(customerRouter);
router.use(orderRoutes);
// Import the login routes

router.use(installRouter);
router.use(employeeRouter);
router.use(loginRoutes);
// Export the router
module.exports = router;
