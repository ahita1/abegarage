import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import serviceService from "../../../../Services/service.service";
function ServiceProvided() {
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  // assign set state for errors also
  const [serviceNameRequired, setServiceNameRequired] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  let loggedInEmployeeToken = "";
  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!service_name) {
      setServiceNameRequired("service name is required");
      valid = false;
    } else {
      setServiceNameRequired("");
    }

    if (!service_description) {
      setServiceNameRequired("service description is required");
      valid = false;
    } else {
      setServiceNameRequired("");
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    const formData = {
      service_name,
      service_description,
    };
    // Pass the form data to the service
    const newService = serviceService.createService(
      formData,
      loggedInEmployeeToken
    );
    newService
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response

          console.log("The service was created successfully");
          setSuccess("The service was created successfully");

          setTimeout(() => {
            setSuccess("");
          }, 2000);

          setServerError("");
          setServiceName("");
          setServiceDescription("");
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

  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  useEffect(() => {
    // Call the getAllEmployees function
    const allServices = serviceService.getAllService();
    console.log(allServices);
    allServices
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
          setServices(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [service_name]);

  return (
    <>
      <section className="services-section contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Service We Provide</h2>
            <p>
              Bring to the Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laudantium culpa harum eligendi nobis nulla repudiandae a
              inventore!!
            </p>
          </div>
          {apiError ? (
            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>{apiErrorMessage}</h2>
                </div>
              </div>
            </section>
          ) : (
            services.map((service) => (
              // eslint-disable-next-line react/jsx-key
              <div className="eachService">
                <h5>{service.service_name}</h5>
                <p>{service.service_description}</p>
                <div className="icons">
                  <FaEdit className="edit" />
                  <MdDeleteOutline />
                </div>
              </div>
            ))
          )}

          <section
            style={{ backgroundColor: "white" }}
            className="contact-section"
          >
            <div className="auto-container">
              <div className="contact-title">
                <h2>Add a new service</h2>
              </div>
              <div className="row clearfix">
                <div className="form-column col-lg-9">
                  <div className="inner-column">
                    <div className="contact-form">
                      <form onSubmit={handleSubmit}>
                        <div className="row clearfix">
                          <div className="form-group col-md-12">
                            {serverError && (
                              <div className="validation-error" role="alert">
                                {serverError}
                              </div>
                            )}

                            <h4> {success}</h4>

                            <input
                              type="text"
                              name="service_name"
                              placeholder="Service Name"
                              value={service_name}
                              onChange={(event) =>
                                setServiceName(event.target.value)
                              }
                            />
                            {serviceNameRequired && (
                              <div className="validation-error" role="alert">
                                {serviceNameRequired}
                              </div>
                            )}
                          </div>

                          <div className="form-group col-md-12">
                            <textarea
                              placeholder="service description"
                              name="service_description"
                              cols="30"
                              rows="10"
                              value={service_description}
                              onChange={(event) =>
                                setServiceDescription(event.target.value)
                              }
                            ></textarea>
                          </div>

                          <div className="form-group col-md-12">
                            <button
                              className="theme-btn btn-style-one"
                              type="submit"
                              data-loading-text="Please wait..."
                            >
                              <span>Add Service</span>
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
        </div>
      </section>
    </>
  );
}

export default ServiceProvided;
