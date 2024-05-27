import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
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

import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import "./Sec.css";
import LockResetIcon from "@mui/icons-material/LockReset";

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
  maxHeight: "90vh",
  overflowY: "auto",
};

function Sec_doc() {
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
    D_labo: "",
    Numero_telephone: "",
    Grade: "",
    Laboratoire: "",
    Departement: "",
    Usthb: "",
    President: "",
    Promoteur: "",
    Etat_compte: "false",
    Est_participe: "false",
  });

  const { id } = useParams();
  const [doctorants, setDoctorants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    Nom_fr: "",
    Prenoms_fr: "",
    Username_Mat: "",
  });
  const [fm, setFirstname] = useState("");
  const [lm, setLastname] = useState("");
  const [u, setUsername] = useState("");
  const [r, setRole] = useState("");
  const [p, setPassword] = useState("");
  const [em, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      Axios.put(
        `http://localhost:3002/updatedoctorant/${selectedDoctorant.id}`,
        formData
      )
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
        setDoctorants((prevDoctorants) =>
          prevDoctorants.filter((doc) => doc.id !== id)
        );
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
      doctorant.Nom_fr.toLowerCase().includes(
        searchTerm.Nom_fr.toLowerCase()
      ) &&
      doctorant.Prenoms_fr.toLowerCase().includes(
        searchTerm.Prenoms_fr.toLowerCase()
      ) &&
      doctorant.Username_Mat.toLowerCase().includes(
        searchTerm.Username_Mat.toLowerCase()
      )
  );

  const handleClickAdd = (username) => {
    fetch("/adddoctorant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username_Mat: username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add doctorant to commission");
        }
        setDoctorants((prevDoctorants) => {
          return prevDoctorants.map((doctorant) => {
            if (doctorant.Username_Mat === username) {
              return { ...doctorant, isInCommission: true };
            }
            return doctorant;
          });
        });
      })
      .catch((error) => {
        console.error("Error adding doctorant to commission:", error);
      });
  };

  const columns = [
    { field: "Username_Mat", headerName: "Username Matricule", width: 150 },
    { field: "Nom_fr", headerName: "Last name (FR)", width: 150 },
    { field: "Prenoms_fr", headerName: "First name (FR)", width: 150 },
    { field: "Date_naiss", headerName: "Birth Date", width: 150 },
    { field: "Lieu_naiss", headerName: "Birth Place", width: 150 },
    { field: "Numero_telephone", headerName: "Phone Number", width: 150 },
    { field: "Sexe", headerName: "Gender", width: 100 },
    { field: "Grade", headerName: "Grade", width: 150 },
    { field: "Laboratoire", headerName: "Laboratory", width: 150 },
    { field: "Departement", headerName: "Department", width: 150 },
    { field: "Mail", headerName: "Email", width: 200 },
    { field: "Usthb", headerName: "USTHB-email", width: 150 },
    { field: "Statut", headerName: "Status", width: 150 },
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
      D_labo: "",
      Numero_telephone: "",
      Grade: "",
      Laboratoire: "",
      Departement: "",
      Usthb: "",
      President: "",
      Promoteur: "",
      Etat_compte: "false",
      Est_participe: "false",
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
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

        <div className="main-top">
          <div className="top"></div>
          <Box sx={{ height: 1000, width: 2800 }}>
            <DataGrid
              rows={filteredDoctorants}
              columns={columns}
              pageSize={10}
              getRowId={(row) => row.id}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mt: 2, margin: "auto" }}
            style={{ marginBottom: "20px", fontSize: "14px", width: "20%" }}
            onClick={handleOpen}
          >
            ADD student
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {isEditing ? "Modifier Doctorant" : "Ajouter Doctorant"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username Matricule"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Username_Mat"
                  value={formData.Username_Mat}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Titre"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Titre"
                  value={formData.Titre}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Nom (FR)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Nom_fr"
                  value={formData.Nom_fr}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Prénom (FR)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Prenoms_fr"
                  value={formData.Prenoms_fr}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Nom (AB)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Nom_ab"
                  value={formData.Nom_ab}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Prénom (AB)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Prenoms_ab"
                  value={formData.Prenoms_ab}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Date de Naissance"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Date_naiss"
                  value={formData.Date_naiss}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Lieu de Naissance"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Lieu_naiss"
                  value={formData.Lieu_naiss}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Nationalité"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Nationalit"
                  value={formData.Nationalit}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Statut"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Statut"
                  value={formData.Statut}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Type d'inscription"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Type_inscri"
                  value={formData.Type_inscri}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Filière"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Filiere"
                  value={formData.Filiere}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Domaine"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Domaine"
                  value={formData.Domaine}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Option"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Option"
                  value={formData.Option}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Sexe"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Sexe"
                  value={formData.Sexe}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Adresse"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Adresse"
                  value={formData.Adresse}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Mail"
                  value={formData.Mail}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Organisme Employeur"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Org_employ"
                  value={formData.Org_employ}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Diplome d'Accès"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Dip_acces"
                  value={formData.Dip_acces}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Date d'Obtention"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Dat_obten"
                  value={formData.Dat_obten}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Lieu d'Obtention"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Lieu_obten"
                  value={formData.Lieu_obten}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Année Universitaire"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="An_univer"
                  value={formData.An_univer}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Sujet"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Sujet"
                  value={formData.Sujet}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Directeur de Thèse"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Dir_these"
                  value={formData.Dir_these}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Grade Directeur"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Grade_dir"
                  value={formData.Grade_dir}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Lieu d'Exercice"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Lieu_exer"
                  value={formData.Lieu_exer}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Code Directeur"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Code_dir"
                  value={formData.Code_dir}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Co-Directeur de Thèse"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Cdir_these"
                  value={formData.Cdir_these}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Laboratoire de Recherche"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Laboratoire"
                  value={formData.Laboratoire}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Département"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="Departement"
                  value={formData.Departement}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                >
                  {isEditing ? "Modifier" : "Ajouter"}
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Sec_doc;
