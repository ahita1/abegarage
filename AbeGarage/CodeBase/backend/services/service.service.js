// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

async function checkIfServiceExists(service_name) {
    const query = "SELECT * FROM common_services WHERE service_name = ?";
    const rows = await conn.query(query, [service_name]);
    if (rows.length > 0) {
    return true;
  }
  return false;
}   
async function checkIfServiceFullFilled(service1) {
    if (!service1.service_name || !service1.service_description ) {
        return true;
    }
}
// write function for create service
async function createService(service) {
    let createdService = {};
    try {
        
        const query = "INSERT INTO common_services (service_name,service_description) VALUES (?,?)";
        const rows = await conn.query(query, [
            service.service_name,
            service.service_description,
     
        ]);
        if (rows.affectedRows !== 1) {
            return false;


        }
        const service_id = rows.insertId;
        createdService = {
            service_id: service_id,
            service_name: service.service_name,
            service_description: service.service_description,

           
        };
        }
    catch (error) {
        console.log(error);
        return false;


    }
        
    return createdService;

}

async function getServiceById(service_id) {
    const query = "SELECT * FROM common_services WHERE service_id = ?";
    const rows = await conn.query(query, [service_id]);
    if (rows.length > 0) {
        return rows[0];
    }
    return false;
}

async function getAllService() {
    const query = "SELECT * FROM common_services";
    const rows = await conn.query(query);
    if (rows.length > 0) {
        return rows;
    }
    return null;
}

async function updateService(service_id, service_name, service_description) {
    try {
        const query = "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?";
        const rows = await conn.query(query, [service_name, service_description,service_id]);
        if (rows.affectedRows !== 1) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
    }
module.exports = {
    checkIfServiceExists,
    checkIfServiceFullFilled,
    createService,
    getServiceById,
    getAllService,
    updateService,
};
