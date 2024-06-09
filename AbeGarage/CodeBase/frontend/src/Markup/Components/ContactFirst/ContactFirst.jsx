import { Link } from "react-router-dom";


function ContactFirst() {
  return (
    <section className="contact1-title page-title">
      <div className="auto-container">
        <h2>Contact</h2>
        <ul className="page-breadcrumb">
          <li>
            <Link to="index.html">home</Link>
          </li>
          <li>Contact</li>
        </ul>
      </div>
      <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
    </section>
  );
}

export default ContactFirst