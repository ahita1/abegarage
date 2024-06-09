import { Link } from "react-router-dom";


function ServiceTop() {
  return (
    <section
      className="service-title page-title"
    >
      <div className="auto-container">
        <h2>Services</h2>
        <ul className="page-breadcrumb">
          <li>
            <Link to="index.html">home</Link>
          </li>
          <li>Services</li>
        </ul>
      </div>
      <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
    </section>
  );
}

export default ServiceTop