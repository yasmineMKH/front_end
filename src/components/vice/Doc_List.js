import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
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
import "./vice.css";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '30vw',
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Doctorants() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorant, setSelectedDoctorant] = useState(null);

  const [formData, setFormData] = useState({
    Username_Mat: "",
    Titre: "",
    Nom_fr: "",
    Prenoms_fr: "",
    Nom_ab: "",
    Prenoms_ab: "",
    Date_naiss: "",
    Lieu_naiss: "",
    Nationalit: "",
    Statut: "",
    Type_inscri: "",
    Filiere: "",
    Domaine: "",
    Option: "",
    Sexe: "",
    Adresse: "",
    Mail: "",
    Org_employ: "",
    Dip_acces: "",
    Dat_obten: "",
    Lieu_obten: "",
    An_univer: "",
    Gel: "",
    Sujet: "",
    Dir_these: "",
    Grade_dir: "",
    Lieu_exer: "",
    Code_dir: "",
    Grade_codir: "",
    L_exer: "",
    Cdir_these: "",
    Labo: "",
    D_labo: "",
    Numero_telephone: "",
    Grade: "",
    Laboratoire: "",
    Departement: "",
    Usthb: "",
    President: "",
    Promoteur: "",
  });

  const { id } = useParams();
  const [doctorants, setDoctorants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    Nom_fr: "",
    Prenoms_fr: "",
    Username_Mat: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      Axios.put(`http://localhost:3002/updatdoctorant/${selectedDoctorant.id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            alert("Update successful");
            window.location.reload();
          } else {
            alert("Failed to update doctorant");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error("Error updating doctorant:", error);
        });
    } else {
      Axios.post("http://localhost:3002/adddoctorant", formData)
        .then((res) => {
          if (res.status === 201) {
            alert("Add successful");
            window.location.reload();
          } else {
            alert("Failed to add doctorant");
          }
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error("Error adding doctorant:", error);
        });
    }
  };

  const handleDelete = (id) => {
    fetch(`/deletedoctorant/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete doctorant");
        }
        setDoctorants(doctorants.filter((doctorant) => doctorant.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting doctorant:", error);
      });
  };

  useEffect(() => {
    fetch("/doctorants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctorant data");
        }
        return response.json();
      })
      .then((doctorants) => {
        setDoctorants(doctorants);
      })
      .catch((error) => {
        console.error("Error fetching doctorant data:", error);
      });
  }, []);

  const handleClose = () => setOpen(false);

  const filteredDoctorants = doctorants.filter(
    (doctorant) =>
      doctorant.Nom_fr.toLowerCase().includes(searchTerm.Nom_fr.toLowerCase()) &&
      doctorant.Prenoms_fr.toLowerCase().includes(searchTerm.Prenoms_fr.toLowerCase()) &&
      doctorant.Username_Mat.toLowerCase().includes(searchTerm.Username_Mat.toLowerCase())
  );

  const columns = [
    { field: "Username_Mat", headerName: "Username Mat", width: 150 },
    { field: "Titre", headerName: "Title", width: 100 },
    { field: "Nom_fr", headerName: "Last name (FR)", width: 150 },
    { field: "Prenoms_fr", headerName: "First names (FR)", width: 150 },
    { field: "Nom_ab", headerName: "Last name (AB)", width: 150 },
    { field: "Prenoms_ab", headerName: "First names (AB)", width: 150 },
    { field: "Date_naiss", headerName: "Birth Date", width: 150 },
    { field: "Lieu_naiss", headerName: "Birth Place", width: 150 },
    { field: "Nationalit", headerName: "Nationality", width: 150 },
    { field: "Statut", headerName: "Status", width: 100 },
    { field: "Type_inscri", headerName: "Enrollment Type", width: 150 },
    { field: "Filiere", headerName: "Filiere", width: 150 },
    { field: "Domaine", headerName: "Domain", width: 150 },
    { field: "Option", headerName: "Option", width: 150 },
    { field: "Sexe", headerName: "Gender", width: 100 },
    { field: "Adresse", headerName: "Address", width: 200 },
    { field: "Mail", headerName: "Email", width: 200 },
    { field: "Org_employ", headerName: "Employer", width: 200 },
    { field: "Dip_acces", headerName: "Degree Access", width: 200 },
    { field: "Dat_obten", headerName: "Date Obtained", width: 150 },
    { field: "Lieu_obten", headerName: "Place Obtained", width: 150 },
    { field: "An_univer", headerName: "Academic Year", width: 150 },
    { field: "Gel", headerName: "Freeze", width: 100 },
    { field: "Sujet", headerName: "Subject", width: 300 },
    { field: "Dir_these", headerName: "Thesis Director", width: 200 },
    { field: "Grade_dir", headerName: "Director Grade", width: 150 },
    { field: "Lieu_exer", headerName: "Exercise Place", width: 150 },
    { field: "Code_dir", headerName: "Director Code", width: 150 },
    { field: "Grade_codir", headerName: "Co-director Grade", width: 150 },
    { field: "L_exer", headerName: "Co-director Place", width: 150 },
    { field: "Cdir_these", headerName: "Co-director Thesis", width: 200 },
    { field: "Labo", headerName: "Laboratory", width: 200 },
    { field: "D_labo", headerName: "Laboratory Director", width: 200 },
    { field: "Numero_telephone", headerName: "Phone Number", width: 150 },
    { field: "Grade", headerName: "Grade", width: 150 },
    { field: "Laboratoire", headerName: "Laboratory", width: 150 },
    { field: "Departement", headerName: "Department", width: 150 },
    { field: "Usthb", headerName: "USTHB", width: 150 },
    { field: "President", headerName: "President", width: 150 },
    { field: "Promoteur", headerName: "Promoter", width: 150 },
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
            setSelectedDoctorant(params.row);
            setIsEditing(true);
            setFormData(params.row          );
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
  setSelectedDoctorant(null);
  setIsEditing(false);
  setFormData({
    Username_Mat: "",
    Titre: "",
    Nom_fr: "",
    Prenoms_fr: "",
    Nom_ab: "",
    Prenoms_ab: "",
    Date_naiss: "",
    Lieu_naiss: "",
    Nationalit: "",
    Statut: "",
    Type_inscri: "",
    Filiere: "",
    Domaine: "",
    Option: "",
    Sexe: "",
    Adresse: "",
    Mail: "",
    Org_employ: "",
    Dip_acces: "",
    Dat_obten: "",
    Lieu_obten: "",
    An_univer: "",
    Gel: "",
    Sujet: "",
    Dir_these: "",
    Grade_dir: "",
    Lieu_exer: "",
    Code_dir: "",
    Grade_codir: "",
    L_exer: "",
    Cdir_these: "",
    Labo: "",
    D_labo: "",
    Numero_telephone: "",
    Grade: "",
    Laboratoire: "",
    Departement: "",
    Usthb: "",
    President: "",
    Promoteur: "",
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
              placeholder="Search by lastname"
              value={searchTerm.Nom_fr}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, Nom_fr: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by firstname"
              value={searchTerm.Prenoms_fr}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, Prenoms_fr: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by username"
              value={searchTerm.Username_Mat}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, Username_Mat: e.target.value })
              }
            />
            <button type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <Box sx={{ height: 1000, width: 7000 }}>
          <DataGrid
            rows={filteredDoctorants}
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
          sx={{ mt: 2, margin: "auto" }}
          style={{ marginBottom: "20px", fontSize: "14px", width: "20%" }}
        >
          Add Doctorant
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
      {isEditing ? "Update Doctorant" : "Add Doctorant"}
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username Matricule"
        variant="outlined"
        fullWidth
        value={formData.Username_Mat}
        onChange={(e) =>
          setFormData({ ...formData, Username_Mat: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={formData.Titre}
        onChange={(e) =>
          setFormData({ ...formData, Titre: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="First name (FR)"
        variant="outlined"
        fullWidth
        value={formData.Nom_fr}
        onChange={(e) =>
          setFormData({ ...formData, Nom_fr: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last name (FR)"
        variant="outlined"
        fullWidth
        value={formData.Prenoms_fr}
        onChange={(e) =>
          setFormData({ ...formData, Prenoms_fr: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="First name (AB)"
        variant="outlined"
        fullWidth
        value={formData.Nom_ab}
        onChange={(e) =>
          setFormData({ ...formData, Nom_ab: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last name (AB)"
        variant="outlined"
        fullWidth
        value={formData.Prenoms_ab}
        onChange={(e) =>
          setFormData({ ...formData, Prenoms_ab: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Date of Birth"
        variant="outlined"
        fullWidth
        type="date"
        value={formData.Date_naiss}
        onChange={(e) =>
          setFormData({ ...formData, Date_naiss: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Place of Birth"
        variant="outlined"
        fullWidth
        value={formData.Lieu_naiss}
        onChange={(e) =>
          setFormData({ ...formData, Lieu_naiss: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Nationality"
        variant="outlined"
        fullWidth
        value={formData.Nationalit}
        onChange={(e) =>
          setFormData({ ...formData, Nationalit: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Status"
        variant="outlined"
        fullWidth
        value={formData.Statut}
        onChange={(e) =>
          setFormData({ ...formData, Statut: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Type of Registration"
        variant="outlined"
        fullWidth
        value={formData.Type_inscri}
        onChange={(e) =>
          setFormData({ ...formData, Type_inscri: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Field of Study"
        variant="outlined"
        fullWidth
        value={formData.Filiere}
        onChange={(e) =>
          setFormData({ ...formData, Filiere: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Domain"
        variant="outlined"
        fullWidth
        value={formData.Domaine}
        onChange={(e) =>
          setFormData({ ...formData, Domaine: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Option"
        variant="outlined"
        fullWidth
        value={formData.Option}
        onChange={(e) =>
          setFormData({ ...formData, Option: e.target.value })
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
        label="Address"
        variant="outlined"
        fullWidth
        value={formData.Adresse}
        onChange={(e) =>
          setFormData({ ...formData, Adresse: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={formData.Mail}
        onChange={(e) =>
          setFormData({ ...formData, Mail: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Employer Organization"
        variant="outlined"
        fullWidth
        value={formData.Org_employ}
        onChange={(e) =>
          setFormData({ ...formData, Org_employ: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Access Diploma"
        variant="outlined"
        fullWidth
        value={formData.Dip_acces}
        onChange={(e) =>
          setFormData({ ...formData, Dip_acces: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Date Obtained"
        variant="outlined"
        fullWidth
        type="date"
        value={formData.Dat_obten}
        onChange={(e) =>
          setFormData({ ...formData, Dat_obten: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Place Obtained"
        variant="outlined"
        fullWidth
        value={formData.Lieu_obten}
        onChange={(e) =>
          setFormData({ ...formData, Lieu_obten: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="University Year"
        variant="outlined"
        fullWidth
        value={formData.An_univer}
        onChange={(e) =>
            setFormData({ ...formData, An_univer: e.target.value })
          }
          sx={{ mb: 2 }}
          />
          <TextField
            label="Freezing"
            variant="outlined"
            fullWidth
            value={formData.Gel}
            onChange={(e) =>
              setFormData({ ...formData, Gel: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={formData.Sujet}
            onChange={(e) =>
              setFormData({ ...formData, Sujet: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Thesis Director"
            variant="outlined"
            fullWidth
            value={formData.Dir_these}
            onChange={(e) =>
              setFormData({ ...formData, Dir_these: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Director's Grade"
            variant="outlined"
            fullWidth
            value={formData.Grade_dir}
            onChange={(e) =>
              setFormData({ ...formData, Grade_dir: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Place of Practice"
            variant="outlined"
            fullWidth
            value={formData.Lieu_exer}
            onChange={(e) =>
              setFormData({ ...formData, Lieu_exer: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Director's Code"
            variant="outlined"
            fullWidth
            value={formData.Code_dir}
            onChange={(e) =>
              setFormData({ ...formData, Code_dir: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Co-Director's Grade"
            variant="outlined"
            fullWidth
            value={formData.Grade_codir}
            onChange={(e) =>
              setFormData({ ...formData, Grade_codir: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Laboratory"
            variant="outlined"
            fullWidth
            value={formData.Labo}
            onChange={(e) =>
              setFormData({ ...formData, Labo: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Laboratory Director"
            variant="outlined"
            fullWidth
            value={formData.D_labo}
            onChange={(e) =>
              setFormData({ ...formData, D_labo: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={formData.Numero_telephone}
            onChange={(e) =>
              setFormData({ ...formData, Numero_telephone: e.target.value })
            }
            sx={{ mb: 2 }}
          />
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
            label="President"
            variant="outlined"
            fullWidth
            value={formData.President}
            onChange={(e) =>
              setFormData({ ...formData, President: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Supervisor"
            variant="outlined"
            fullWidth
            value={formData.Promoteur}
            onChange={(e) =>
              setFormData({ ...formData, Promoteur: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            {isEditing ? "Update Doctorant" : "Add Doctorant"}
          </Button>
          </form>
          </Box>


        </Modal>
      </div>
    </div>
  </>
);
}

export default Doctorants;

