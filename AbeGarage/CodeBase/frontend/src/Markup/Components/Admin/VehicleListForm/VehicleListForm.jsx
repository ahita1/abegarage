import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import vehicleService from "../../../../Services/vehicle.service";
import { FaHandPointUp } from "react-icons/fa";
import { useNavigate } from "react-router";
// eslint-disable-next-line react/prop-types
function VehicleListForm({ id, data }) {
  console.log(data);
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [, setApiError] = useState(false);
  const [, setApiErrorMessage] = useState(null);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Fetch vehicles data from your API
        const response = await vehicleService.getVehicleByCustomerId(id);
        if (!response.status === "success") {
          throw new Error("Failed to fetch vehicles");
        }
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setApiError(true);
        setApiErrorMessage("Failed to fetch vehicles. Please try again later.");
      }
    };

    fetchVehicles();
  }, []);
  const handleChooseClick = (vehicleData) => {
    navigate("/admin/third-order", { state: { vehicleData, data } });
    // setSelectedEmployee(employeeData);
  };

  return (
    <section>
      <div className="auto-container">
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Type</th>
                <th>Mileage</th>
                <th>Tag</th>
                <th>Serial</th>
                <th>Color</th>
                <td>Choose</td>
              </tr>
            </thead>
            <tbody>
              {vehicles?.map((vehicle) => (
                <tr key={vehicle.vehicle_id}>
                  <td>{vehicle.vehicle_year}</td>
                  <td>{vehicle.vehicle_make}</td>
                  <td>{vehicle.vehicle_model}</td>
                  <td>{vehicle.vehicle_type}</td>
                  <td>{vehicle.vehicle_mileage}</td>
                  <td>{vehicle.vehicle_tag}</td>
                  <td>{vehicle.vehicle_serial}</td>
                  <td>{vehicle.vehicle_color}</td>
                  <td>
                    <FaHandPointUp
                      style={{ cursor: "pointer" }}
                      size={30}
                      onClick={() => handleChooseClick(vehicle)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
}

export default VehicleListForm;
