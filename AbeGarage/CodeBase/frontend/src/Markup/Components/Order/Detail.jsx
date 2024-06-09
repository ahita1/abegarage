import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import orderService from "../../../Services/order.service";
import serviceService from "../../../Services/service.service";

function Detail() {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [, setApiError] = useState(false);
  const [, setApiErrorMessage] = useState(null);
  const location = useLocation();
  const orderId = location.state?.orderId;
  console.log(orderId);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrderById(orderId);
        if (!response.ok) {
          handleApiError(response.status);
          return;
        }
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          setOrderData(data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchOrders();
  }, []);
  const handleApiError = (statusCode) => {
    setApiError(true);
    switch (statusCode) {
      case 401:
        setApiErrorMessage("Please login again");
        break;
      case 403:
        setApiErrorMessage("You are not authorized to view this page");
        break;
      default:
        setApiErrorMessage("Please try again later");
    }
  };
  useEffect(() => {
    // Function to fetch service details
    const fetchServiceDetails = async (serviceId) => {
      try {
        const response = await serviceService.getServiceById(serviceId);
        if (!response.ok) {
          handleApiError(response.status);
          return;
        }
        const responseData = await response.json();
        // Store the fetched service details in state
        setServiceDetails((prevDetails) => ({
          ...prevDetails,
          [serviceId]: responseData.data,
        }));
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    // Loop through orderData and fetch service details for each service_id
    orderData.forEach((data) => {
      fetchServiceDetails(data.service_id);
    });
  }, [orderData]);
  console.log(serviceDetails);
  console.log(orderData);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginLeft: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align items to the left
          marginTop: "100px",
          fontSize: "20px",
        }}
      >
        <h1>Order Details</h1>
        {orderData.length > 0 && (
          <>
            <p>
              <strong>Order ID:</strong> {orderData[0].order_id}
            </p>
            <p>
              <strong>Order Date:</strong> {orderData[0].order_date}
            </p>
            <p>
              <strong>Order Status:</strong> {orderData[0].order_status}
            </p>
            <p>
              <strong>Order Hash:</strong> {orderData[0].order_hash}
            </p>
            <p>
              <strong>Order Total Price:</strong>{" "}
              {orderData[0].order_total_price}
            </p>
            <p>
              <strong>Order Estimated Completion Date:</strong>{" "}
              {orderData[0].estimated_completion_date}
            </p>
            <p>
              <strong>Order Completion Date:</strong>{" "}
              {orderData[0].completion_date}
            </p>
            <p>
              <strong>Order Additional Request:</strong>{" "}
              {orderData[0].additional_request}
            </p>
            <p>
              <strong>Order Notes For Internal Use:</strong>{" "}
              {orderData[0].notes_for_internal_use}
            </p>
            <p>
              <strong>Order Notes For Customer:</strong>{" "}
              {orderData[0].notes_for_customer}
            </p>
            <p>
              <strong>Order Employee First Name:</strong>{" "}
              {orderData[0].employee_first_name}
            </p>
            <p>
              <strong>Order Employee Last Name:</strong>{" "}
              {orderData[0].employee_last_name}
            </p>
            <p>
              <strong>Order Customer First Name:</strong>{" "}
              {orderData[0].customer_first_name}
            </p>
            <p>
              <strong>Order Customer Last Name:</strong>{" "}
              {orderData[0].customer_last_name}
            </p>
            <p>
              <strong>Order Vehicle Make:</strong> {orderData[0].vehicle_make}
            </p>
            <p>
              <strong>Order Vehicle Model:</strong> {orderData[0].vehicle_model}
            </p>
            <p>
              <strong>Order Vehicle Type:</strong> {orderData[0].vehicle_type}
            </p>
          </>
        )}
      </div>
      <div>
        <strong>The services are</strong>
      </div>
      {serviceDetails && (
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {Object.values(serviceDetails).map((service) => (
            <li key={service.service_id}>
              <strong>Service ID:</strong> {service.service_id}
              <br />
              <strong>Service Name:</strong> {service.service_name}
              <br />
              <strong>Service Description:</strong>{" "}
              {service.service_description}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Detail;
