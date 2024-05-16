// Importez React, useState et useEffect
import React, { useState, useEffect } from "react";
// Importez les éléments de react-router-dom
import { NavLink, Link } from "react-router-dom";
// Importez FontAwesomeIcon et l'icône de recherche
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DataGrid } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

// Importez le fichier CSS
import "./Admin.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "10px 10px 10px 10px",
  bgcolor: "background.paper",
  boxShadow: 50,
  p: 4,
};
// Définissez votre composant Admin_Viced_List
function Admin_super_user_List() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Variable d'état pour déterminer si on est en mode édition ou ajout
  const [selectedSuperUser, setSelectedSuperUser] = useState(null); // Variable d'état pour stocker les données du super utilisateur sélectionné pour l'édition

  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Username: "",
    Role: "",
    Email: "",
    Password: "",
  });
  // Déclarez votre état pour stocker les données des super_users et le terme de recherche
  const { id } = useParams();
  const [super_users, setsuper_users] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    role: "",
  });
  const [fm, setFirstname] = useState("");
  const [lm, setLastname] = useState("");
  const [u, setUsername] = useState("");
  const [r, setRole] = useState("");
  const [p, setPassword] = useState("");
  const [em, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/super_user/add", {
      Firstname: fm,
      Lastname: lm,
      Username: u,
      Role: r,
      Email: em,
      Password: p,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Add successful");
          window.location.href = "/Admin/vice_deans";
        } else {
          return res.json().then((data) => {
            alert("Failed to add Super_user");
          });
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.error("Error adding Super_user:");
      });
  };
  // Utilisez useEffect pour effectuer une action dès que le composant est monté
  useEffect(() => {
    // Fetch super_users data from backend
    fetch("/super_users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch super_user data");
        }
        return response.json();
      })
      .then((super_users) => {
        setsuper_users(super_users);
      })
      .catch((error) => {
        console.error("Error fetching super_user data:", error);
      });
  }, []);

  // Définissez votre fonction pour gérer la suppression d'un vice-doyen
  const handleDelete = (id) => {
    // Send DELETE request to backend to delete super_user
    fetch(`/super_users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete super_user");
        }
        // Filter out the deleted vice-doyenne from the state
        setsuper_users(
          super_users.filter((super_user) => super_user.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting super_user:", error);
      });
  };

  const handleClose = () => setOpen(false);

  // Filtrer les vice-doyennes en fonction du terme de recherche
  const filteredsuper_users = super_users.filter(
    (super_user) =>
      super_user.Firstname.toLowerCase().includes(
        searchTerm.firstname.toLowerCase()
      ) &&
      super_user.Lastname.toLowerCase().includes(
        searchTerm.lastname.toLowerCase()
      ) &&
      super_user.Username.toLowerCase().includes(
        searchTerm.username.toLowerCase()
      ) &&
      super_user.Role.toLowerCase().includes(searchTerm.role.toLowerCase())
  );
  const columns = [
    { field: "Username", headerName: "Social Security Number", width: 200 },
    { field: "Firstname", headerName: "First name", width: 130 },
    { field: "Lastname", headerName: "Last name", width: 130 },

    { field: "Role", headerName: "Role", width: 130 },
    { field: "Email", headerName: "Email", width: 200 },
    {
      field: "Update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          startIcon={<AutoFixNormalIcon />}
          onClick={() => {
            setOpen(true);
            setSelectedSuperUser(params.row);
            setIsEditing(true);
          }}
        >
          Update
        </Button>
      ),
    },
    {
      field: "Supprimer",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const handleOpen = (superUser) => {
    if (superUser) {
      // Si un super utilisateur est passé en argument, cela signifie que nous voulons le modifier
      setSelectedSuperUser(superUser);
      setIsEditing(true);
    } else {
      // Sinon, nous voulons ajouter un nouveau super utilisateur
      setSelectedSuperUser(null);
      setIsEditing(false);
    }
    setOpen(true);
  };
  const populateFields = () => {
    if (selectedSuperUser) {
      setFirstname(selectedSuperUser.Firstname);
      setLastname(selectedSuperUser.Lastname);
      setUsername(selectedSuperUser.Username);
      setRole(selectedSuperUser.Role);
      setPassword(selectedSuperUser.Password);
      setEmail(selectedSuperUser.Email);
    }
  };
  useEffect(() => {
    populateFields();
  }, [selectedSuperUser]);
  // Retournez votre JSX pour le composant Admin_Viced_List
  return (
    <>
      <div className="dashboard-container_admin">
        <nav className="nav_admin">
          <div className="navbar_admin">
            <div className="logo">
              <h1>Logo</h1>
            </div>
            <ul>
              <li>
                <Link to={`/Admin/${id}/Profile`}>
                  <i
                    className="bi bi-person-circle"
                    style={{ marginRight: "20px" }}
                  ></i>
                  <span className="nav-item">Profile</span>
                </Link>
              </li>
              <li>
                <Link to={`/Admin/${id}/user`}>
                  <i
                    className="bi bi-people"
                    style={{ marginRight: "20px" }}
                  ></i>
                  <span className="nav-item">Users</span>
                </Link>
              </li>
              <li>
                <Link to={`/Admin/${id}/super_user`}>
                  <i
                    className="bi bi-people-fill"
                    style={{ marginRight: "20px" }}
                  ></i>
                  <span className="nav-item">Super user</span>
                </Link>
              </li>

              <li>
                <Link to="/LoginG">
                  <i
                    className="bi bi-box-arrow-left"
                    style={{ marginRight: "5px" }}
                  ></i>
                  <span className="nav-item">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="main-top-admin">
          <div className="top-admin">
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
              <input
                type="text"
                placeholder="Search by role"
                value={searchTerm.role}
                onChange={(e) =>
                  setSearchTerm({ ...searchTerm, role: e.target.value })
                }
              />

              <i className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </i>
            </div>
          </div>

          <div style={{ height: 400 }}>
            <DataGrid rows={filteredsuper_users} columns={columns} />
          </div>
          <div padding-left="10%">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Add Super_user
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Firstname"
                    value={fm}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Lastname"
                    value={lm}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    value={u}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Select
                    fullWidth
                    margin="normal"
                    value={r}
                    onChange={(e) => setRole(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Role
                    </MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Secrétaire">Secrétaire</MenuItem>
                    <MenuItem value="Vice doyen">Vice doyen</MenuItem>
                  </Select>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    value={p}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={em}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    {isEditing ? "Update" : "Add"}
                  </Button>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

// Styles pour l'en-tête du tableau
const headerCellStyle = {
  border: "1px solid #dddddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

// Styles pour les cellules du tableau
const cellStyle = {
  border: "1px solid #000000",
  padding: "10px 30px",
  textAlign: "left",
};

// Styles pour les lignes de séparation
const separatorRowStyle = {
  height: "1px",
  backgroundColor: "#dddddd",
};

// Exportez votre composant  Admin_super_user_List
export default Admin_super_user_List;
