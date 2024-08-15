import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Consultants = () => {
  const [consultants, setConsultants] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/consultant",
          { withCredentials: true }
        );
        setConsultants(data.consultants);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchConsultants();
  }, []);

  if (isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>Consultants</h1>
      <div className="banner">
        {consultants && consultants.length > 0 ? (
          consultants.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="consultant avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.consultantDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Consultants Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Consultants;