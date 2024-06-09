

function ContactSecond() {
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15767.760232512328!2d38.8097534!3d8.8851654!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b82a7e392203f%3A0xb05f440eacc98f9f!2sAddis%20Ababa%20Science%20and%20Technology%20University!5e0!3m2!1sen!2suk!4v1708346232613!5m2!1sen!2suk"
                width="700"
                height="450"
                style={{ border: "0" }} // Convert the style attribute to JSX style object
                allowFullScreen // Change allowfullscreen to allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>


















              
            </div>
          </div>

          <div className="info-column col-lg-5">
            <div className="inner-column">
              <h4>Our Address</h4>
              <div className="text">
                Completely synergize resource taxing relationships via premier
                niche markets. Professionally cultivate one-to-one customer
                service.
              </div>
              <ul>
                <li>
                  <i className="flaticon-pin"></i>
                  <span>Address:</span> 54B, Tailstoi Town 5238 MT, La city, IA
                  5224
                </li>
                <li>
                  <i className="flaticon-email"></i>
                  <span>email:</span> contact@buildtruck.com
                </li>
                <li>
                  <i className="flaticon-phone"></i>
                  <span>phone:</span> 1800 456 7890 / 1254 897 3654
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSecond