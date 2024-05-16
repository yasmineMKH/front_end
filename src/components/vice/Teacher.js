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
import Axios from "axios";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
// Importez le fichier CSS
import "./vice.css";

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
    fetch("/membre_commission", {
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
            <div className="logo">
              <h1>Faculty of Chemistry</h1>
            </div>
            <ul>
              <li>
                <Link to={`/Vice_deans/${id}/Profile`}>Vice Doyen</Link>
              </li>

              <li>
                <Link to={`/Vice_deans/${id}/binome`}> Binome</Link>
              </li>
              <li>
                <Link to={`/Vice_deans/${id}/teachers`}>Teachers</Link>
              </li>
              <li>
                <Link to={`/Vice_deans/${id}/students`}>Students</Link>
              </li>
              <li>
                <a href="#"> Parameters management</a>
              </li>
              <li>
                <Link to={`/Vice_deans/${id}/comission`}>
                  Commission management
                </Link>
              </li>
              <li> candidate files </li>

              <li>
                <Link to="/LoginG">Logout</Link>
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
            <Button variant="contained" color="success">
              add a TEACHER
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
// Exportez votre composant  Admin_super_user_List
export default Teacher;
