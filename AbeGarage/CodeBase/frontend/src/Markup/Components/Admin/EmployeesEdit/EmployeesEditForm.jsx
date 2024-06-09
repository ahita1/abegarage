import { useState } from "react";
import { useLocation } from "react-router-dom";
// import employee.service.js
import employeeService from "../../../../Services/employee.service";

function EmployeesEditForm() {
  const location = useLocation();
  const employeeData = location.state?.employeeData;
  console.log(employeeData);
  const [error_employee_first_name, setErrorFirstName] = useState("");
  const [error_employee_last_name, setErrorLastName] = useState("");
  const [error_employee_phone, setErrorPhoneNumber] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [employee_first_name, setFirstName] = useState(
    employeeData?.employee_first_name || ""
  );
  const [employee_id] = useState(employeeData?.employee_id || 0);
  const [employee_last_name, setLastName] = useState(
    employeeData?.employee_last_name || ""
  );
  const [employee_phone, setPhoneNumber] = useState(
    employeeData?.employee_phone || ""
  );
  const [isActive, setIsActive] = useState(
    employeeData?.active_employee || false
  );
  const [company_role_id, setCompany_role_id] = useState(
    employeeData?.company_role_id || 1
  );

  const handleCheckboxChange = (event) => {
    setIsActive(event.target.checked); // Update isActive state based on checkbox status
  };

  const handleSubmit = (e) => {
    const active_employee = isActive ? 1 : 0;
    console.log(active_employee);
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!employee_first_name) {
      setErrorFirstName("First name is required");
      valid = false;
    } else {
      setErrorFirstName("");
    }

    // Last name is required

    if (!employee_last_name) {
      setErrorLastName("Last name is required");
      valid = false;
    } else {
      setErrorLastName("");
    }

    // Phone number is required

    if (!employee_phone) {
      setErrorPhoneNumber("Phone number is required");
      valid = false;
    } else {
      setErrorPhoneNumber("");
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    const formData = {
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
      employee_id,
    };
    // Pass the form data to the service
    const updateEmployee = employeeService.updateEmployee(formData);
    updateEmployee
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess("Employee updated successfully");

          setServerError("");
          setTimeout(() => {
            setSuccess("");
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setIsActive(false);
          }, 2000);
        }
      })
      // Handle Catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit an employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <h3>
                        Employee Email:{employeeData?.employee_email || "N/A"}
                        <br />
                        Employee ID:{employeeData?.employee_id || "N/A"}
                      </h3>
                    </div>
                    {serverError && (
                      <div className="validation-error" role="alert">
                        {serverError}
                      </div>
                    )}
                    {success && (
                      <div className="validation-error" role="alert">
                        {success}
                      </div>
                    )}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        value={employee_first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="customer first name"
                      />
                    </div>
                    {error_employee_first_name && (
                      <div className="validation-error" role="alert">
                        {error_employee_first_name}
                      </div>
                    )}

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={employee_last_name}
                        name="employee_last_name"
                        placeholder="customer last name"
                        required
                      />
                    </div>
                    {error_employee_last_name && (
                      <div className="validation-error" role="alert">
                        {error_employee_last_name}
                      </div>
                    )}

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={employee_phone}
                        name="employee_phone"
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>
                    {error_employee_phone && (
                      <div className="validation-error" role="alert">
                        {error_employee_phone}
                      </div>
                    )}
                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        onChange={(e) => setCompany_role_id(e.target.value)}
                        value={company_role_id}
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="Check-box">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={handleCheckboxChange}
                        name="customer_phone"
                        placeholder="  Is Active Customer"
                        required
                      />
                      is active employee
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>update</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeesEditForm;
