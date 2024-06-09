import { useState } from "react";
//import add customer.service.js
import addCustomerService from "../../../../Services/customer.service";

function AddCustomer() {
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_email, setEmail] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  const [active_customer_status] = useState(1);
  //errors
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    var valid = true; // Flag
    // First name is required
    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    // Email is required
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }

      // If the form is not valid, do not submit
      if (!valid) {
        return;
      }
      const formData = {
        customer_email,
        customer_first_name,
        customer_last_name,
        customer_phone_number,
        active_customer_status,
      };
      // Pass the form data to the service
      const newCustomer = addCustomerService.createCustomer(
        formData,
        loggedInEmployeeToken
      );
      newCustomer
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          // If Error is returned from the API server, set the error message
          if (data.error) {
            setServerError(data.error);
          } else {
            // Handle successful response

            console.log("The customer was created successfully");
            setSuccess("The customer was created successfully");

            setTimeout(() => {
              setSuccess("");
              setEmail("");
              setFirstName("");

              setLastName("");
              setPhoneNumber("");
              
            }, 2000);

            setServerError("");
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
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {success && <p style={{ color: "green" }}>{success}</p>}
                      {serverError && (
                        <p style={{ color: "red" }}>{serverError}</p>
                      )}
                      <input
                        type="email"
                        name="customer_email"
                        value={customer_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="customer email"
                      />
                      {emailError && (
                        <p style={{ color: "red" }}>{emailError}</p>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="customer first name"
                      />
                      {firstNameRequired && (
                        <p style={{ color: "red" }}>{firstNameRequired}</p>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={customer_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="customer last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={customer_phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add customer</span>
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

export default AddCustomer;
