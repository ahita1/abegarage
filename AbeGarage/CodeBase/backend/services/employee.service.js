// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  //   console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
async function checkIfEmployeeFullFilled(employee1) {
  if (
    !employee1.active_employee ||
    !employee1.company_role_id ||
    !employee1.employee_email ||
    !employee1.employee_password ||
    !employee1.employee_first_name ||
    !employee1.employee_last_name ||
    !employee1.employee_phone
  ) {
    return true;
  }
}

async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    if (employee.employee_password.length < 8) {
      return false;
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    // console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}

async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}

// Update employee data
async function updateEmployee(
  employee_id,
  employee_first_name,
  employee_last_name,
  employee_phone,
  active_employee,
  company_role_id
) {
  try {
    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_id = ?";
    const row = await conn.query(query, [employee_id]);
    console.log(row);

    if (row.length == 0) {
      return false;
    }
    const sql1 = `
      UPDATE employee
      SET active_employee = ?
      WHERE employee_id = ?`;
    const rows = await conn.query(sql1, [active_employee, employee_id]);

    const sql2 = `
      UPDATE employee_info
      SET 
      employee_first_name = ?,
      employee_last_name = ?,
      employee_phone = ?
      WHERE employee_id = ?`;

    const rows1 = await conn.query(sql2, [
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_id,
    ]);

    const sql3 = `
      UPDATE employee_role
      SET company_role_id = ?
      WHERE employee_id = ?`;
    const rows2 = await conn.query(sql3, [company_role_id, employee_id]);

    return true;
  } catch (error) {
    throw error;
  }
}

// Delete an employee by ID
async function deleteEmployee(employeeId) {
  try {
    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_id = ?";
    const row = await conn.query(query, [employeeId]);
    console.log(row);

    if (row.length == 0) {
      return false;
    }

    // Delete the employee's info, password, and role entries
    await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [
      employeeId,
    ]);
    await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [
      employeeId,
    ]);

    // Finally, delete the employee
    await conn.query("DELETE FROM employee WHERE employee_id = ?", [
      employeeId,
    ]);

    return true;
  } catch (error) {
    // If any error occurs, rollback the transaction

    console.error("Error deleting employee:", error);
    throw error; // Re-throw the error to handle it in the calling code, if necessary
  }
}

async function getAllEmployees() {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;
}
// write getEmployeeById function
async function getEmployeeById(employeeId) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_id = ?";
  const rows = await conn.query(query, [employeeId]);
  if (rows.length !== 1) {
    return false;
  }
  return rows;
}

module.exports = {
  checkIfEmployeeExists,
  checkIfEmployeeFullFilled,
  createEmployee,
  checkIfEmployeeFullFilled,
  getEmployeeByEmail,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
};
