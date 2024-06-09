import {Link} from 'react-router-dom'

function AboutFirst() {
  return (
      <section

      className="about-title page-title"
    
    >
      <div className="auto-container">
        <h2>About us</h2>
        <ul className="page-breadcrumb">
          <li>
            <Link to="index.html">home</Link>
          </li>
          <li>About us</li>
        </ul>
      </div>
      <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
    </section>
  );
}

export default AboutFirst