// A function to send post request to create a new customer

const createCustomer = async (formData, loggedInEmployeeToken) => {
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
    `http://localhost:8000/api/customer`,
    requestOptions
  );
  return response;
};

// A function to send get request to get all customers
const getAllCustomers = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/customer`,
    requestOptions
  );
  return response;
};

// a function to update the customer
const updateCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(
    `http://localhost:8000/api/customer`,
    requestOptions
  );
  return response;
};
// a function to get the customer by id
const getCustomerById = async (id, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  console.log(requestOptions);
  const response = await fetch(
    `http://localhost:8000/api/customer/${id}`,
    requestOptions
  );
  return response;
};
// a function to delete the customer
const deleteCustomer = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(requestOptions);
  const response = await fetch(
    `http://localhost:8000/api/customer/${id}`,
    requestOptions
  );
  return response;
};

// Export all the functions
const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  getCustomerById,
  deleteCustomer,
};
export default customerService;
