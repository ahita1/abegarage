import { useLocation } from "react-router-dom";
import VehicleListForm from "../Admin/VehicleListForm/VehicleListForm";
import { useState } from "react";
function Second() {
  const location = useLocation();
  const customerData = location.state?.customerData;
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create a new Order</h2>
        </div>
      </div>
      <div className="customer-info">
        <h3>
          Customer:
          {`${customerData?.customer_first_name} ${customerData?.customer_last_name}` ||
            customerData?.customer_first_name}
        </h3>
        <h6>Email: {customerData?.customer_email || "N/A"}</h6>
        <h6>Phone Number: {customerData?.customer_phone_number || "N/A"}</h6>
        <h6>
          Active Customer: {customerData?.active_customer_status ? "Yes" : "No"}
        </h6>
        <h6>Edit Customer info:</h6>
      </div>
      <VehicleListForm id={customerData?.customer_id} data={customerData} />
    </section>
  );
}

export default Second;
