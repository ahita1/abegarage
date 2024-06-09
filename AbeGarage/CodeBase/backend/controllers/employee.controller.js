// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
  // console.log(req.headers);
  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );
  const employee1 = req.body;
  const FullFilled = await employeeService.checkIfEmployeeFullFilled(employee1);
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else if (!FullFilled) {
    res.status(400).json({
      error: "All fields are required",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      console.log(employee);
      if (!employee) {
        res.status(400).json({
          error: "password must be atleast 8 characters",
        });
      } else {
        res.status(200).json({
          status: "true",
          message: "employee added successfully",
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
async function updateEmployee(req, res) {
  try {
    const {
      employee_id,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
    } = req.body;

    // Call the service to update the employee data
    const employeeupdate = await employeeService.updateEmployee(
      employee_id,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id
    );
    console.log(employeeupdate);

    if (!employeeupdate) {
      res.status(400).json({
        error: "the data is not exsists",
      });
    } else {
      res.status(200).json({
        message: "Employee updated successfully",
      });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete an employee by ID
async function deleteEmployee(req, res) {
  try {
    const employeeId = req.params.id;
    console.log(employeeId);

    // Call the service to delete the employee
    const employeeDelete = await employeeService.deleteEmployee(employeeId);
    console.log(employeeDelete);

    if (!employeeDelete) {
      res.status(400).json({
        error: "the data is not exsists",
      });
    } else {
      res.status(200).json({
        message: "Employee deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees! Please try again.",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "Employees retrieved successfully",
      data: employees,
    });
  }
}
//write the getEmployeeById controller
async function getEmployeeById(req, res, next) {
  const employeeId = req.params.id;
  const employee = await employeeService.getEmployeeById(employeeId);
  if (!employee) {
    res.status(400).json({
      error: "Failed to get the employee! Please try again.",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "Employee retrieved successfully",
      data: employee,
    });
  }
}

// Export the createEmployee controller
module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
};
