import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import vehicleService from "../../../../Services/vehicle.service";

function AddVehicleForm() {
  const [customerVehicles, setCustomerVehicles] = useState([]);
  const location = useLocation();
  const customerData = location.state?.customerData;
  const [vehicle_year, setVehicleYear] = useState("");
  const [customer_id] = useState(customerData?.customer_id);
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [vehicle_yearError, setVehicleYearError] = useState("");
  const [vehicle_makeError, setVehicleMakeError] = useState("");
  const [vehicle_modelError, setVehicleModelError] = useState("");
  const [vehicle_colorError, setVehicleColorError] = useState("");
  const [vehicle_tagError, setVehicleTagError] = useState("");
  const [vehicle_serialError, setVehicleSerialError] = useState("");
  const [vehicle_typeError, setVehicleTypeError] = useState("");
  const [vehicle_mileageError, setVehicleMileageError] = useState("");

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    if (!vehicle_year) {
      setVehicleYearError("Vehicle year is required");
      valid = false;
    } else {
      setVehicleYearError("");
    }

    if (!vehicle_make) {
      setVehicleMakeError("Vehicle make is required");
      valid = false;
    } else {
      setVehicleMakeError("");
    }

    if (!vehicle_model) {
      setVehicleModelError("Vehicle model is required");
      valid = false;
    } else {
      setVehicleModelError("");
    }

    if (!vehicle_color) {
      setVehicleColorError("Vehicle color is required");
      valid = false;
    } else {
      setVehicleColorError("");
    }

    if (!vehicle_tag) {
      setVehicleTagError("Vehicle tag is required");
      valid = false;
    } else {
      setVehicleTagError("");
    }

    if (!vehicle_serial) {
      setVehicleSerialError("Vehicle serial is required");
      valid = false;
    } else {
      setVehicleSerialError("");
    }

    if (!vehicle_type) {
      setVehicleTypeError("Vehicle type is required");
      valid = false;
    } else {
      setVehicleTypeError("");
    }

    if (!vehicle_mileage) {
      setVehicleMileageError("Vehicle mileage is required");
      valid = false;
    } else {
      setVehicleMileageError("");
    }

    if (!valid) {
      return;
    }
    const formData = {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_color,
      vehicle_tag,
      vehicle_serial,
      vehicle_type,
      vehicle_mileage,
      customer_id,
    };
    // Pass the form data to the service
    const newVehicle = vehicleService.createVehicle(formData);
    newVehicle
      .then((response) => response.json())
      .then((data) => {
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess("Vehicle added successfully");
          setServerError("");
          // Redirect to the employees page after 2 seconds
          // // For now, just redirect to the home page
          // setTimeout(() => {
          //   window.location.href = "/admin/employees";
          //   // window.location.href = '/';
          // }, 2000);
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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Fetch vehicles data from your API
        const response = await vehicleService.getVehicleByCustomerId(
          customerData.customer_id
        );
        if (!response.status === "success") {
          throw new Error("Failed to fetch vehicles");
        }
        setCustomerVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // setApiError(true);
        // setApiErrorMessage("Failed to fetch vehicles. Please try again later.");
      }
    };

    fetchVehicles();
  }, []);
  console.log(customerVehicles);
  return (
    <div className="contact-title">
      {customerData ? (
        <>
          <h2>
            Customer: {customerData.customer_first_name}
            {customerData.customer_last_name}
          </h2>
          <div className="customer-info">
            <h6>Email: {customerData.customer_email || "N/A"}</h6>
            <h6>Phone Number: {customerData.customer_phone_number || "N/A"}</h6>
            <h6>
              Active Customer:{" "}
              {customerData.active_customer_status ? "Yes" : "No"}
            </h6>
            <h6>Edit Customer info:</h6>
          </div>
        </>
      ) : (
        <>
          <h2>No Customer Selected</h2>
          <p>
            Please go to the <Link to="admin/customers">Customers</Link> page
            and select a customer.
          </p>
        </>
      )}
      <h2>Vehicles of {customerData?.customer_first_name}</h2>
      {customerVehicles && customerVehicles.length > 0 ? (
        customerVehicles.map((vehicle) => (
          <div key={vehicle.vehicle_id}>
            <p>Vehicles Make Year: {vehicle.vehicle_year}</p>
            <p>Vehicle Make: {vehicle.vehicle_make}</p>
            <p>Vehicle Model: {vehicle.vehicle_model}</p>
            <p>Vehicle Color: {vehicle.vehicle_color}</p>
            <p>Vehicle Type: {vehicle.vehicle_type}</p>
            <p>Vehicle Mileage: {vehicle.vehicle_mileage}</p>
          </div>
        ))
      ) : (
        <div className="row clearfix">
          <div className="form-column col-lg-12">
            <div className="inner-column">
              <div className="contact-form">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="service_name"
                    placeholder="No vehicles found"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          width: "80%",
        }}
        className="contact-section"
      >
        <div className="auto-container">
          <div className="contact-title">
            <h2>Add a new Vehicle</h2>
          </div>
          <div className="row clearfix">
            <div className="form-column col-lg-10">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
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
                          onChange={(e) => setVehicleYear(e.target.value)}
                          value={vehicle_year}
                          type="text"
                          name="vehicle_year"
                          placeholder="Vehicle year"
                        />
                      </div>
                      {vehicle_yearError && (
                        <div className="validation-error" role="alert">
                          {vehicle_yearError}
                        </div>
                      )}

                      <div className="form-group col-md-12">
                        <input
                          onChange={(e) => setVehicleMake(e.target.value)}
                          value={vehicle_make}
                          type="text"
                          name="vehicle_make"
                          placeholder="Vehicle make"
                        />
                      </div>
                      {vehicle_makeError && (
                        <div className="validation-error" role="alert">
                          {vehicle_makeError}
                        </div>
                      )}

                      <div className="form-group col-md-12">
                        <input
                          onChange={(e) => setVehicleModel(e.target.value)}
                          value={vehicle_model}
                          type="text"
                          name="vehicle_model"
                          placeholder="Vehicle model"
                        />
                      </div>
                      {vehicle_modelError && (
                        <div className="validation-error" role="alert">
                          {vehicle_modelError}
                        </div>
                      )}

                      <div className="form-group col-md-12">
                        <input
                          onChange={(e) => setVehicleMileage(e.target.value)}
                          value={vehicle_mileage}
                          type="text"
                          name="vehicle_mileage"
                          placeholder="Vehicle mileage"
                        />
                      </div>
                      {vehicle_mileageError && (
                        <div className="validation-error" role="alert">
                          {vehicle_mileageError}
                        </div>
                      )}

                      <div className="form-group col-md-12">
                        <input
                          onChange={(e) => setVehicleType(e.target.value)}
                          value={vehicle_type}
                          type="text"
                          name="vehicle_type"
                          placeholder="Vehicle type"
                        />
                      </div>
                      {vehicle_typeError && (
                        <div className="validation-error" role="alert">
                          {vehicle_typeError}
                        </div>
                      )}

                      <div className="form-group col-md-12">
                        <input
                          onChange={(e) => setVehicleTag(e.target.value)}
                          value={vehicle_tag}
                          type="text"
                          name="vehicle_tag"
                          placeholder="Vehicle tag"
                        />
                      </div>
                      {vehicle_tagError && (
                        <div className="validation-error" role="alert">
                          {vehicle_tagError}
                        </div>
                      )}
                      <div className="form-group col-md-12">
                        <input
                          onChange={(e) => setVehicleSerial(e.target.value)}
                          value={vehicle_serial}
                          type="text"
                          name="vehicle_serial"
                          placeholder="Vehicle serial"
                        />
                      </div>
                      {vehicle_serialError && (
                        <div className="validation-error" role="alert">
                          {vehicle_serialError}
                        </div>
                      )}

                      <div className="form-group col-md-12">
                        <input
                          onChange={(e) => setVehicleColor(e.target.value)}
                          value={vehicle_color}
                          type="text"
                          name="vehicle_color"
                          placeholder="Vehicle color"
                        />
                      </div>
                      {vehicle_colorError && (
                        <div className="validation-error" role="alert">
                          {vehicle_colorError}
                        </div>
                      )}

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Add Vehicle</span>
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
      <h2>Orders of {customerData?.customer_first_name}</h2>
      <p>Orders will be displayed here</p>
    </div>
  );
}

export default AddVehicleForm;
