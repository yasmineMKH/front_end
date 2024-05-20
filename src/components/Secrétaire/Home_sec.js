import React from "react";
import "./Sec.css"; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
function Home_sec() {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3002/super_user_info/${id}`
        );
        setAdmin(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAdmin();
  }, [id]);

  return (
    <div className="dashboard-container_sec ">
      <nav className="nav_sec">
        <div className="navbar_sec">
          <div className="logo">
            <h1>Secrétaire</h1>
          </div>
          <ul>
            <li>
              <Link to={`/Secrétaire/${id}/Profile`}>Profile</Link>
            </li>

            <li>
              <Link to={`/Secrétaire/${id}/binome`}> Binome</Link>
            </li>
            
            <li>
              <Link to={`/Secrétaire/${id}/teachers`}>Teachers</Link>
            </li>
            <li>
              <Link to={`/Secrétaire/${id}/students`}>Students</Link>
            </li>
            <li>
              <Link to="/LoginG">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className="main">
        <div>
          {admin && (
            <div>
              <h1>Secrétaire Details</h1>
              <p>Firstname: {admin.Firstname}</p>
              <p>Lastname: {admin.Lastname}</p>
              <p>Username: {admin.Username}</p>
              <p>Role: {admin.Role}</p>
              <p>Email: {admin.Email}</p>
              {/* Autres informations de l'administrateur si nécessaire */}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home_sec;
