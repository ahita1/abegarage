// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module

async function checkIfVehicleExsists(serial) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ? ";
  const rows = await conn.query(query, [serial]);
  //   console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
async function checkIfVehicleFullFilled(vehicle1) {
  if (
    !vehicle1.vehicle_year ||
    !vehicle1.vehicle_make ||
    !vehicle1.customer_id ||
    !vehicle1.vehicle_type ||
    !vehicle1.vehicle_model ||
    !vehicle1.vehicle_mileage ||
    !vehicle1.vehicle_tag ||
    !vehicle1.vehicle_serial ||
    !vehicle1.vehicle_color
  ) {
    return true;
  }
  return false;
}

async function createVehicle(vehicle) {
  try {
    // if (employee.employee_password.length < 8) {
    //   return false;
    // }
    const query = `
  INSERT INTO customer_vehicle_info 
  (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, 
   vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    const rows = await conn.query(query, [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
    ]);
    console.log(rows);

    if (rows.affectedRows == 0) {
      return false;
    }
    return true;
    // construct to the employee object to return
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
}

async function updateVehicle(
  vehicle_id,
  vehicle_year,
  vehicle_make,
  vehicle_model,
  vehicle_type,
  vehicle_mileage,
  vehicle_tag,
  vehicle_serial,
  vehicle_color
) {
  try {
    const query =
      "SELECT * FROM customer_vehicle_info WHERE customer_vehicle_info.vehicle_id = ? ";
    const row = await conn.query(query, [vehicle_id]);
    console.log(row);

    if (row.length == 0) {
      return false;
    }

    const sql1 = `
  UPDATE customer_vehicle_info
  SET vehicle_year=?, vehicle_make=?, vehicle_model=?, vehicle_type=?, 
      vehicle_mileage=?, vehicle_tag=?, vehicle_serial=?, vehicle_color=?
  WHERE vehicle_id = ?`;

    const rows = await conn.query(sql1, [
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      vehicle_id, // Add vehicle_id as the last parameter
    ]);
    return true;
  } catch (error) {
    throw error;
  }
}

async function getVehicleById(VehicleId) {
  const query =
    "SELECT * FROM customer_vehicle_info  WHERE customer_vehicle_info.vehicle_id = ? ";
  const rows = await conn.query(query, [VehicleId]);
  if (rows.length == 0) {
    return false;
  }
  return rows;
}
async function getVehicleByCustomerId(VehicleCustomerId) {
  const query =
    "SELECT * FROM customer_vehicle_info WHERE customer_vehicle_info.customer_id = ?";
  const rows = await conn.query(query, [VehicleCustomerId]);

  if (rows.length === 0) {
    return false; // No data found
  }

  return rows; // Data exists, return the rows
}
module.exports = {
  checkIfVehicleExsists,
  checkIfVehicleFullFilled,
  createVehicle,
  getVehicleById,
  updateVehicle,
  getVehicleByCustomerId,
};
