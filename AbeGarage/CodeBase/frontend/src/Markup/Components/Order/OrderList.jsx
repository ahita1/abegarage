import orderService from "../../../Services/order.service";
import serviceService from "../../../Services/service.service";
import { useEffect, useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

function OrderList() {
  const [service_description, setServiceDescription] = useState("");
  const [servicedescriptioError, setServiceDescriptionError] = useState("");
  const [internalUse, setInternalUse] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [estimateCompletion, setEstimateCompletion] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [customerNoteError, setCustomerNoteError] = useState("");
  const [internalUseError, setInternalUseError] = useState("");
  const [estimateCompletionError, setEstimateCompletionError] = useState("");
  const [completionDateError, setCompletionDateError] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderStatusError, setOrderStatusError] = useState("");

  const [price, setPrice] = useState("");
  // assign set state for errors also
  const [priceRequired, setPriceRequired] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]); // Use an array to store selected services
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!service_description) {
      setServiceDescriptionError("service description is required");
      valid = false;
    } else {
      setServiceDescriptionError("");
    }

    if (!price) {
      setPriceRequired("service Price is required");
      valid = false;
    } else {
      setPriceRequired("");
    }
    if (!customerNote) {
      setCustomerNoteError("customer note is required");
      valid = false;
    } else {
      setCustomerNoteError("");
    }

    if (!internalUse) {
      setInternalUseError("internal use is required");
      valid = false;
    } else {
      setInternalUseError("");
    }

    if (!estimateCompletion) {
      setEstimateCompletionError("estimate completion is required");
      valid = false;
    } else {
      setEstimateCompletionError("");
    }

    if (!completionDate) {
      setCompletionDateError("completion date is required");
      valid = false;
    } else {
      setCompletionDateError("");
    }

    if (!orderStatus) {
      setOrderStatusError("order status is required");
      valid = false;
    } else {
      setOrderStatusError("");
    }

    if (!valid) {
      // If the form is not valid, do not submit
      return;
    }
    const formData = {
      employee_id: 3,
      customer_id: 1,
      vehicle_id: 3,
      active_order: 1,
      order_total_price: price,
      estimated_completion_date: estimateCompletion,
      completion_date: completionDate,
      additional_request: service_description,
      notes_for_internal_use: internalUse,
      notes_for_customer: customerNote,
      additional_requests_completed: 1,
      services: selectedServices,
      order_status: orderStatus,
    };
    // Pass the form data to the service
    const newOrderService = orderService.createOrder(formData);
    newOrderService
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response

          console.log("The service order was created successfully");
          setSuccess("The service order was created successfully");

          setTimeout(() => {
            setSuccess("");
          }, 2000);
          setServerError("");
          setServiceDescription("");
          setPrice("");
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
    console.log(formData);
  };

  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  useEffect(() => {
    // Call the getAllEmployees function
    const allServices = serviceService.getAllService();
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
  }, []);

  const toggleServiceSelection = (service) => {
    const isSelected = selectedServices.some(
      (s) => s.service_id === service.service_id
    );

    let updatedServices = [];

    if (isSelected) {
      updatedServices = selectedServices.filter(
        (s) => s.service_id !== service.service_id
      );
    } else {
      // Add selected service with service_completed set to 1
      updatedServices = [
        ...selectedServices,
        { service_id: service.service_id, service_completed: 1 },
      ];
    }

    setSelectedServices(updatedServices);
  };

  console.log(selectedServices);

  return (
    <section className="services-section contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Choose Service</h2>
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
          services.map((service, index) => (
            <div className="eachService" key={index}>
              <h5>{service.service_name}</h5>
              <p>{service.service_description}</p>
              <div
                className="icons"
                onClick={() => toggleServiceSelection(service)}
              >
                {selectedServices.some(
                  (s) => s.service_id === service.service_id
                ) ? (
                  <MdCheckBox className="checkbox" />
                ) : (
                  <MdCheckBoxOutlineBlank className="checkbox" />
                )}
              </div>
            </div>
          ))
        )}

        <div className="eachService">
          <h5></h5>
          <p></p>
        </div>

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
                          {servicedescriptioError && (
                            <div className="validation-error" role="alert">
                              {servicedescriptioError}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            placeholder="Price"
                            type="text"
                            name="price"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                          ></input>
                          {priceRequired && (
                            <div className="validation-error" role="alert">
                              {priceRequired}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <p>Estimated Completion Date</p>
                          <input
                            type="date"
                            id="estimated_completion_date"
                            name="estimated_completion_date"
                            placeholder="Estimated Completion Date"
                            onChange={(event) =>
                              setEstimateCompletion(event.target.value)
                            }
                            value={estimateCompletion}
                          ></input>
                          {estimateCompletionError && (
                            <div className="validation-error" role="alert">
                              {estimateCompletionError}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <p>Completion Date</p>
                          <input
                            type="date"
                            id="completion_date"
                            name="completion_date"
                            onChange={(event) =>
                              setCompletionDate(event.target.value)
                            }
                            value={completionDate}
                            placeholder="Completion Date"
                          ></input>
                          {completionDateError && (
                            <div className="validation-error" role="alert">
                              {completionDateError}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <textarea
                            placeholder="notes for internal use"
                            name="notes_for_internal_use"
                            cols="30"
                            rows="10"
                            value={internalUse}
                            onChange={(event) =>
                              setInternalUse(event.target.value)
                            }
                          ></textarea>
                          {internalUseError && (
                            <div className="validation-error" role="alert">
                              {internalUseError}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-12">
                          <textarea
                            placeholder="notes for customer"
                            name="notes_for_customer"
                            cols="30"
                            rows="10"
                            value={customerNote}
                            onChange={(event) =>
                              setCustomerNote(event.target.value)
                            }
                          ></textarea>
                          {customerNoteError && (
                            <div className="validation-error" role="alert">
                              {customerNoteError}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            type="number"
                            id="order_status"
                            name="order_status"
                            onChange={(event) =>
                              setOrderStatus(event.target.value)
                            }
                            value={orderStatus}
                            placeholder="Order Status"
                          ></input>
                          {orderStatusError && (
                            <div className="validation-error" role="alert">
                              {orderStatusError}
                            </div>
                          )}
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
  );
}

export default OrderList;
