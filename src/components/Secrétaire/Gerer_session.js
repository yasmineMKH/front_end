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
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockReset";
import NewspaperIcon from "@mui/icons-material/Newspaper";
function UpdateSession({ sessionId, sessionName }) {
  const [ouvert, setOuvert] = useState();

  useEffect(() => {
    fetch(`/sessions/${sessionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        return response.json();
      })
      .then((session) => {
        console.log("Session Est_ouverte:", session.id, session.Est_ouverte);
        const sessionIsOpen = session.Est_ouverte === "true" ? true : false;

        setOuvert(sessionIsOpen);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }, [sessionId]);

  const handleOpenSession = async () => {
    try {
      const response = await Axios.put(
        `http://localhost:3002/sessions/${sessionId}/open`
      );
      setOuvert(true);
      alert("Session opened successfully");
    } catch (error) {
      console.error("Error opening session:", error);
      alert("Failed to open session");
    }
  };

  const handleCloseSession = async () => {
    try {
      const response = await Axios.put(
        `http://localhost:3002/sessions/${sessionId}/close`
      );
      setOuvert(false);
      alert("Session closed successfully");
    } catch (error) {
      console.error("Error closing session:", error);
      alert("Failed to close session");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2 style={{ fontSize: "20px", color: "black" }}>
        Update Session Status for "{sessionName}"
      </h2>
      {console.log("Session Est_ouverte:", ouvert)}
      {ouvert ? (
        <Button variant="contained" color="error" onClick={handleCloseSession}>
          Close Session
        </Button>
      ) : (
        <Button
          style={{ width: "auto" }}
          variant="contained"
          color="success"
          onClick={handleOpenSession}
        >
          Open Session
        </Button>
      )}
    </div>
  );
}

function UpdateSessions() {
  const sessions = [
    { id: 1, name: "Manifestation Scientifique Internationale " },
    { id: 2, name: "Séjour scientifique de courte durée de haut niveau" },
    { id: 3, name: "Stage de perfectionnement à l’étrangé" },
    { id: 4, name: "Session CSF" },
  ];

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
              <Link to={`/Secrétaire/Profile`}>
                <AccountCircleIcon style={{ marginRight: "9px" }} />
                Profile
              </Link>
            </li>

            <li>
              <Link to={`/Secrétaire /teachers`}>
                <PeopleAltIcon style={{ marginRight: "9px" }} /> Teachers
              </Link>
            </li>
            <li>
              <Link to={`/Secrétaire/ students`}>
                {" "}
                <SchoolIcon style={{ marginRight: "9px" }} />
                Students
              </Link>
            </li>
            <li>
              <Link to={`/Session`}>
                {" "}
                <LockResetIcon style={{ marginRight: "9px" }} />
                Session
              </Link>
            </li>
            <li>
              <Link to="/LoginG">
                <NewspaperIcon style={{ marginRight: "9px" }} />
                News
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
      <div className="container-sec">
        {sessions.map((session) => (
          <UpdateSession
            key={session.id}
            sessionId={session.id}
            sessionName={session.name}
          />
        ))}
      </div>
    </div>
  );
}

export default UpdateSessions;
