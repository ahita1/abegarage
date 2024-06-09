import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import customerService from "../../../../Services/customer.service";
import { IoIosSearch } from "react-icons/io";

function CustomerListForm() {
  const [successfulDelete, setSuccessfulDelete] = useState("");
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
          setFilteredCustomers(data.customers);
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
    navigate("/admin/add-vehicle", { state: { customerData } });
  };
  const handleEditClick = (customerData) => {
    navigate("/admin/edit-customer", { state: { customerData } });
  };

  const handleProfileClick = (customerData) => {
    navigate("/admin/customer-profile", { state: { customerData } });
  };
  const handleDeleteClick = (id) => {
    customerService
      .deleteCustomer(id)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log(response.status);
          setApiError(true);
          if (response.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (response.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          if (data.error) {
            setApiError(true);
            setApiErrorMessage(data.error);
          } else if (data.message) {
            console.log(data.message);
            setSuccessfulDelete(data.message);

            // Success message received from the server
            // Perform any additional actions upon successful deletion
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setApiError(true);
        setApiErrorMessage("An error occurred while processing your request");
      });
  };
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Customers List</h2>
        </div>
        <>{successfulDelete && <h3>{successfulDelete}</h3>}</>

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

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Added Date</th>
                <th>Active</th>
                <th>Edit | Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td
                    onClick={() => handleRowClick(customer)}
                    style={{ cursor: "pointer" }}
                  >
                    {customer.customer_id}
                  </td>
                  <td>{customer.customer_first_name}</td>
                  <td onClick={() => handleProfileClick(customer)}>
                    {customer.customer_last_name}
                  </td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    {format(
                      new Date(customer.customer_added_date),
                      "dd/MM/yyyy"
                    )}
                  </td>
                  <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                  <td>
                    <FaEdit
                      className="edit"
                      onClick={() => handleEditClick(customer)}
                      style={{ cursor: "pointer" }}
                    />
                    <MdDeleteOutline
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => handleDeleteClick(customer.customer_id)}
                      className="deleteforemployees"
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

export default CustomerListForm;
