import { Link } from "react-router-dom";

function AdminDashbord() {
  return (
    <div className="row">
      <div className="col-lg-4 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>open for admins</h5>
          <h2>All Orders</h2>
          <Link to="/admin/fourth-order" className="read-more">
            read more +
          </Link>
          <div className="icon">
            <span className="flaticon-power"></span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>open for admins</h5>
          <h2>New Orders</h2>
          <Link to="/admin/first-order" className="read-more">
            read more +
          </Link>
          <div className="icon">
            <span className="flaticon-gearbox"></span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>open for admins</h5>
          <h2>Employees</h2>
          <Link to="/admin/employees" className="read-more">
            read more +
          </Link>
          <div className="icon">
            <span className="flaticon-brake-disc"></span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>open for admins</h5>
          <h2>Add Employee</h2>
          <Link to="/admin/add-employee" className="read-more">
            read more +
          </Link>
          <div className="icon">
            <span className="flaticon-car-engine"></span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>open for admins</h5>
          <h2>Customers</h2>
          <Link to="/admin/customers" className="read-more">
            read more +
          </Link>
          <div className="icon">
            <span className="flaticon-tire"></span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>open for admins</h5>
          <h2>Add Customers</h2>
          <Link to="/admin/add-customer" className="read-more">
            read more +
          </Link>
          <div className="icon">
            <span className="flaticon-spray-gun"></span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 service-block-one">
        <div className="inner-box hvr-float-shadow">
          <h5>open for admins</h5>
          <h2>Services</h2>
          <Link to="/admin/service" className="read-more">
            read more +
          </Link>
          <div className="icon">
            <span className="flaticon-car-engine"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashbord;
