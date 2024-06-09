import { useLocation } from "react-router-dom";

function CustomerProfileForm() {
  const location = useLocation();
  const customerData = location.state?.customerData;
  return (
    <div className="contact-title">
      <h2>Customer:{customerData?.customer_first_name}</h2>
      <div className="customer-info">
        <h6>Email: {customerData?.customer_email || "N/A"}</h6>
        <h6>Phone Number: {customerData?.customer_phone_number || "N/A"}</h6>
        <h6>
          Active Customer: {customerData?.active_customer_status ? "Yes" : "No"}
        </h6>
        <h6>Edit Customer info:</h6>
      </div>

      <h2>Vehicles of {customerData?.customer_first_name}</h2>
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
      <h2>Orders of {customerData?.customer_first_name}</h2>
      <p>orders will be displayed here</p>
    </div>
  );
}

export default CustomerProfileForm;
