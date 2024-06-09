// A function to send post request to create a new service

const createService = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(
    `http://localhost:8000/api/service`,
    requestOptions
  );
  return response;
};

// A function to send get request to get all services
const getAllService = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/service`,
    requestOptions
  );
  console.log(response);
  return response;
};
const getServiceById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/service/${id}`,
    requestOptions
  );
  console.log(response);
  return response;
};

// Export all the functions
const serviceService = {
  createService,
  getAllService,
  getServiceById,
};
export default serviceService;
