import { useLocation } from "react-router-dom";
import OrderList from "./OrderList";

function Third() {
  const location = useLocation();
  const vehicleData = location.state?.vehicleData;
  const customerData = location.state?.data;

  console.log(vehicleData);
  return (
    <div>
      <div className="customer-info">
        <h3>
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
      <div className="customer-info">
        <h3>{vehicleData?.vehicle_make}</h3>
        <h6>Vehicle Color: {vehicleData?.vehicle_color}</h6>
        <h6>Vehicle Year: {vehicleData?.vehicle_year}</h6>
        <h6>Vehicle Tag: {vehicleData?.vehicle_tag}</h6>
        <h6>Vehicle Mileage: {vehicleData?.vehicle_mileage}</h6>
        <h6>Vehicle Make: {vehicleData?.vehicle_make}</h6>
        <h6>Vehicle Serial: {vehicleData?.vehicle_serial}</h6>
        <h6>Vehicle Model: {vehicleData?.vehicle_model}</h6>
        <h6>Edit Vehicle info:</h6>
      </div>
      <OrderList />
    </div>
  );
}

export default Third;
