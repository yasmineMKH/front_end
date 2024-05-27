import React from "react";
import "./Sec.css"; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";
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
      <nav className="nav_sec_">
        <div className="navbar_sec">
          <div className="logo-sec">
            <h1 className="sedan-regular">Faculty of Chemistry</h1>
            <div>
              <hr className=" divider" />
              <h3 className="sedan-regular">Secretaria</h3>
            </div>
          </div>

          <ul>
            <li>
              <Link to={`/Secrétaire/${id}/Profile`}>
                <AccountCircleIcon style={{ marginRight: "9px" }} />
                Profile
              </Link>
            </li>

            <li>
              <Link to={`/Secrétaire/${id}/teachers`}>
                <PeopleAltIcon style={{ marginRight: "9px" }} /> Teachers
              </Link>
            </li>
            <li>
              <Link to={`/Secrétaire/${id}/students`}>
                {" "}
                <SchoolIcon style={{ marginRight: "9px" }} />
                Students
              </Link>
            </li>
            <li>
              <Link to={`/Secrétaire/${id}/students`}>
                {" "}
                <LockResetIcon style={{ marginRight: "9px" }} />
                Session
              </Link>
            </li>
            <li>
              <Link to="/LoginG">
                <LogoutIcon style={{ marginRight: "9px" }} />
                Logout
              </Link>
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
