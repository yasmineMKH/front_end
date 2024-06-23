/*import React from "react";
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
import axios from "react";
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
    <div style={{  padding: "30px" }}>
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
    { id: 2, name: "Manifestation Scientifique Internationale2 " },
    { id: 3, name: "Séjour scientifique de courte durée de haut niveau" },
    { id: 4, name: "Séjour scientifique de courte durée de haut niveau2" },
    { id: 5, name: "Stage de perfectionnement à l’étrangé" },
    { id: 6, name: "Session CSF" },
    { id: 7, name: "Recours" },
  ];
  const nullifyNotes = async () => {
    try {
      const response = await axios.put("/nullify-notes");
      alert(response.data.message);
    } catch (error) {
      console.error("Error nullifying notes:", error);
      alert("Failed to nullify notes.");
    }
  };

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
              <Link to={`/Secrétaire/id`}>
                <AccountCircleIcon style={{ marginRight: "9px" }} />
                Profile
              </Link>
            </li>

            <li>
              <Link to={`/Secrétaire/:id/Teachers`}>
                <PeopleAltIcon style={{ marginRight: "9px" }} /> Teachers
              </Link>
            </li>
            <li>
              <Link to={`/Secrétaire/:id/Doctorants`}>
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
              <Link to={`/Vice_deans/:id/Recours`}>
                {" "}
                <LockResetIcon style={{ marginRight: "9px" }} />
                Recours
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
*/

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
import axios from "react";

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
    <div
      style={{
        backgroundColor: "#999898",
        padding: "20px",
        borderColor: "black",
        borderRadius: "5px 5px 5px 5px",
        boxShadow: "black",
      }}
    >
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
    { id: 1, name: "Manifestation Scientifique Internationale" },
    { id: 2, name: "Manifestation Scientifique Internationale2" },
    { id: 3, name: "Séjour scientifique de courte durée de haut niveau" },
    { id: 4, name: "Séjour scientifique de courte durée de haut niveau2" },
    { id: 5, name: "Stage de perfectionnement à l’étrangé" },
    { id: 6, name: "Stage de perfectionnement à l’étrangé2" },
    { id: 7, name: "Session CSF" },
    { id: 8, name: "Recours" },
  ];

  const nullifyNotes = async () => {
    try {
      const response = await axios.put("/nullify-notes");
      alert(response.data.message);
    } catch (error) {
      console.error("Error nullifying notes:", error);
      alert("Failed to nullify notes.");
    }
  };

  return (
    <div className="dashboard-container_sec">
      <nav className="nav_sec_">
        <div className="navbar_sec">
          <div className="logo-sec">
            <h1 className="sedan-regular">Faculty of Chemistry</h1>
            <div>
              <hr className="divider" />
              <h3 className="sedan-regular">Secretaria</h3>
            </div>
          </div>
          <ul>
            <li>
              <Link to={`/Secrétaire/id`}>
                <AccountCircleIcon style={{ marginRight: "9px" }} />
                Profile
              </Link>
            </li>
            <li>
              <Link to={`/Secrétaire/:id/Teachers`}>
                <PeopleAltIcon style={{ marginRight: "9px" }} /> Teachers
              </Link>
            </li>
            <li>
              <Link to={`/Secrétaire/:id/Doctorants`}>
                <SchoolIcon style={{ marginRight: "9px" }} />
                Students
              </Link>
            </li>
            <li>
              <Link to={`/Session`}>
                <LockResetIcon style={{ marginRight: "9px" }} />
                Session
              </Link>
            </li>
            <li>
              <Link to={`/Vice_deans/:id/Recours`}>
                <LockResetIcon style={{ marginRight: "9px" }} />
                Recours
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
        <div className="session-pair">
          <UpdateSession
            sessionId={1}
            sessionName="Manifestation Scientifique Internationale"
          />
          <UpdateSession
            sessionId={2}
            sessionName="Manifestation Scientifique Internationale2"
          />
        </div>
        <div className="session-pair">
          <UpdateSession
            sessionId={3}
            sessionName="Séjour scientifique de courte durée de haut niveau"
          />
          <UpdateSession
            sessionId={4}
            sessionName="Séjour scientifique de courte durée de haut niveau2"
          />
        </div>
        <div className="session-pair">
          <UpdateSession
            sessionId={5}
            sessionName="Stage de perfectionnement à l’étrangé"
          />
          <UpdateSession
            sessionId={6}
            sessionName="Stage de perfectionnement à l’étrangé2"
          />
        </div>
        <div className="session-pair">
          <UpdateSession sessionId={7} sessionName="Session CSF" />
          <UpdateSession sessionId={8} sessionName="Recours" />
        </div>
        {sessions.slice(9).map((session) => (
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

/*import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Session Name", width: 250 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <ActionButton sessionId={params.row.id} sessionName={params.row.name} />
    ),
  },
];

function ActionButton({ sessionId, sessionName }) {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    Axios.get(`/sessions/${sessionId}`)
      .then((response) => {
        const sessionIsOpen = response.data.Est_ouverte === "true";
        setOuvert(sessionIsOpen);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }, [sessionId]);

  const handleOpenSession = async () => {
    try {
      await Axios.put(`/sessions/${sessionId}/open`);
      setOuvert(true);
      alert("Session opened successfully");
    } catch (error) {
      console.error("Error opening session:", error);
      alert("Failed to open session");
    }
  };

  const handleCloseSession = async () => {
    try {
      await Axios.put(`/sessions/${sessionId}/close`);
      setOuvert(false);
      alert("Session closed successfully");
    } catch (error) {
      console.error("Error closing session:", error);
      alert("Failed to close session");
    }
  };

  return (
    <Button
      variant="contained"
      color={ouvert ? "error" : "success"}
      onClick={ouvert ? handleCloseSession : handleOpenSession}
    >
      {ouvert ? "Close Session" : "Open Session"}
    </Button>
  );
}

export default function UpdateSessions() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get("/sessions")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}*/
