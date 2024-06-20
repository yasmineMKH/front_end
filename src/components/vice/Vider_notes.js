import React from "react";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockReset";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from "react-router-dom";
function NullifyNotesButton() {
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
        <div className="main-top">
          <div className="top"></div>
          <Button onClick={nullifyNotes}>Nullify Notes</Button>
        </div>
      </div>
    </div>
  );
}

export default NullifyNotesButton;
