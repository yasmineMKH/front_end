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
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
// Importez le fichier CSS
import "./vice.css";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import "bootstrap-icons/font/bootstrap-icons.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '30vw', // Ajustez la largeur selon vos besoins
  maxHeight: '80vh', // Limitez la hauteur à 80% de la hauteur de la vue
  overflowY: 'auto', // Ajoutez le défilement vertical
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// Définissez votre composant Admin_Viced_List
function Teacher() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);

  const [formData, setFormData] = useState({
    Username_NSS: "",
    Firstname_fr: "",
    Lastname_fr: "",
    Firstname_ab: "",
    Lastname_ab: "",
    Date_naissance: "",
    Lieu_naissance: "",
    Numero_telephone: "",
    Sexe: "",
    Grade: "",
    Specialite: "",
    Laboratoire: "",
    Departement: "",
    Email: "",
    Usthb: "",
    Situation: "",
  });
  // Déclarez votre état pour stocker les données des enseignants et le terme de recherche
  const { id } = useParams();
  const [enseignants, setenseignants] = useState([]);
  //const [prevEnseignants, setenseignants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    Firstname_fr: "",
    Lastname_fr: "",
    Username_NSS: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      Axios.put(`http://localhost:3002/updateacher/${selectedEnseignant.id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            alert("Update successful");
            window.location.reload();
          } else {
            alert("Failed to update enseignant");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error("Error updating enseignant:", error);
        });
    } else {
      Axios.post("http://localhost:3002/addteacher", formData)
        .then((res) => {
          if (res.status === 201) {
            alert("Add successful");
            window.location.reload();
          } else {
            alert("Failed to add enseignant");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error("Error adding enseignant:", error);
        });
    }
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
  const handleClose = () => setOpen(false);

  const filteredEnseignants = enseignants.filter(
    (enseignant) =>
      enseignant.Firstname_fr.toLowerCase().includes(
        searchTerm.Firstname_fr.toLowerCase()
      ) &&
      enseignant.Lastname_fr.toLowerCase().includes(
        searchTerm.Lastname_fr.toLowerCase()
      ) &&
      enseignant.Username_NSS.toLowerCase().includes(
        searchTerm.Username_NSS.toLowerCase()
      ) 

  );



  const columns = [
    { field: "Username_NSS", headerName: "Username NSS", width: 150 },
    { field: "Firstname_fr", headerName: "First name (FR)", width: 150 },
    { field: "Lastname_fr", headerName: "Last name (FR)", width: 150 },
    { field: "Firstname_ab", headerName: "First name (AB)", width: 150 },
    { field: "Lastname_ab", headerName: "Last name (AB)", width: 150 },
    { field: "Date_naissance", headerName: "Birth Date", width: 150 },
    { field: "Lieu_naissance", headerName: "Birth Place", width: 150 },
    { field: "Numero_telephone", headerName: "Phone Number", width: 150 },
    { field: "Sexe", headerName: "Gender", width: 100 },
    { field: "Grade", headerName: "Grade", width: 150 },
    { field: "Specialite", headerName: "Speciality", width: 150 },
    { field: "Laboratoire", headerName: "Laboratory", width: 150 },
    { field: "Departement", headerName: "Department", width: 150 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "Usthb", headerName: "USTHB", width: 150 },
    { field: "Situation", headerName: "Situation", width: 150 },
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
            setSelectedEnseignant(params.row);
            setIsEditing(true);
            setFormData(params.row);
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

  const handleOpen = () => {
    setSelectedEnseignant(null);
    setIsEditing(false);
    setFormData({
      Username_NSS: "",
      Firstname_fr: "",
      Lastname_fr: "",
      Firstname_ab: "",
      Lastname_ab: "",
      Date_naissance: "",
      Lieu_naissance: "",
      Numero_telephone: "",
      Sexe: "",
      Grade: "",
      Specialite: "",
      Laboratoire: "",
      Departement: "",
      Email: "",
      Usthb: "",
      Situation: "",
    });
    setOpen(true);
  };
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
                <Link to={`/Vice_deans/${id}/Doctorants`}>Doctorants</Link>
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

<button type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          <Box sx={{ height: 1000, width: 2800 }}>
            <DataGrid
              rows={filteredEnseignants}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>

          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mt: 2, margin: "auto", }}
            style={{ marginBottom: "20px", fontSize: "14px" ,width: "20%"}}
          >
            Add Enseignant
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
              >
                {isEditing ? "Update Enseignant" : "Add Enseignant"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username NSS"
                  variant="outlined"
                  fullWidth
                  value={formData.Username_NSS}
                  onChange={(e) =>
                    setFormData({ ...formData, Username_NSS: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="First name (FR)"
                  variant="outlined"
                  fullWidth
                  value={formData.Firstname_fr}
                  onChange={(e) =>
                    setFormData({ ...formData, Firstname_fr: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last name (FR)"
                  variant="outlined"
                  fullWidth
                  value={formData.Lastname_fr}
                  onChange={(e) =>
                    setFormData({ ...formData, Lastname_fr: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="First name (AB)"
                  variant="outlined"
                  fullWidth
                  value={formData.Firstname_ab}
                  onChange={(e) =>
                    setFormData({ ...formData, Firstname_ab: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last name (AB)"
                  variant="outlined"
                  fullWidth
                  value={formData.Lastname_ab}
                  onChange={(e) =>
                    setFormData({ ...formData, Lastname_ab: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Birth Date"
                  variant="outlined"
                  fullWidth
                  value={formData.Date_naissance}
                  onChange={(e) =>
                    setFormData({ ...formData, Date_naissance: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Birth Place"
                  variant="outlined"
                  fullWidth
                  value={formData.Lieu_naissance}
                  onChange={(e) =>
                    setFormData({ ...formData, Lieu_naissance: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={formData.Numero_telephone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Numero_telephone: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <Select
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  value={formData.Sexe}
                  onChange={(e) =>
                    setFormData({ ...formData, Sexe: e.target.value })
                  }
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
                <TextField
                  label="Grade"
                  variant="outlined"
                  fullWidth
                  value={formData.Grade}
                  onChange={(e) =>
                    setFormData({ ...formData, Grade: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Speciality"
                  variant="outlined"
                  fullWidth
                  value={formData.Specialite}
                  onChange={(e) =>
                    setFormData({ ...formData, Specialite: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Laboratory"
                  variant="outlined"
                  fullWidth
                  value={formData.Laboratoire}
                  onChange={(e) =>
                    setFormData({ ...formData, Laboratoire: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={formData.Departement}
                  onChange={(e) =>
                    setFormData({ ...formData, Departement: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formData.Email}
                  onChange={(e) =>
                    setFormData({ ...formData, Email: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="USTHB"
                  variant="outlined"
                  fullWidth
                  value={formData.Usthb}
                  onChange={(e) =>
                    setFormData({ ...formData, Usthb: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Situation"
                  variant="outlined"
                  fullWidth
                  value={formData.Situation}
                  onChange={(e) =>
                    setFormData({ ...formData, Situation: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <Button
                  
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  {isEditing ? "Update Enseignant" : "Add Enseignant"}
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}
// Exportez votre composant  Admin_super_user_List
export default Teacher;
