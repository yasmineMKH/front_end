import React from "react";
import "./vice.css"; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
function Vice_homevice() {
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
    <div className="dashboard-container_vice">
      <nav className="nav_vice">
        <div className="navbar_vice">
          <div className="logo-vice">
            <h1 className="sedan-regular">Faculty of Chemistry</h1>
            <div>
              <hr className=" divider" />
              <h3 className="sedan-regular">Vice Doyen</h3>
            </div>
          </div>

          <ul className="sedan-sc-regular">
            <li>
              <Link to={`/Vice_deans/${id}/Profile`}>
                <AccountCircleIcon style={{ marginRight: "9px" }} />
                Profile
              </Link>
            </li>

            <li>
              <Link to={`/Vice_deans/${id}/teachers`}>
                <PeopleAltIcon style={{ marginRight: "9px" }} /> Teachers
              </Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/students`}>
                <SchoolIcon style={{ marginRight: "9px" }} />
                Students
              </Link>
            </li>
            <li>
              <Link to={``}>
                <UpdateIcon style={{ marginRight: "9px" }} /> Parameters
              </Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/comission`}>
                <GroupsIcon style={{ marginRight: "9px" }} />
                Commission
              </Link>
            </li>

            <li>
              <Link to={`/Vice_deans/${id}/Dossier`}>
                <FolderCopyIcon style={{ marginRight: "9px" }} /> Candidate
                files
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
              <h1>vice deans Details</h1>
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

export default Vice_homevice;
