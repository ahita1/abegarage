import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <div>
      <div className="admin-menu">
        <h2>Admin Menu</h2>
      </div>
      <div className="list-group">
        <Link to="/admin" className="list-group-item">
          Dashboard
        </Link>
        <Link to="/admin/fourth-order" className="list-group-item">
          Orders
        </Link>
        <Link to="/admin/first-order" className="list-group-item">
          New order
        </Link>
        <Link to="/admin/add-employee" className="list-group-item">
          Add employee
        </Link>
        <Link to="/admin/employees" className="list-group-item">
          Employees
        </Link>
        <Link to="/admin/add-customer" className="list-group-item">
          Add customer
        </Link>
        <Link to="/admin/customers" className="list-group-item">
          Customers
        </Link>
        <Link
          to="/admin/service-provide
        "
          className="list-group-item"
        >
          Services
        </Link>
      </div>
    </div>
  );
}

export default AdminMenu;
