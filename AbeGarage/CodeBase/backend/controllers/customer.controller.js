// emport customer service
customerService = require("../services/customer.service");
// Create the add customer controller
async function createCustomer(req, res, next) {
  // Check if customer email already exists in the database
  const customerExists = await customerService.checkIfCustomerExists(
    req.body.customer_email
  );
  const customer1 = req.body;
  const FullFilled = await customerService.checkIfCustomerFullFilled(customer1);
  // If customer exists, send a response to the client
  if (customerExists) {
    res.status(400).json({
      error: "This email address is already associated with another customer!",
    });
  } else if (FullFilled) {
    res.status(400).json({
      error: "All fields are required",
    });
  } else {
    try {
      const customerData = req.body;
      // Create the customer
      const customer = await customerService.createCustomer(customerData);
      if (!customer) {
        res.status(400).json({
          error: "Failed to add the customer!",
        });
      } else {
        res.status(200).json({
          status: "true",
          message: "Customer created successfully",
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
// Update a customer
async function updateCustomer(req, res) {
  try {
    const {
      customer_id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    } = req.body;

    // Call the service to update the customer data
    const customerupdate = await customerService.updateCustomer(
      customer_id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status
    );
    console.log(customerupdate);

    if (!customerupdate) {
      res.status(400).json({
        error: "Failed to update the customer!",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "Customer updated successfully",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}
//write a code for get customer by Id

async function getCustomerById(req, res) {
  try {
    const customer_id = req.params.id;
    const customer = await customerService.getCustomerById(customer_id);
    if (!customer) {
      res.status(400).json({
        error: "Failed to get the customer!",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "customer data is here",
        customer: customer,
      });
    }
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}
//write a code for get all customers

async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();
    if (!customers) {
      res.status(400).json({
        error: "Failed to get the customers!",
      });
    } else {
      res.status(200).json({
        status: "true",
        message: "customers data is here",
        customers: customers,
      });
    }
  } catch (error) {
    console.log(err);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function deleteCustomer(req, res) {
  try {
    const customerId = req.params.id;
    console.log(customerId);

    // Call the service to delete the employee
    const customerDelete = await customerService.deleteCustomer(customerId);
    console.log(customerDelete);

    if (!customerDelete) {
      res.status(400).json({
        error: "the data is not exsists",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Customer deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Export the controller
module.exports = {
  createCustomer,
  updateCustomer,
  getCustomerById,
  getAllCustomers,
  deleteCustomer,
};
