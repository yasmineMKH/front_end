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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LockResetIcon from "@mui/icons-material/LockReset";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "../Secrétaire/Sec.css";
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
  width: "30vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Doc_list() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorant, setSelectedDoctorant] = useState(null);

  const [formData, setFormData] = useState({
    Username_Mat: "",
    Titre: "",
    CLE: "",
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(05|06|07)\d{8}$/;
    return phoneRegex.test(number);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.Mail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(formData.Numero_telephone)) {
      alert(
        "Please enter a valid phone number (10 digits starting with 05, 06, or 07)."
      );
      return;
    }

    if (isEditing) {
      Axios.put(
        `http://localhost:3002/updatdoctorant/${selectedDoctorant.id}`,
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

  const columns = [
    { field: "Username_Mat", headerName: "Username Mat", width: 150 },
    { field: "Titre", headerName: "Title", width: 100 },
    { field: "CLE", headerName: "CLE", width: 100 },
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
      CLE: "",
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
            <div className="logo-vice">
              <h1 className="sedan-regular">Faculty of Chemistry</h1>
              <div>
                <hr className=" divider" />
                <h3 className="sedan-regular">Vice Doyen</h3>
              </div>
            </div>

            <ul className="sedan-sc-regular">
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
                <Link to={`/Vice_deans/${id}/Dossier`}>
                  <FolderCopyIcon style={{ marginRight: "9px" }} /> Candidate
                  files
                </Link>
              </li>
              <li>
                <Link to={`/Vice_deans/${id}/ListeC`}>
                  <FolderCopyIcon style={{ marginRight: "9px" }} /> liste des
                  condidats
                </Link>
              </li>
              <li>
                <Link to={`/Vice_deans/:id/DossierEns`}>
                  <GroupsIcon style={{ marginRight: "9px" }} /> Teachers files
                </Link>
              </li>
              {/*<li>
                <Link to="/LoginG">
                  <LogoutIcon style={{ marginRight: "9px" }} />
                  Logout
                </Link>
  </li>*/}
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
                <FormControl fullWidth margin="normal">
                  <InputLabel>Title</InputLabel>
                  <Select
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={formData.Titre}
                    onChange={(e) =>
                      setFormData({ ...formData, Titre: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mme">Mme</MenuItem>
                    <MenuItem value="Mle">Mle</MenuItem>
                  </Select>{" "}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>CLE</InputLabel>
                  <Select
                    label="CLE"
                    variant="outlined"
                    fullWidth
                    value={formData.CLE}
                    onChange={(e) =>
                      setFormData({ ...formData, CLE: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Inscrit">Inscrit</MenuItem>
                    <MenuItem value="Non Inscrit">Non Inscrit</MenuItem>
                  </Select>{" "}
                </FormControl>
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
                <FormControl fullWidth margin="normal">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    label="Statut"
                    variant="outlined"
                    fullWidth
                    value={formData.Statut}
                    onChange={(e) =>
                      setFormData({ ...formData, Statut: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Enseignante">Enseignante</MenuItem>
                    <MenuItem value="Element libre">Element libre</MenuItem>
                    <MenuItem value="Ingénieur de Recherche">
                      Ingénieur de Recherche
                    </MenuItem>
                    <MenuItem value="Responsable Commerciale">
                      Responsable Commerciale
                    </MenuItem>
                    <MenuItem value="Attachée de Recherche">
                      Attachée de Recherche
                    </MenuItem>
                    <MenuItem value="Ingénieur de Labo">
                      Ingénieur de Labo
                    </MenuItem>
                    <MenuItem value="Chef de Projet ">Chef de Projet </MenuItem>
                    <MenuItem value="Police Scientifique">
                      Police Scientifique{" "}
                    </MenuItem>
                    <MenuItem value="Chargée de Recherche">
                      Chargée de Recherche
                    </MenuItem>
                    <MenuItem value="Analyste Développeur">
                      Analyste Développeur
                    </MenuItem>
                    <MenuItem value="MDN">MDN</MenuItem>
                  </Select>{" "}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Type of Registration</InputLabel>
                  <Select
                    label="Type of Registration"
                    variant="outlined"
                    fullWidth
                    value={formData.Type_inscri}
                    onChange={(e) =>
                      setFormData({ ...formData, Type_inscri: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="DOCTORAT EN SCIENCES">
                      DOCTORAT EN SCIENCES
                    </MenuItem>
                    <MenuItem value="Doctorat (3ème Cycle)">
                      Doctorat (3ème Cycle)
                    </MenuItem>
                    <MenuItem value="2ème Année MAGISTER">
                      2ème Année MAGISTER
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Field of Study</InputLabel>
                  <Select
                    label="Field of Study"
                    variant="outlined"
                    fullWidth
                    value={formData.Filiere}
                    onChange={(e) =>
                      setFormData({ ...formData, Filiere: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Chimie">Chimie</MenuItem>
                  </Select>{" "}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    label="Domain"
                    variant="outlined"
                    fullWidth
                    value={formData.Domaine}
                    onChange={(e) =>
                      setFormData({ ...formData, Domaine: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="SCIENCES DE LA MATIERE">
                      SCIENCES DE LA MATIERE
                    </MenuItem>
                  </Select>{" "}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Option</InputLabel>
                  <Select
                    label="Option"
                    variant="outlined"
                    fullWidth
                    value={formData.Option}
                    onChange={(e) =>
                      setFormData({ ...formData, Option: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Chimie Organique Appliquée">
                      Chimie Organique Appliquée
                    </MenuItem>
                    <MenuItem value="Chimie du Médicament">
                      Chimie du Médicament
                    </MenuItem>
                    <MenuItem value="Criminalistique">Criminalistique</MenuItem>
                    <MenuItem value="Analyse et Contrôle">
                      Analyse et Contrôle
                    </MenuItem>
                    <MenuItem value="Chimie Physique">Chimie Physique</MenuItem>
                    <MenuItem value="Chimie Physique et Théorique">
                      Chimie Physique et Théorique
                    </MenuItem>
                    <MenuItem value="Environnement">Environnement</MenuItem>
                    <MenuItem value="Chimie Macromoléculaire">
                      Chimie Macromoléculaire
                    </MenuItem>
                    <MenuItem value="Chimie et Physique des Matériaux Inorganiques">
                      Chimie et Physique des Matériaux Inorganiques
                    </MenuItem>
                    <MenuItem value="Analyse et Contrôle">
                      Analyse et Contrôle
                    </MenuItem>
                    <MenuItem value="Chimie Computationnelle et Spectroscopie">
                      Chimie Computationnelle et Spectroscopie
                    </MenuItem>
                    <MenuItem value="Chimie Computationnelle et Spectroscopie">
                      Chimie Computationnelle et Spectroscopie
                    </MenuItem>
                    <MenuItem value="Physique Chimie Théorique et Chimie Informatique">
                      Physique Chimie Théorique et Chimie Informatique
                    </MenuItem>
                    <MenuItem value="Chimie de la Matière Condensée">
                      Chimie de la Matière Condensée
                    </MenuItem>

                    <MenuItem value="Chimie des Matériaux">
                      Chimie des Matériaux
                    </MenuItem>
                  </Select>{" "}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
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
                  </Select>{" "}
                </FormControl>
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
                  name="Mail"
                  value={formData.Mail}
                  onChange={(e) =>
                    setFormData({ ...formData, Mail: e.target.value })
                  }
                  fullWidth
                  margin="normal"
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
                <FormControl fullWidth margin="normal">
                  <InputLabel>Access Diploma</InputLabel>
                  <Select
                    label="Access Diploma"
                    variant="outlined"
                    fullWidth
                    value={formData.Dip_acces}
                    onChange={(e) =>
                      setFormData({ ...formData, Dip_acces: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Magister">Magister</MenuItem>
                    <MenuItem value="Master">Master</MenuItem>
                    <MenuItem value="DEA">DEA</MenuItem>
                    <MenuItem value="DES">DES</MenuItem>
                    <MenuItem value="Master">Master</MenuItem>
                  </Select>{" "}
                </FormControl>
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
                <FormControl fullWidth margin="normal">
                  <InputLabel>University Year</InputLabel>
                  <Select
                    label="University Year"
                    variant="outlined"
                    fullWidth
                    value={formData.An_univer}
                    onChange={(e) =>
                      setFormData({ ...formData, An_univer: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="2007/2008">2007/2008</MenuItem>
                    <MenuItem value="2008/2009">2008/2009</MenuItem>
                    <MenuItem value="2009/2010">2009/2010</MenuItem>
                    <MenuItem value="2010/2011">2010/2011</MenuItem>
                    <MenuItem value="2011/2012">2011/2012</MenuItem>
                    <MenuItem value="2012/2013">2012/2013</MenuItem>
                    <MenuItem value="2013/2014">2013/2014</MenuItem>
                    <MenuItem value="2014/2015">2014/2015</MenuItem>
                    <MenuItem value="2015/2016">2015/2016</MenuItem>
                    <MenuItem value="2016/2017">2016/2017</MenuItem>
                    <MenuItem value="2019/2018">2019/2018</MenuItem>
                    <MenuItem value="2018/2019">2018/2019</MenuItem>
                    <MenuItem value="2019/2020">2019/2020</MenuItem>
                    <MenuItem value="2020/2022">2020/2022</MenuItem>
                    <MenuItem value="2022/2023">2022/2023</MenuItem>
                    <MenuItem value="2023/2024">2023/2024</MenuItem>
                    <MenuItem value="2024/2025">2024/2025</MenuItem>
                    <MenuItem value="2025/2026">2025/2026</MenuItem>
                    <MenuItem value="2026/2027">2026/2027</MenuItem>
                    <MenuItem value="2027/2028">2027/2028</MenuItem>
                    <MenuItem value="2028/2029">2028/2029</MenuItem>
                    <MenuItem value="2029/2030">2029/2030</MenuItem>
                  </Select>{" "}
                </FormControl>
                <TextField
                  label="Phone Number"
                  name="Numero_telephone"
                  value={formData.Numero_telephone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Numero_telephone: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email USTHB "
                  name="Mail"
                  value={formData.Mail}
                  onChange={(e) =>
                    setFormData({ ...formData, Mail: e.target.value })
                  }
                  fullWidth
                  margin="normal"
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

export default Doc_list;

/*
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LockResetIcon from "@mui/icons-material/LockReset";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "../Secrétaire/Sec.css";
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
  width: "30vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Doc_list() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorant, setSelectedDoctorant] = useState(null);

  const [formData, setFormData] = useState({
    Username_Mat: "",
    Titre: "",
    CLE: "",
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(05|06|07)\d{8}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.Mail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(formData.Numero_telephone)) {
      alert(
        "Please enter a valid phone number (10 digits starting with 05, 06, or 07)."
      );
      return;
    }

    if (isEditing) {
      Axios.put(
        `http://localhost:3002/updatdoctorant/${selectedDoctorant.id}`,
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

  const columns = [
    { field: "Username_Mat", headerName: "Username Mat", width: 150 },
    { field: "Titre", headerName: "Title", width: 100 },
    { field: "CLE", headerName: "CLE", width: 100 },
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
    { field: "Lieu_exer", headerName: "Exercise Place", width: 200 },
    { field: "Code_dir", headerName: "Director Code", width: 150 },
    { field: "Grade_codir", headerName: "Co-Director Grade", width: 150 },
    { field: "L_exer", headerName: "Exercise Location", width: 200 },
    { field: "Cdir_these", headerName: "Thesis Co-Director", width: 200 },
    { field: "Labo", headerName: "Lab", width: 150 },
    { field: "D_labo", headerName: "Lab Director", width: 200 },
    { field: "Numero_telephone", headerName: "Phone Number", width: 150 },
    { field: "Grade", headerName: "Grade", width: 100 },
    { field: "Laboratoire", headerName: "Laboratory", width: 200 },
    { field: "Departement", headerName: "Department", width: 150 },
    { field: "Usthb", headerName: "USTHB", width: 100 },
    { field: "President", headerName: "President", width: 200 },
    { field: "Promoteur", headerName: "Promoter", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEdit(params.row)}
            variant="contained"
            color="primary"
            startIcon={<UpdateIcon />}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleOpen = () => {
    setFormData({
      Username_Mat: "",
      Titre: "",
      CLE: "",
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
    setIsEditing(false);
    setOpen(true);
  };

  const handleEdit = (doctorant) => {
    setSelectedDoctorant(doctorant);
    setFormData(doctorant);
    setIsEditing(true);
    setOpen(true);
  };

  return (
    <div>
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
                <Link to={`/Vice_deans/${id}/Dossier`}>
                  <FolderCopyIcon style={{ marginRight: "9px" }} /> Candidate
                  files
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredDoctorants}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Doctorant
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              {isEditing ? "Edit Doctorant" : "Add Doctorant"}
            </Typography>
            <form onSubmit={handleSubmit}> 
              <TextField
                label="Email"
                name="Mail"
                value={formData.Mail}
                onChange={(e) =>
                  setFormData({ ...formData, Mail: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="Numero_telephone"
                value={formData.Numero_telephone}
                onChange={(e) =>
                  setFormData({ ...formData, Numero_telephone: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update" : "Add"}
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Doc_list;
*/
/*
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LockResetIcon from "@mui/icons-material/LockReset";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import "../Secrétaire/Sec.css";
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
  width: "30vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Doc_list() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorant, setSelectedDoctorant] = useState(null);

  const [formData, setFormData] = useState({
    Username_Mat: "",
    Titre: "",
    CLE: "",
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

    // Check required fields
    const requiredFields = [
      "Username_Mat",
      "Titre",
      "CLE",
      "Nom_fr",
      "Prenoms_fr",
      "Nom_ab",
      "Prenoms_ab",
      "Date_naiss",
      "Lieu_naiss",
      "Nationalit",
      "Statut",
      "Type_inscri",
      "Filiere",
      "Domaine",
      "Option",
      "Sexe",
      "Adresse",
      "Mail",
      "Org_employ",
      "Dip_acces",
      "Dat_obten",
      "Lieu_obten",
      "An_univer",
      "Gel",
      "Sujet",
      "Dir_these",
      "Grade_dir",
      "Lieu_exer",
      "Code_dir",
      "Grade_codir",
      "L_exer",
      "Cdir_these",
      "Labo",
      "D_labo",
      "Numero_telephone",
      "Grade",
      "Laboratoire",
      "Departement",
      "Usthb",
      "President",
      "Promoteur",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill the ${field} field.`);
        return;
      }
    }

    if (isEditing) {
      Axios.put(
        `http://localhost:3002/updatdoctorant/${selectedDoctorant.id}`,
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

  const columns = [
    { field: "Username_Mat", headerName: "Username Mat", width: 150 },
    { field: "Titre", headerName: "Title", width: 100 },
    { field: "CLE", headerName: "CLE", width: 100 },
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
    { field: "Sujet", headerName: "Subject", width: 200 },
    { field: "Dir_these", headerName: "Thesis Director", width: 200 },
    { field: "Grade_dir", headerName: "Director Grade", width: 150 },
    { field: "Lieu_exer", headerName: "Work Place", width: 150 },
    { field: "Code_dir", headerName: "Director Code", width: 150 },
    { field: "Grade_codir", headerName: "Co-Director Grade", width: 150 },
    { field: "L_exer", headerName: "Co-Director Place", width: 150 },
    { field: "Cdir_these", headerName: "Co-Director Thesis", width: 200 },
    { field: "Labo", headerName: "Lab", width: 200 },
    { field: "D_labo", headerName: "Lab Director", width: 150 },
    { field: "Numero_telephone", headerName: "Phone Number", width: 150 },
    { field: "Grade", headerName: "Grade", width: 100 },
    { field: "Laboratoire", headerName: "Laboratory", width: 150 },
    { field: "Departement", headerName: "Department", width: 150 },
    { field: "Usthb", headerName: "USTHB", width: 150 },
    { field: "President", headerName: "President", width: 150 },
    { field: "Promoteur", headerName: "Promoter", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
              setSelectedDoctorant(params.row);
              setFormData(params.row);
              setOpen(true);
            }}
            startIcon={<AutoFixNormalIcon />}
            size="small"
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)}
            startIcon={<DeleteIcon />}
            size="small"
            color="error"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Last Name (FR)"
          value={searchTerm.Nom_fr}
          onChange={(e) =>
            setSearchTerm({ ...searchTerm, Nom_fr: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search by First Names (FR)"
          value={searchTerm.Prenoms_fr}
          onChange={(e) =>
            setSearchTerm({ ...searchTerm, Prenoms_fr: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search by Username Mat"
          value={searchTerm.Username_Mat}
          onChange={(e) =>
            setSearchTerm({ ...searchTerm, Username_Mat: e.target.value })
          }
        />
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="table-container">
        <DataGrid
          rows={filteredDoctorants}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnClick
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          setIsEditing(false);
          setSelectedDoctorant(null);
          setFormData({
            Username_Mat: "",
            Titre: "",
            CLE: "",
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
        }}
      >
        Add Doctorant
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {isEditing ? "Edit Doctorant" : "Add Doctorant"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username Mat"
              value={formData.Username_Mat}
              onChange={(e) =>
                setFormData({ ...formData, Username_Mat: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                label="Title"
                value={formData.Titre}
                onChange={(e) =>
                  setFormData({ ...formData, Titre: e.target.value })
                }
                fullWidth
                margin="normal"
                required
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mme">Mme</MenuItem>
                <MenuItem value="Mlle">Mlle</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
                <MenuItem value="Prof">Prof</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
              </Select>{" "}
            </FormControl>
            <TextField
              label="CLE"
              value={formData.CLE}
              onChange={(e) =>
                setFormData({ ...formData, CLE: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Last name (FR)"
              value={formData.Nom_fr}
              onChange={(e) =>
                setFormData({ ...formData, Nom_fr: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="First names (FR)"
              value={formData.Prenoms_fr}
              onChange={(e) =>
                setFormData({ ...formData, Prenoms_fr: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Last name (AB)"
              value={formData.Nom_ab}
              onChange={(e) =>
                setFormData({ ...formData, Nom_ab: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="First names (AB)"
              value={formData.Prenoms_ab}
              onChange={(e) =>
                setFormData({ ...formData, Prenoms_ab: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Birth Date"
              type="date"
              value={formData.Date_naiss}
              onChange={(e) =>
                setFormData({ ...formData, Date_naiss: e.target.value })
              }
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Birth Place"
              value={formData.Lieu_naiss}
              onChange={(e) =>
                setFormData({ ...formData, Lieu_naiss: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Nationality"
              value={formData.Nationalit}
              onChange={(e) =>
                setFormData({ ...formData, Nationalit: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <Select
              label="Status"
              value={formData.Statut}
              onChange={(e) =>
                setFormData({ ...formData, Statut: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Graduated">Graduated</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <Select
              label="Enrollment Type"
              value={formData.Type_inscri}
              onChange={(e) =>
                setFormData({ ...formData, Type_inscri: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <TextField
              label="Filiere"
              value={formData.Filiere}
              onChange={(e) =>
                setFormData({ ...formData, Filiere: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Domain"
              value={formData.Domaine}
              onChange={(e) =>
                setFormData({ ...formData, Domaine: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Option"
              value={formData.Option}
              onChange={(e) =>
                setFormData({ ...formData, Option: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <Select
              label="Sex"
              value={formData.Sexe}
              onChange={(e) =>
                setFormData({ ...formData, Sexe: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <TextField
              label="Address"
              value={formData.Adresse}
              onChange={(e) =>
                setFormData({ ...formData, Adresse: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              type="email"
              value={formData.Mail}
              onChange={(e) =>
                setFormData({ ...formData, Mail: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Employer Organization"
              value={formData.Org_employ}
              onChange={(e) =>
                setFormData({ ...formData, Org_employ: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Access Diploma"
              value={formData.Dip_acces}
              onChange={(e) =>
                setFormData({ ...formData, Dip_acces: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Date Obtained"
              type="date"
              value={formData.Dat_obten}
              onChange={(e) =>
                setFormData({ ...formData, Dat_obten: e.target.value })
              }
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Place Obtained"
              value={formData.Lieu_obten}
              onChange={(e) =>
                setFormData({ ...formData, Lieu_obten: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="University Year"
              value={formData.An_univer}
              onChange={(e) =>
                setFormData({ ...formData, An_univer: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <Select
              label="Gel"
              value={formData.Gel}
              onChange={(e) =>
                setFormData({ ...formData, Gel: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            <TextField
              label="Thesis Subject"
              value={formData.Sujet}
              onChange={(e) =>
                setFormData({ ...formData, Sujet: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Thesis Director"
              value={formData.Dir_these}
              onChange={(e) =>
                setFormData({ ...formData, Dir_these: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Director Grade"
              value={formData.Grade_dir}
              onChange={(e) =>
                setFormData({ ...formData, Grade_dir: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Work Place"
              value={formData.Lieu_exer}
              onChange={(e) =>
                setFormData({ ...formData, Lieu_exer: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Director Code"
              value={formData.Code_dir}
              onChange={(e) =>
                setFormData({ ...formData, Code_dir: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Co-Director Grade"
              value={formData.Grade_codir}
              onChange={(e) =>
                setFormData({ ...formData, Grade_codir: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Co-Director Work Place"
              value={formData.L_exer}
              onChange={(e) =>
                setFormData({ ...formData, L_exer: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Co-Director Thesis"
              value={formData.Cdir_these}
              onChange={(e) =>
                setFormData({ ...formData, Cdir_these: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Lab"
              value={formData.Labo}
              onChange={(e) =>
                setFormData({ ...formData, Labo: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Lab Director"
              value={formData.D_labo}
              onChange={(e) =>
                setFormData({ ...formData, D_labo: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone Number"
              type="tel"
              value={formData.Numero_telephone}
              onChange={(e) =>
                setFormData({ ...formData, Numero_telephone: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Grade"
              value={formData.Grade}
              onChange={(e) =>
                setFormData({ ...formData, Grade: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Laboratory"
              value={formData.Laboratoire}
              onChange={(e) =>
                setFormData({ ...formData, Laboratoire: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Department"
              value={formData.Departement}
              onChange={(e) =>
                setFormData({ ...formData, Departement: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="USTHB"
              value={formData.Usthb}
              onChange={(e) =>
                setFormData({ ...formData, Usthb: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="President"
              value={formData.President}
              onChange={(e) =>
                setFormData({ ...formData, President: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Promoter"
              value={formData.Promoteur}
              onChange={(e) =>
                setFormData({ ...formData, Promoteur: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? "Update" : "Add"}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Doc_list;
*/
