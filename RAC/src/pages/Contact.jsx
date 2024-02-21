// ContactPage.js
import React from "react";

const Contact = () => {
  return (
    <div className="contact-page" style={{ textAlign: "center" }}>
      <header>
        <h1>Contact Us</h1>
      </header>

      <main>
        <section
          className="contact-info"
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              margin: "0 20px",
              padding: "15px",
              border: "2px solid #f1c40f",
              borderRadius: "10px",
              backgroundColor: "#001F3F",
              width: "100px",
              color: "#FFEB3B",
            }}
          >
            <h2>Phone Number</h2>
            <p>
              <a href="tel:+19864410395">+1 986 441 0395</a>
            </p>
          </div>
           <div
            style={{
              flex: 1,
              margin: "20px",
              width: "100%", // Make the width 100% for small screens
              maxWidth: "300px", // Limit the width on larger screens
            }}
            >
            <h2>Email</h2>
            <p>
              <a href="mailto:info@example.com">info@example.com</a>
            </p>
          </div>
          <div style={{ flex: 1, margin: "0 20px" }}>
            <h2>Address</h2>
            <p>123 Main Street, Cityville, Country</p>
            <section className="map" style={{ marginTop: "20px" }}>
              <iframe
                title="Google Map"
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?q=123+Main+Street,Cityville,Country&key=YOUR_GOOGLE_MAPS_API_KEY`}
              ></iframe>
            </section>
          </div>
        </section>

        {/* <section className="map" style={{ marginTop: "20px" }}>
          <iframe
            title="Google Map"
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?q=123+Main+Street,Cityville,Country&key=YOUR_GOOGLE_MAPS_API_KEY`}
          ></iframe>
        </section> */}
      </main>
    </div>
  );
};

export default Contact;
