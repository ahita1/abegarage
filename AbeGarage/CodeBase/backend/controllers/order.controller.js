// Import the employee service
const orderService = require("../services/order.service");
// Create the add employee controller
async function createOrder(req, res, next) {
  // console.log(req.headers);
  // Check if employee email already exists in the database
  //   const employeeExists = await employeeService.checkIfEmployeeExists(
  //     req.body.employee_email
  //   );
  // const order = req.body;
  // const FullFilled = await orderService.checkIfOrderFullFilled(order);
  const order = req.body;
  console.log("Received order:", order); // Log the received order
  const FullFilled = await orderService.checkIfOrderFullFilled(order);
  console.log("Is order full filled?", FullFilled); // Log the result of checkIfOrderFullFilled
  // If employee exists, send a response to the client
  //   if (employeeExists) {
  //     res.status(400).json({
  //       error: "This email address is already associated with another employee!",
  //     });
  //   }
  if (FullFilled) {
    res.status(400).json({
      error: "All fields are required",
    });
  } else {
    try {
      const orderData = req.body;
      // Create the employee
      const order = await orderService.createOrder(orderData);
      console.log(order);
      if (!order) {
        res.status(400).json({
          error: "order is not created",
        });
      } else {
        res.status(200).json({
          status: "true",
          message: "order added successfully",
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

// Update an employee
// Delete an employee by ID
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    console.log(orderId);

    // Call the service to delete the employee
    const orderDelete = await orderService.deleteOrder(orderId);
    console.log(orderDelete);

    if (!orderDelete) {
      res.status(400).json({
        error: "the data is not exsists",
      });
    } else {
      res.status(200).json({
        message: "Order deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllOrders(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const orders = await orderService.getAllOrders();
  // console.log(employees);
  if (!orders) {
    res.status(400).json({
      error: "Failed to get the order! Please try again.",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "orders retrieved successfully",
      orders: orders,
    });
  }
}
//write the getEmployeeById controller
async function getOrderById(req, res, next) {
  const orderId = req.params.id;
  const order = await orderService.getOrderById(orderId);
  console.log(order);
  if (!order) {
    res.status(400).json({
      error: "There is no order found in this request",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "Order retrieved successfully",
      data: order,
    });
  }
}

// Export the createEmployee controller
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  //   updateEmployee,
  //   deleteEmployee,
  //   getAllEmployees,
  //   getEmployeeById,
};
