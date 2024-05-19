import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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

import { DataGrid } from "@mui/x-data-grid";

function Admin_Users_List() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const { id } = useParams();

  useEffect(() => {
    // Fetch user data from backend
    fetch("/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    // Send DELETE request to backend to delete user
    fetch(`/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Filter out the deleted user from the state
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.Firstname.toLowerCase().includes(
        searchTerm.firstname.toLowerCase()
      ) &&
      user.Lastname.toLowerCase().includes(searchTerm.lastname.toLowerCase()) &&
      user.Username.toLowerCase().includes(searchTerm.username.toLowerCase())
  );
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Firstname", headerName: "First name", width: 130 },
    { field: "Lastname", headerName: "Last name", width: 130 },
    { field: "Username", headerName: "Username", width: 130 },
    { field: "Role", headerName: "Role", width: 130 },
    { field: "Email", headerName: "Email", width: 200 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <button
          style={{ height: "40px", width: "110px" }}
          className="btn"
          onClick={() => handleDeleteUser(params.row.id)}
        >
          Supprimer
        </button>
      ),
    },
  ];
  return (
    <>
      <div className="dashboard-container_admin">
        <nav className="nav_admin">
          <div className="navbar_vice">
            <div className="logo-vice">
              <h1 className="sedan-regular">Faculty of Chemistry</h1>
              <div>
                <hr className="divider" />
                <h3 className="sedan-regular">Admin</h3>
              </div>
            </div>

            <ul className="sedan-sc-regular">
              <li>
                <Link to={`/Admin/${id}/Profile`}>
                  <AccountCircleIcon style={{ marginRight: "9px" }} />
                  Profile
                </Link>
              </li>

              <li>
                <Link to={`/Admin/${id}/user`}>
                  <PeopleAltIcon style={{ marginRight: "9px" }} /> Users
                </Link>
              </li>
              <li>
                <Link to={`/Admin/${id}/super_user`}>
                  <SchoolIcon style={{ marginRight: "9px" }} />
                  Super User
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
        <div style={{ overflowY: "auto", maxHeight: "900px", width: "1400px" }}>
          <h1>User List</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by firstname"
              value={searchTerm.firstname}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, firstname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by lastname"
              value={searchTerm.lastname}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, lastname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by username"
              value={searchTerm.username}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, username: e.target.value })
              }
            />
            <i className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </i>
          </div>

          <div style={{ height: 400, width: "90%" }}>
            <DataGrid rows={filteredUsers} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_Users_List;
