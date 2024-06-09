//write update customer form
import { useState } from "react";
import customerService from "../../../../Services/customer.service";
import { useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";

function CustomerEditForm() {
  const location = useLocation();
  const customerData = location.state?.customerData;
  console.log(customerData);
  // const [customer_first_name, setFirstName] = useState("");
  // const [customer_last_name, setLastName] = useState("");
  const [customer_id] = useState(3);
  const [isActive, setIsActive] = useState(false);
  // const [customer_phone_number, setPhoneNumber] = useState("");
  // const [active_customer_status, setActiveCustomerStatus] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const [customer_first_name, setFirstName] = useState(
    customerData?.customer_first_name || ""
  );
  const [customer_last_name, setLastName] = useState(
    customerData?.customer_last_name || ""
  );
  const [customer_phone_number, setPhoneNumber] = useState(
    customerData?.customer_phone_number || ""
  );

  const handlecheckboxchange = (e) => {
    setIsActive(e.target.checked);
  };

  const handleSubmit = (e) => {
    const active_customer_status = isActive ? 1 : 0;
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!customer_first_name) {
      setFirstName("customer first name is required");
      valid = false;
    } else {
      setFirstName("");
    }

    if (!customer_last_name) {
      setLastName("customer last name is required");
      valid = false;
    } else {
      setLastName("");
    }
    // Phone number is required
    if (!customer_phone_number) {
      setPhoneNumber("Phone number is required");
      valid = false;
    } else {
      setPhoneNumber("");
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    const formData = {
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
      customer_id,
    };
    // Pass the form data to the service
    const updatedCustomer = customerService.updateCustomer(formData);
    updatedCustomer
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response

          console.log("The customer was updated successfully");
          setSuccess("The customer was updated successfully");

          setTimeout(() => {
            setSuccess("");
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setIsActive(false);
          }, 2000);
        }
      });
  };
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit a customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <h3>customer Email:{customerData?.customer_email}</h3>
                    </div>
                    <div className="form-group col-md-12">
                      {success && <p style={{ color: "green" }}>{success}</p>}
                      {serverError && (
                        <p style={{ color: "red" }}>{serverError}</p>
                      )}
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="customer first name"
                      />
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
                        value={customer_phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        name="customer_phone"
                        placeholder="customer phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="Check-box">
                      <input
                        type="checkbox"
                        name="active_customer_status"
                        onChange={handlecheckboxchange}
                        checked={isActive}
                        required
                      />
                      <label className="textactive">
                        {" "}
                        <br />
                        This is active customer{" "}
                      </label>
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

export default CustomerEditForm;
