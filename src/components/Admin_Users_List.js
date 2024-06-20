/*import React, { useState, useEffect } from "react";
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

import { DataGrid } from "@mui/x-data-grid";*/

/*function Admin_Users_List() {
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
        <div className="main-top-admin">
          <div className="top-admin"></div>
        </div>

        <div style={{ height: 400, width: "90%" }}>
          <h1> Users List</h1>
          <DataGrid rows={filteredUsers} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default Admin_Users_List;
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Admin_Users_List() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newUser, setNewUser] = useState({
    Firstname: "",
    Lastname: "",
    Username: "",
    Role: "",
    Email: "",
    Password: "",
  });

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

  const handleAddUser = async () => {
    try {
      const response = await fetch("/add_User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({
        Firstname: "",
        Lastname: "",
        Username: "",
        Role: "",
        Email: "",
        Password: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
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
        <div className="main-top-admin">
          <div className="top-admin"></div>
        </div>

        <div style={{ height: 400, width: "90%" }}>
          <h1>Users List</h1>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Add User
          </Button>
          <DataGrid rows={filteredUsers} columns={columns} />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New User
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="First Name"
                  name="Firstname"
                  value={newUser.Firstname}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Last Name"
                  name="Lastname"
                  value={newUser.Lastname}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="Username"
                  value={newUser.Username}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Role"
                  name="Role"
                  value={newUser.Role}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="Email"
                  value={newUser.Email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  name="Password"
                  value={newUser.Password}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleAddUser}
                >
                  Add User
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Admin_Users_List; /*
////////////////////////////////////////////////////////////////////////////////////////////////////////
/*import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./Admin.css";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Admin_Users_List() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSuperUser, setSelectedSuperUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const { id } = useParams();

  const [open, setOpen] = useState(false);
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

  const [newUser, setNewUser] = useState({
    Firstname: "",
    Lastname: "",
    Username: "",
    Role: "",
    Email: "",
    Password: "",
  });

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

  const handleAddUser = async () => {
    try {
      const response = await fetch("/add_User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({
        Firstname: "",
        Lastname: "",
        Username: "",
        Role: "",
        Email: "",
        Password: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      Axios.put(`/users/edit/${selectedSuperUser.id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            alert("Update successful");
            window.location.reload();
          } else {
            alert("Failed to update  user");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error("Error updating user:", error);
        });
    } else {
      Axios.post("http://localhost:3002/add_User", formData)
        .then((res) => {
          if (res.status === 200) {
            alert("Add successful");
            window.location.href = `/Admin/${id}/user`;
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

  const handleUpdate = (User) => {
    setSelectedSuperUser(User);
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

  const handleConfirmUser = async (id) => {
    try {
      const response = await fetch(`/confirm_User/${id}`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("Failed to confirm user");
      }
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, isConfirmed: true } : user
        )
      );
    } catch (error) {
      console.error("Error confirming user:", error);
    }
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
    { field: "id", headerName: "ID", width: 10 },
    { field: "Firstname", headerName: "First name", width: 130 },
    { field: "Lastname", headerName: "Last name", width: 130 },
    { field: "Username", headerName: "Username", width: 130 },
    { field: "Role", headerName: "Role", width: 130 },
    { field: "Email", headerName: "Email", width: 150 },
    /* {
      field: "Actions",
      headerName: "Delete User",
      width: 150,
      renderCell: (params) => (
        <button
          style={{ height: "40px", width: "110px" }}
          className="btn"
          onClick={() => handleDeleteUser(params.row.id)}
        >
          Supprimer
        </button>
      ),
    },*/
/*
    {
      field: "Update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          startIcon={<AutoFixNormalIcon />}
          onClick={() => handleUpdate(params.row)}
        >
          Update
        </Button>
      ),
    },
    {
      field: "Actions",
      headerName: "Confirm User",
      width: 150,
      renderCell: (params) => (
        <>
          <button
            style={{ height: "40px", width: "110px" }}
            className="btn"
            onClick={() => handleConfirmUser(params.row.id)}
          >
            Confirmer
          </button>
        </>
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
        <div className="main-top-admin">
          <div className="top-admin"></div>
        </div>

        <div style={{ height: 400, width: "90%" }}>
          <h1>Users List</h1>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
          >
            Add User
          </Button>
          <DataGrid rows={filteredUsers} columns={columns} />

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
    </>
  );
}

export default Admin_Users_List;
*/
