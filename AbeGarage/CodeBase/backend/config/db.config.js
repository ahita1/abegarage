// Prepare connection parameters we use to connect to the database
const mysql = require("mysql2/promise");
const dbConfig = {
  connectionLimit: 10,
  password: process.env.PASSWORD,
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.NAME,
};
const pool = mysql.createPool(dbConfig);
// Function to check the database connection
async function checkDatabaseConnection() {
  try {
    // Attempt to get a connection from the pool
    const connection = await pool.getConnection();
    // Execute a simple query to check the connection
    await connection.execute("SELECT 1");
    // Release the connection back to the pool
    connection.release();
    console.log("Database is connected successfully.");
  } catch (error) {
    // Log any errors
    console.error("Database is not connected:", error);
  }
}
// Call the function to check the database connection
checkDatabaseConnection();

// Create the connection pool
// Attempt to connect to the database and log the result

// Prepare a function that will execute the SQL queries asynchronously
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}
// Export the query function for use in the application
module.exports = { query };
