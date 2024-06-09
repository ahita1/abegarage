// Import the necessary components
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the getAllEmployees function
import employeeService from "../../../../Services/employee.service";
import { useNavigate } from "react-router";

// Create the EmployeesList component
const EmployeesList = () => {
  const [successfulDelete, setSuccessfulDelete] = useState("");
  const navigate = useNavigate();
  // Create all the states we need to store the data
  // Create the employees state to store the employees data
  const [employees, setEmployees] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    // Call the getAllEmployees function
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);

          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          setEmployees(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  const handleEditClick = (employeeData) => {
    navigate("/admin/edit-employee", { state: { employeeData } });
    // setSelectedEmployee(employeeData);
  };
  const handleDeleteClick = (id) => {
    employeeService
      .deleteEmployee(id)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log(response.status);
          setApiError(true);
          if (response.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (response.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          if (data.error) {
            setApiError(true);
            setApiErrorMessage(data.error);
          } else if (data.message) {
            console.log(data.message);
            setSuccessfulDelete(data.message);

            // Success message received from the server
            // Perform any additional actions upon successful deletion
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setApiError(true);
        setApiErrorMessage("An error occurred while processing your request");
      });
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <>{successfulDelete && <h3>{successfulDelete}</h3>}</>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>
                        {format(
                          new Date(employee.added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <FaEdit
                            className="editsforemployees"
                            onClick={() => handleEditClick(employee)}
                            style={{ cursor: "pointer" }}
                          />

                          <MdDeleteOutline
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() =>
                              handleDeleteClick(employee.employee_id)
                            }
                            className="deleteforemployees"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </>
      )}
    </>
  );
};

// Export the EmployeesList component
export default EmployeesList;
