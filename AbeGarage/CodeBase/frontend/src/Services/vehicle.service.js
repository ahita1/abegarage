// A function to send the login request to the server
const createVehicle = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  console.log("About to send request");
  console.log(requestOptions.body);
  const response = await fetch(
    `http://localhost:8000/api/vehicle `,
    requestOptions
  );
  return response;
};

const getVehicleById = async (vehicleId) => {
  const response = await fetch(
    `http://localhost:8000/api/vehicle/${vehicleId}`
  );
  return response.json();
};

const getVehicleByCustomerId = async (customerId) => {
  const response = await fetch(
    `http://localhost:8000/api/vehicles/${customerId}`
  );
  return response.json();
};

const vehicleService = {
  createVehicle,
  getVehicleById,
  getVehicleByCustomerId,
};

export default vehicleService;
