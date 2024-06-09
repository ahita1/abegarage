import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import customerService from "../../../Services/customer.service";
import { IoIosSearch } from "react-icons/io";
import { FaHandPointUp } from "react-icons/fa";

function OrderListForm() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setApiError] = useState(false);
  const [, setApiErrorMessage] = useState(null);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.getAllCustomers();
        if (!response.ok) {
          handleApiError(response.status);
          return;
        }
        const data = await response.json();
        if (data.customers && data.customers.length > 0) {
          setCustomers(data.customers);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
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
    const filtered = customers.filter(
      (customer) =>
        customer.customer_first_name
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        customer.customer_last_name
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        customer.customer_email.toLowerCase().includes(query.toLowerCase()) ||
        customer.customer_phone_number.includes(query)
    );
    setFilteredCustomers(filtered);
  };

  const handleRowClick = (customerData) => {
    navigate("/admin/second-order", { state: { customerData } });
  };

  const handleProfileClick = (customerData) => {
    navigate("/admin/customer-profile", { state: { customerData } });
  };

  return (
    <section>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="form-column col-lg-12">
            <div className="inner-column">
              <div className="contact-form">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="search_name"
                    placeholder="Search for a customer using first name, last name, email address, or phone number"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <IoIosSearch className="search" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {searchQuery && ( // Only render the table if searchQuery is not empty
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Choose</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_first_name}</td>
                    <td onClick={() => handleProfileClick(customer)}>
                      {customer.customer_last_name}
                    </td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>

                    <td>
                      <FaHandPointUp
                        onClick={() => handleRowClick(customer)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrderListForm;
