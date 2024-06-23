/*import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
// Importez le fichier CSS
import "./Sec.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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

function Sec_teacher() {
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
    Firstname_fr: "",
    Lastname_fr: "",
    Username_NSS: "",
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
        `http://localhost:3002/updateacher/${selectedEnseignant.id}`,
        formData
      )
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

  const columns = [
    { field: "Username_NSS", headerName: "Username NSS", width: 100 },
    { field: "Firstname_fr", headerName: "First name (FR)", width: 150 },
    { field: "Lastname_fr", headerName: "Last name (FR)", width: 150 },
    { field: "Grade", headerName: "Grade", width: 100 },
    { field: "Departement", headerName: "Department", width: 150 },
    { field: "Situation", headerName: "status", width: 100 },
    {
      field: "Update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          startIcon={<AutoFixNormalIcon />}
          onClick={() => {
            setOpen(true);
            setSelectedEnseignant(params.row);
            setSelectedEnseignant(params.row);
            setIsEditing(true);
            setFormData(params.row);
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
          variant="contained"
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
                <Link to={`/Secrétaire/id`}>
                  <AccountCircleIcon style={{ marginRight: "9px" }} />
                  Profile
                </Link>
              </li>

              <li>
                <Link to={`/Secrétaire/:id/Teachers`}>
                  <PeopleAltIcon style={{ marginRight: "9px" }} /> Teachers
                </Link>
              </li>
              <li>
                <Link to={`/Secrétaire/:id/Doctorants`}>
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
                <Link to={`/Vice_deans/:id/Recours`}>
                  {" "}
                  <LockResetIcon style={{ marginRight: "9px" }} />
                  Recours
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
            sx={{ mt: 2, margin: "auto" }}
            style={{ marginBottom: "20px", fontSize: "14px", width: "20%" }}
          >
            Add Teacher
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
                  label="Date of Birth"
                  type="date"
                  value={formData.Date_naissance}
                  onChange={(e) =>
                    setFormData({ ...formData, Date_naissance: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Grade"
                    variant="outlined"
                    fullWidth
                    value={formData.Grade}
                    onChange={(e) =>
                      setFormData({ ...formData, Grade: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Professeur">Professeur</MenuItem>
                    <MenuItem value="Maitre de Conférance A">
                      Maitre de Conférance A
                    </MenuItem>
                    <MenuItem value="Maitre de Conférance B">
                      Maitre de Conférance B
                    </MenuItem>
                  </Select>{" "}
                </FormControl>
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Grade"
                    variant="outlined"
                    fullWidth
                    value={formData.Situation}
                    onChange={(e) =>
                      setFormData({ ...formData, Situation: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="En poste">En poste</MenuItem>
                    <MenuItem value="En congé">En congé</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  {isEditing ? "Update teacher" : "Add Enseignant"}
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}
export default Sec_teacher;
*/

import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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
import LockResetIcon from "@mui/icons-material/LockReset";

import {
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
// Importez le fichier CSS
import "./Sec.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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

function Sec_teacher() {
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
    Firstname_fr: "",
    Lastname_fr: "",
    Username_NSS: "",
  });
  const [fm, setFirstname] = useState("");
  const [lm, setLastname] = useState("");
  const [u, setUsername] = useState("");
  const [r, setRole] = useState("");
  const [p, setPassword] = useState("");
  const [em, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.Email)) {
      alert("Invalid email format.");
      return;
    }

    if (!validatePhoneNumber(formData.Numero_telephone)) {
      alert(
        "Invalid phone number. It must be 10 digits long and start with 05, 06, or 07."
      );
      return;
    }

    if (isEditing) {
      Axios.put(
        `http://localhost:3002/updateacher/${selectedEnseignant.id}`,
        formData
      )
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

  const columns = [
    { field: "Username_NSS", headerName: "Username NSS", width: 100 },
    { field: "Firstname_fr", headerName: "First name (FR)", width: 150 },
    { field: "Lastname_fr", headerName: "Last name (FR)", width: 150 },
    { field: "Grade", headerName: "Grade", width: 100 },
    { field: "Departement", headerName: "Department", width: 150 },
    { field: "Situation", headerName: "status", width: 100 },
    {
      field: "Update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          startIcon={<AutoFixNormalIcon />}
          onClick={() => {
            setOpen(true);
            setSelectedEnseignant(params.row);
            setSelectedEnseignant(params.row);
            setIsEditing(true);
            setFormData(params.row);
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
          variant="contained"
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (number) => {
    const re = /^0[567]\d{8}$/;
    return re.test(String(number));
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
                <Link to={`/Secrétaire/id`}>
                  <AccountCircleIcon style={{ marginRight: "9px" }} />
                  Profile
                </Link>
              </li>

              <li>
                <Link to={`/Secrétaire/:id/Teachers`}>
                  <PeopleAltIcon style={{ marginRight: "9px" }} /> Teachers
                </Link>
              </li>
              <li>
                <Link to={`/Secrétaire/:id/Doctorants`}>
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
                <Link to={`/Vice_deans/:id/Recours`}>
                  {" "}
                  <LockResetIcon style={{ marginRight: "9px" }} />
                  Recours
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
            sx={{ mt: 2, margin: "auto" }}
            style={{ marginBottom: "20px", fontSize: "14px", width: "20%" }}
          >
            Add Teacher
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {isEditing ? "Modifier l'enseignant" : "Ajouter un enseignant"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="Username_NSS"
                  label="Username NSS"
                  value={formData.Username_NSS}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Firstname_fr"
                  label="First Name (FR)"
                  value={formData.Firstname_fr}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Lastname_fr"
                  label="Last Name (FR)"
                  value={formData.Lastname_fr}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Firstname_ab"
                  label="First Name (AB)"
                  value={formData.Firstname_ab}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Lastname_ab"
                  label="Last Name (AB)"
                  value={formData.Lastname_ab}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Date_naissance"
                  label="Date of Birth"
                  type="date"
                  value={formData.Date_naissance}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  name="Lieu_naissance"
                  label="Place of Birth"
                  value={formData.Lieu_naissance}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Numero_telephone"
                  label="Phone Number"
                  value={formData.Numero_telephone}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="Sexe"
                    value={formData.Sexe}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="Grade"
                  label="Grade"
                  value={formData.Grade}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Specialite"
                  label="Speciality"
                  value={formData.Specialite}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Laboratoire</InputLabel>
                  <Select
                    name="Laboratoire"
                    label="Laboratory"
                    value={formData.Laboratoire}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  >
                    <MenuItem value="Physico Chimie Théorique et Chimie Informatique">
                      Physico Chimie Théorique et Chimie Informatique
                    </MenuItem>
                    <MenuItem value="Chimie du Gaz Naturel">
                      Chimie du Gaz Naturel
                    </MenuItem>
                    <MenuItem value="Thermodynamique et de Modélisation Moléculaire">
                      Thermodynamique et de Modélisation Moléculaire
                    </MenuItem>
                    <MenuItem value="Analyse Organique Fonctionnelle">
                      Analyse Organique Fonctionnelle
                    </MenuItem>
                    <MenuItem value="Electrochimie- Corrosion, Métallurgie et Chimie Minérale">
                      Electrochimie- Corrosion, Métallurgie et Chimie Minérale
                    </MenuItem>
                    <MenuItem value="Sciences des Matériaux ">
                      Sciences des Matériaux{" "}
                    </MenuItem>
                    <MenuItem value="Etude Physico-Chimique des Matériaux et Application à l’Environnement ">
                      Etude Physico-Chimique des Matériaux et Application à
                      l’Environnement{" "}
                    </MenuItem>
                    <MenuItem value="Chromatographie">Chromatographie</MenuItem>
                    <MenuItem value="Hydrométallurgie et Chimie Inorganique Moléculaire">
                      Hydrométallurgie et Chimie Inorganique Moléculaire
                    </MenuItem>
                    <MenuItem value="Matériaux Catalytiques et Catalyse en Chimie Organique">
                      Matériaux Catalytiques et Catalyse en Chimie Organique
                    </MenuItem>
                    <MenuItem value="Electrochimie- Corrosion, Métallurgie et Chimie Minérale">
                      Electrochimie- Corrosion, Métallurgie et Chimie Minérale
                    </MenuItem>
                    <MenuItem value="Synthèse Macromoléculaire et  Thioorganique Macromoléculaire">
                      Synthèse Macromoléculaire et Thioorganique
                      Macromoléculaire
                    </MenuItem>
                    <MenuItem value="Chimie Organique Appliquée">
                      Chimie Organique Appliquée
                    </MenuItem>
                  </Select>{" "}
                </FormControl>
                <TextField
                  name="Departement"
                  label="Department"
                  value={formData.Departement}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Email"
                  label="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Usthb"
                  label="USTHB"
                  value={formData.Usthb}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="Situation"
                  label="Situation"
                  value={formData.Situation}
                  onChange={handleChange}
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
        </div>
      </div>
    </>
  );
}
export default Sec_teacher;
