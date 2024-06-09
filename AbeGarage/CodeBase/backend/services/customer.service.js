// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ? ";
  const rows = await conn.query(query, [email]);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

async function checkIfCustomerFullFilled(customer1) {
  if (
    !customer1.customer_email ||
    !customer1.customer_first_name ||
    !customer1.customer_last_name ||
    !customer1.customer_phone_number ||
    !customer1.active_customer_status
  ) {
    return true;
  }
}
async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    // Insert the email in to the customer table
    const query =
      "INSERT INTO customer_identifier(customer_email,customer_phone_number) VALUES (?,?)";
    const rows = await conn.query(query, [
      customer.customer_email,
      customer.customer_phone_number,
    ]);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the customer id from the insert
    const customer_id = rows.insertId;
    // Insert the remaining data in to the customer_info table
    const query2 =
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name,active_customer_status) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
    ]);
    if (rows2.affectedRows !== 1) {
      return false;
    }
    createdCustomer = {
      customer_id: customer_id,
      customer_email: customer.customer_email,
      customer_first_name: customer.customer_first_name,
      customer_last_name: customer.customer_last_name,
      customer_phone: customer.customer_phone,
    };
    return createdCustomer;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateCustomer(
  customer_id,
  customer_first_name,
  customer_last_name,
  customer_phone_number,
  active_customer_status
) {
  try {
    const query =
      "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
    const row = await conn.query(query, [customer_id]);
    console.log(row);

    if (row.length == 0) {
      return false;
    }

    const sql1 = `
      UPDATE customer_identifier
      SET customer_phone_number = ?
      WHERE customer_id = ?`;
    const rows = await conn.query(sql1, [customer_phone_number, customer_id]);

    const sql2 = `
      UPDATE customer_info
      SET customer_first_name = ?, 
      customer_last_name = ?, 
      active_customer_status = ?
      WHERE customer_id = ?`;

    const rows1 = await conn.query(sql2, [
      customer_first_name,
      customer_last_name,
      active_customer_status,
      customer_id,
    ]);

    return true;
  } catch (error) {
    throw error;
  }
}
//get customer by Id
async function getCustomerById(customer_id) {
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
  const rows = await conn.query(query, [customer_id]);
  if (rows.length !== 1) {
    return false;
  }
  return rows;
}
//write a code for get all customers
async function getAllCustomers() {
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id";
  const rows = await conn.query(query);
  if (rows.length == 0) {
    return false;
  }
  return rows;
}

async function deleteCustomer(customerId) {
  try {
    const query =
      "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id INNER JOIN customer_vehicle_info ON customer_identifier.customer_id = customer_vehicle_info.customer_id WHERE customer_identifier.customer_id = ?";
    const row = await conn.query(query, [customerId]);
    console.log(row);

    if (row.length == 0) {
      return false;
    }

    // Delete the employee's info, password, and role entries
    await conn.query("DELETE FROM customer_info WHERE customer_id = ?", [
      customerId,
    ]);
    await conn.query(
      "DELETE FROM customer_vehicle_info WHERE customer_id = ?",
      [customerId]
    );

    // Finally, delete the employee
    await conn.query("DELETE FROM customer_identifier WHERE customer_id = ?", [
      customerId,
    ]);

    return true;
  } catch (error) {
    // If any error occurs, rollback the transaction

    console.error("Error deleting customer:", error);
    throw error; // Re-throw the error to handle it in the calling code, if necessary
  }
}
module.exports = {
  checkIfCustomerExists,
  checkIfCustomerFullFilled,
  createCustomer,
  updateCustomer,
  getCustomerById,
  getAllCustomers,
  deleteCustomer,
};
