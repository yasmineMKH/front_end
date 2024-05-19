// Importez React, useState et useEffect
import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import Axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import AddIcon from "@mui/icons-material/Add";
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

function Admin_super_user_List() {
  const { id } = useParams();
  const [superUsers, setSuperUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSuperUser, setSelectedSuperUser] = useState(null);
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Username: "",
    Role: "",
    Email: "",
    Password: "",
  });
  const [searchTerm, setSearchTerm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    fetch("/super_users")
      .then((response) => response.json())
      .then((data) => setSuperUsers(data))
      .catch((error) => console.error("Error fetching super_user data:", error));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFormData({
      Firstname: "",
      Lastname: "",
      Username: "",
      Role: "",
      Email: "",
      Password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      Axios.put(`/super_users/edit/${selectedSuperUser.id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            alert("Update successful");
            window.location.reload();
          } else {
            alert("Failed to update Super_user");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error("Error updating Super_user:", error);
        });
    } else {
      Axios.post("http://localhost:3002/super_user/add", formData)
        .then((res) => {
          if (res.status === 200) {
            alert("Add successful");
            window.location.href = `/Admin/${id}/super_user`;
          } else {
            alert("Failed to add Super_user");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error("Error adding Super_user:", error);
        });
    }
  };

  const handleUpdate = (superUser) => {
    setSelectedSuperUser(superUser);
    setFormData({
      Firstname: superUser.Firstname,
      Lastname: superUser.Lastname,
      Username: superUser.Username,
      Role: superUser.Role,
      Email: superUser.Email,
      Password: superUser.Password,
    });
    setIsEditing(true);
    handleOpen();
  };

  const handleDelete = (id) => {
    fetch(`/super_users/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete super_user");
        }
        setSuperUsers(superUsers.filter((superUser) => superUser.id !== id));
      })
      .catch((error) => console.error("Error deleting super_user:", error));
  };

  const filteredSuperUsers = superUsers.filter(
    (superUser) =>
      superUser.Firstname.toLowerCase().includes(
        searchTerm.firstname.toLowerCase()
      ) &&
      superUser.Lastname.toLowerCase().includes(
        searchTerm.lastname.toLowerCase()
      ) &&
      superUser.Username.toLowerCase().includes(
        searchTerm.username.toLowerCase()
      ) &&
      superUser.Role.toLowerCase().includes(searchTerm.role.toLowerCase())
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
          onClick={() => handleUpdate(params.row)}
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
            <DataGrid rows={filteredSuperUsers} columns={columns} />
          </div>
          <div style={{ paddingLeft: "10%" }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                setIsEditing(false);
                handleOpen();
              }}
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
                    value={formData.Firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, Firstname: e.target.value })
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Lastname"
                    value={formData.Lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, Lastname: e.target.value })
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    value={formData.Username}
                    onChange={(e) =>
                      setFormData({ ...formData, Username: e.target.value })
                    }
                  />
                  <Select
                    fullWidth
                    margin="normal"
                    value={formData.Role}
                    onChange={(e) =>
                      setFormData({ ...formData, Role: e.target.value })
                    }
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
                    value={formData.Password}
                    onChange={(e) =>
                      setFormData({ ...formData, Password: e.target.value })
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={formData.Email}
                    onChange={(e) =>
                      setFormData({ ...formData, Email: e.target.value })
                    }
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

const headerCellStyle = {
  border: "1px solid #dddddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

const cellStyle = {
  border: "1px solid #000000",
  padding: "10px 30px",
  textAlign: "left",
};

const separatorRowStyle = {
  height: "1px",
  backgroundColor: "#dddddd",
};

export default Admin_super_user_List;

