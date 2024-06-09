// Import from the env
// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
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
    `http://localhost:8000/api/employee`,
    requestOptions
  );

  return response;
};
const updateEmployee = async (formData) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(
    `http://localhost:8000/api/employee`,
    requestOptions
  );

  return response;
};
// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `http://localhost:8000/api/employee`,
    requestOptions
  );
  return response;
};
const deleteEmployee = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(requestOptions);
  const response = await fetch(
    `http://localhost:8000/api/employee/${id}`,
    requestOptions
  );

  return response;
};

// Export all the functions
const employeeService = {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  deleteEmployee,
};
export default employeeService;
