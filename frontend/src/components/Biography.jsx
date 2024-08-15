import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            All of the employees of Immigration Consultancy Management System
            have chosen this job as their calling to assist individuals and
            families to succeed in their endeavour of creating a new life in a
            foreign country. They offer full-scale immigration services
            providing counseling and legal aid from beginning to the end of the
            process. Fully aware of the many aspects and challenges which those
            intending to immigrate or have already immigrated have to face, we
            do our best to offer our clients reliable and concise advice that is
            both accurate and timely.
          </p>
          <p>
            Our team comprises seasoned experts in immigration law, visa
            applications, and compliance management, all committed to delivering
            exceptional service. We believe in a personalized approach, taking
            the time to understand each client's unique situation and needs. Our
            goal is to make the immigration process as smooth and stress-free as
            possible, offering support and guidance at every stage.
          </p>
          <p>
            Immigration Consultancy Management System is more than just a
            service provider; we are your partners in this significant life
            transition. Our success is measured by your success, and we are
            dedicated to helping you achieve your goals with confidence and
            peace of mind. 
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
