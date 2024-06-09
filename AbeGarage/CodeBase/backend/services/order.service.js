const conn = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

async function checkIfOrderFullFilled(order) {
  if (
    !order.employee_id ||
    !order.customer_id ||
    !order.vehicle_id ||
    !order.active_order ||
    !order.order_total_price ||
    !order.estimated_completion_date ||
    !order.completion_date ||
    !order.additional_request ||
    !order.notes_for_internal_use ||
    !order.notes_for_customer ||
    !order.additional_requests_completed ||
    !order.services || // Corrected: Check if services array exists
    !order.order_status
  ) {
    return true;
  }
  return false;
}

async function createOrder(order) {
  let createdOrder = {};
  try {
    // Generate UUID v4 for order_hash
    const order_hash = uuidv4();

    // Insert the order into the orders table
    const query =
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?, ?, ?, ?, ?)";
    const rows = await conn.query(query, [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      order.active_order,
      order_hash, // Use generated UUID for order_hash
    ]);

    // Check if the order was successfully inserted
    if (rows.affectedRows !== 1) {
      return false;
    }

    // Get the order_id from the insert
    const order_id = rows.insertId;
    // Insert additional information into the order_info table
    const query2 =
      "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      order_id,
      order.order_total_price,
      order.estimated_completion_date,
      order.completion_date,
      order.additional_request,
      order.notes_for_internal_use,
      order.notes_for_customer,
      order.additional_requests_completed,
    ]);

    // Insert services associated with the order into the order_services table
    for (const service of order.services) {
      const query3 =
        "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";
      const rows3 = await conn.query(query3, [
        order_id,
        service.service_id,
        service.service_completed,
      ]);
    }

    // Insert order status into the order_status table
    const query4 =
      "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [order_id, order.order_status]);

    // Construct the order object to return
    createdOrder = {
      order_id: order_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the order object
  return createdOrder;
}

async function getAllOrders() {
  const query =
    "SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id INNER JOIN order_status ON orders.order_id = order_status.order_id INNER JOIN employee_info ON orders.employee_id=employee_info.employee_id INNER JOIN customer_info ON orders.customer_id=customer_info.customer_id INNER JOIN customer_vehicle_info ON orders.vehicle_id=customer_vehicle_info.vehicle_id ORDER BY orders.order_id ASC ";
  const rows = await conn.query(query);
  return rows;
}
async function getOrderById(orderId) {
  const query =
    "SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id INNER JOIN order_status ON orders.order_id = order_status.order_id INNER JOIN employee_info ON orders.employee_id=employee_info.employee_id INNER JOIN customer_info ON orders.customer_id=customer_info.customer_id INNER JOIN customer_vehicle_info ON orders.vehicle_id=customer_vehicle_info.vehicle_id WHERE orders.order_id = ?";
  const rows = await conn.query(query, [orderId]);
  // console.log(rows);
  if (rows.length == 0) {
    return false;
  }
  return rows;
}

async function deleteOrder(orderId) {
  try {
    const query =
      "SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id INNER JOIN order_status ON orders.order_id = order_status.order_id INNER JOIN employee_info ON orders.employee_id=employee_info.employee_id INNER JOIN customer_info ON orders.customer_id=customer_info.customer_id INNER JOIN customer_vehicle_info ON orders.vehicle_id=customer_vehicle_info.vehicle_id WHERE orders.order_id = ?";
    const row = await conn.query(query, [orderId]);
    console.log(row);

    if (row.length == 0) {
      return false;
    }

    // Delete the employee's info, password, and role entries
    await conn.query("DELETE FROM order_info WHERE order_id = ?", [orderId]);
    await conn.query("DELETE FROM order_services WHERE order_id = ?", [
      orderId,
    ]);
    await conn.query("DELETE FROM order_status WHERE order_id = ?", [orderId]);

    // Finally, delete the employee
    await conn.query("DELETE FROM orders WHERE order_id = ?", [orderId]);

    return true;
  } catch (error) {
    // If any error occurs, rollback the transaction

    console.error("Error deleting order:", error);
    throw error; // Re-throw the error to handle it in the calling code, if necessary
  }
}

module.exports = {
  checkIfOrderFullFilled,
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
};

//  "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";

// SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id INNER JOIN order_status ON orders.order_id = order_status.order_id ORDER BY orders.order_id DESC limit 10

// SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id INNER JOIN order_status ON orders.order_id = order_status.order_id ORDER BY orders.order_id DESC limit 10

// INNER JOIN employee_info ON orders.employee_id=employee_info.employee_id INNER JOIN customer_info ON orders.customer_id=customer_info.customer_id INNER JOIN customer_vehicle_info ON orders.vehicle_id=customer_vehicle_info.vehicle_id
