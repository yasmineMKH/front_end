import React, { useState, useEffect } from "react";
// Importez les éléments de react-router-dom
import { NavLink, Link } from "react-router-dom";
// Importez FontAwesomeIcon et l'icône de recherche
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import Axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
// Importez le fichier CSS
import "./vice.css";

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
function Teacher() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSuperUser, setSelectedSuperUser] = useState(null); // Variable d'état pour déterminer si on est en mode édition ou ajout

  // Déclarez votre état pour stocker les données des enseignants et le terme de recherche
  const { id } = useParams();
  const [enseignants, setenseignants] = useState([]);
  //const [prevEnseignants, setenseignants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const [fm, setFirstname] = useState("");
  const [lm, setLastname] = useState("");
  const [u, setUsername] = useState("");
  const [r, setRole] = useState("");
  const [p, setPassword] = useState("");
  const [em, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/addteacher", {
      Firstname: fm,
      Lastname: lm,
      Username: u,
      Email: em,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Add successful");
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
  const handleDelete = (id) => {
    // Send DELETE request to backend to delete super_user
    fetch(`/deleteteacher/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete super_user");
        }
        // Filter out the deleted vice-doyenne from the state
      })
      .catch((error) => {
        console.error("Error deleting super_user:", error);
      });
  };
  useEffect(() => {
    // Fetch enseignants data from backend
    fetch("/enseignants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch enseignant data");
        }
        return response.json();
      })
      .then((enseignants) => {
        setenseignants(enseignants);
      })
      .catch((error) => {
        console.error("Error fetching enseignant data:", error);
      });
  });

  const handleClickAdd = (username) => {
    fetch("/addteacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username_NSS: username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add enseignant to commission");
        }
        // Mettre à jour l'état des enseignants
        setenseignants((enseignants) => {
          return enseignants.map((enseignant) => {
            if (enseignant.Username_NSS === username) {
              return { ...enseignant, isInCommission: true };
            }
            return enseignant;
          });
        });
      })
      .catch((error) => {
        console.error("Error adding enseignant to commission:", error);
      });
  };

  const handleClickRemove = (username) => {
    fetch(`/membre_commission/${username}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove enseignant from commission");
        }
        // Mettre à jour l'état des enseignants
        setenseignants((enseignants) => {
          return enseignants.map((enseignant) => {
            if (enseignant.Username_NSS === username) {
              return { ...enseignant, isInCommission: false };
            }
            return enseignant;
          });
        });
      })
      .catch((error) => {
        console.error("Error removing enseignant from commission:", error);
      });
  };

  const columns = [
    { field: "Username_NSS", headerName: "Social Security Number", width: 200 },
    { field: "Firstname_fr", headerName: "First name", width: 130 },
    { field: "Lastname_fr", headerName: "Last name", width: 130 },
    { field: "Grade", headerName: "Grade", width: 130 },
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
  const handleClose = () => setOpen(false);
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
                <Link to={`/Vice_deans/${id}/binome`}>
                  <PeopleOutlineIcon style={{ marginRight: "9px" }} />
                  Binome
                </Link>
              </li>
              <li>
                <Link to={`/Vice_deans/${id}/DemandeDoc`}>
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
        <div className="main-top">
          <div className="top">
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
          </div>

          <div>
            <DataGrid rows={enseignants} columns={columns} />
          </div>
          <div padding-left="10%">
            <Button variant="contained" color="success" onClick={handleOpen}>
              add a TEACHER
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
// Exportez votre composant  Admin_super_user_List
export default Teacher;
