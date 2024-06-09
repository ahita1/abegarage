import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdViewList } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import orderService from "../../../Services/order.service";
import { IoIosSearch } from "react-icons/io";
import { jwtDecode } from "jwt-decode";

function Fourth() {
  const tokenString = localStorage.getItem("employee");
  const tokenObject = JSON.parse(tokenString);
  const decodedToken = jwtDecode(tokenObject.employee_token);
  const name = decodedToken.employee_first_name;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrders();
        if (!response.ok) {
          handleApiError(response.status);
          return;
        }
        const data = await response.json();
        if (data.orders && data.orders.length > 0) {
          setOrders(data.orders);
          setFilteredOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
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

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = orders.filter((order) =>
      [
        order.vehicle_model.toLowerCase(),
        order.vehicle_make.toLowerCase(),
        order.customer_first_name.toLowerCase(),
        order.customer_last_name.toLowerCase(),
      ].some((value) => value.includes(query.toLowerCase()))
    );
    setFilteredOrders(filtered);
  };

  const handleRowClick = (orderId) => {
    navigate("/admin/detail", { state: { orderId } });
  };

  const handleEditClick = (order) => {
    navigate("/admin/edit-customer", { state: { order } });
  };

  const handleProfileClick = (order) => {
    navigate("/admin/customer-profile", { state: { order } });
  };

  const uniqueOrders = [
    ...new Map(filteredOrders.map((order) => [order.order_id, order])).values(),
  ];

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Orders List</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-12">
            <div className="inner-column">
              <div className="contact-form">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="search_name"
                    placeholder="Search for an order using customer first name, customer last name, vehicle model, or vehicle make"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <IoIosSearch className="search" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Order Date</th>
                <th>Received By</th>
                <th>Order Status</th>
                <th>Edit | View</th>
              </tr>
            </thead>
            <tbody>
              {uniqueOrders.map((order) => (
                <tr key={order.order_id}>
                  <td
                    onClick={() => handleRowClick(order.order_id)}
                    style={{ cursor: "pointer" }}
                  >
                    {order.order_id}
                  </td>
                  <td onClick={() => handleProfileClick(order)}>
                    <p>
                      {order.customer_first_name} {order.customer_last_name}
                    </p>
                    <p>
                      {order.active_customer_status ? "Active" : "Inactive"}
                    </p>
                  </td>
                  <td onClick={() => handleProfileClick(order)}>
                    <p>{order.vehicle_make}</p>
                    <p>{order.vehicle_model}</p>
                    <p>{order.vehicle_type}</p>
                  </td>
                  <td>{format(new Date(order.order_date), "dd/MM/yyyy")}</td>
                  <td>Admin {name}</td>
                  <td>{order.order_status}</td>
                  <td>
                    <FaEdit
                      className="edit"
                      onClick={() => handleEditClick(order)}
                      style={{ cursor: "pointer" }}
                    />
                    <MdViewList
                      className="delete"
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => handleRowClick(order.order_id)}
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

export default Fourth;
