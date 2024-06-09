import { Link } from "react-router-dom";
import OrderListForm from "./OrderCustomer";
function First() {
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create a new Order</h2>
        </div>
        <OrderListForm />
        <Link to="/admin/add-customer">
          <div className="form-group col-md-12">
            <button
              className="theme-btn btn-style-one"
              type="submit"
              data-loading-text="Please wait..."
            >
              Add New Customer
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default First;
