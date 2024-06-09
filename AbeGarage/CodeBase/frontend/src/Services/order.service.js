// A function to send post request to create a new customer

const createOrder = async (formData, loggedInEmployeeToken) => {
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
    `http://localhost:8000/api/order`,
    requestOptions
  );
  return response;
};

// A function to send get request to get all customers
const getAllOrders = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/order`,
    requestOptions
  );
  return response;
};
const getOrderById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/order/${id}`,
    requestOptions
  );
  return response;
};

// Export all the functions
const orderService = {
  //   createCustomer,
  getAllOrders,
  createOrder,
  getOrderById,
  //   updateCustomer,
  //   getCustomerById,
  //   deleteCustomer,
};
export default orderService;
