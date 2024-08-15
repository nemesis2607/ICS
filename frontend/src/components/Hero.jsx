import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Our Immigration Consultancy Management System is well known as one
            of the best management services for immigration with accuracy and
            sensitiveness. Here at Our Company, we have a highly skilled team of
            professionals who are ready to provide premier services in
            accordance with the needs of every client. Dear clients, at
            Immigration Consultancy Management System, we empower your dreams to
            find a new home through providing efficient solutions. Let us help
            you make the transition smooth and however you want it to be without
            stress.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
