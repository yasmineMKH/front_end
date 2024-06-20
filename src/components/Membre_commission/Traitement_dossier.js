/*import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Axios from "axios";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
// Importez le fichier CSS
import "../vice/vice.css";
import { Box, Typography, Modal, TextField } from "@mui/material";
import "bootstrap-icons/font/bootstrap-icons.css";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw", // Ajustez la largeur selon vos besoins
  maxHeight: "80vh", // Limitez la hauteur à 80% de la hauteur de la vue
  overflowY: "auto", // Ajoutez le défilement vertical
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px 10px 10px 10px",
};
const Traitement_demande = () => {
  const [doctorants, setDoctorants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    Username_Mat: "",
  });
  const { id } = useParams();
  const { Username } = useParams();
  const [menuVisible, setMenuVisible] = useState(false);
  const [note, setNote] = useState("");

  const [demande, setDemande] = useState([]);

  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await Axios.get(
          `http://localhost:3002/user/${id}`
        );
        setUser(userResponse.data);

        const commissionResponse = await Axios.get(
          `http://localhost:3002/check_commission_membership/${userResponse.data.Username}`
        );
        setIsCommissionMember(commissionResponse.data.isMember);

        const commissionResponsepresident = await Axios.get(
          `http://localhost:3002/check_commission_President/${userResponse.data.Username}`
        );
        setIsPresident(commissionResponsepresident.data.isPresident);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get("/demande");
        setDemande(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDemandes();
  }, []);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const [open, setOpen] = useState(false);
  const [currentDoctorant, setCurrentDoctorant] = useState(null);
  const [formData, setFormData] = useState({
    Note1: "",
    Note2: "",
    Note_finale: "",
  });

  /*useEffect(() => {
    fetch(`/SPE/${Username}`)
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
  }, []);*/
/*
  const handleOpen = (doctorant) => {
    setCurrentDoctorant(doctorant);
    setNote("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDoctorant(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:3002/SPE/update/${currentDoctorant.id}`, {
      note,
    })
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
  };

  const filteredDoctorants = doctorants.filter((doctorant) =>
    doctorant.Username_Mat.toLowerCase().includes(
      searchTerm.Username_Mat.toLowerCase()
    )
  );

  const columns = [
    { field: "Username_Mat", headerName: "Social Security Number", width: 150 },
    { field: "Pays", headerName: "Destination", width: 150 },
    {
      field: "Etablissement_acc",
      headerName: "Receiving facility",
      width: 150,
    },
    { field: "Date_dep", headerName: "Commencement date", width: 100 },
    { field: "Date_retour", headerName: "Completion date", width: 100 },
    { field: "Periode_Stage", headerName: "Internship period", width: 100 },
    {
      field: "certificat",
      headerName: "Certificat",
      width: 150,

      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          href={`http://localhost:3002/uploadfile/${params.row.Certificat}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PictureAsPdfIcon />
        </Button>
      ),
    },
    {
      field: "Dossier",
      headerName: " Documents",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          href={`http://localhost:3002/uploadfile/${params.row.Document}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PictureAsPdfIcon />
        </Button>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(params.row)}
        >
          Update Note
        </Button>
      ),
    },
  ];

  return (
    <div className="dashboard-container_ens">
      <header>
        <nav className="nav_home_doc">
          <div className="lab">
            <p className="sedan-regular1">Faculty of Chemistry</p>
          </div>
          <div className="toggle_menu">
            <i class="bx bx-grid-alt"></i>
          </div>
          <ul className="nav_list"></ul>
          <div className="close_menu">
            <i class="bx bx-x"></i>
          </div>
          <li className="nav_item">
            <a className="nav_link" href="#">
              {" "}
              <i class="bx bx-home"></i>
            </a>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to={`/profileEnseignant/${id}`}>
              Profile{" "}
              <i class="bx bxs-user-detail" style={{ marginRight: "20px" }}></i>
            </Link>
          </li>

          <li className="nav_item">
            <a className="nav_link dropdown_link" href="#" onClick={toggleMenu}>
              Formation <i class="bx bx-chevron-down"></i>
            </a>
            {menuVisible && (
              <div className="megamenu">
                <ul className="content">
                  <li className="megamenu_item header_megamenu"></li>
                  <li className="megamenu_item">
                    <div className="menu_icone"></div>
                    <div className="menu_link">
                      <Link to={`/${user.Username}/Page_SSHN`}>
                        <p>Manifestation Scientifique Internationale</p>
                      </Link>
                    </div>
                  </li>

                  <li className="megamenu_item">
                    <div className="menu_icone"></div>
                    <div className="menu_link">
                      <Link to={`/${user.Username}/Page_SSHN`}>
                        <p>
                          Séjour scientifique de courte durée de haut niveau
                        </p>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>
          {isCommissionMember && (
            <li className="nav_item">
              <Link
                className="nav_link"
                to={`/${user.Username}/Traitement_dossier`}
              >
                {" "}
                <span className="nav-item">Request</span>
              </Link>
            </li>
          )}
          {IsPresident && (
            <li className="nav_item">
              <Link className="nav_link" to={`/${user.Username}/CSF`}>
                {" "}
                <span className="nav-item">CSF</span>
              </Link>
            </li>
          )}
          <li className="nav_item">
            {" "}
            <Link className="nav_link" to="/Login">
              {" "}
              <i className="fas fa-user"></i>
              <span className="nav-item">
                Logout <i class="bi bi-box-arrow-left"></i>
              </span>
            </Link>
          </li>
        </nav>
      </header>
      <div className="main-top">
        <div className="top">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by username"
              value={searchTerm.Username_Mat}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, Username_Mat: e.target.value })
              }
            />

            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <Box sx={{ height: 1000, width: "99.9%" }}>
          <DataGrid
            rows={demande}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              Update Note
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Note"
                variant="outlined"
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Update Note
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Traitement_demande;
*/
import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Axios from "axios";
import "../vice/vice.css";
import { Box, Typography, Modal, TextField } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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

const Traitement_Demande = () => {
  const [demandes, setDemandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { Username } = useParams();
  const [menuVisible, setMenuVisible] = useState(false);
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDemande, setCurrentDemande] = useState(null);
  const [typeTraitement, setTypeTraitement] = useState("");
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
  const { id } = useParams();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const commissionResponse = await Axios.get(
          `http://localhost:3002/check_commission_membership/${Username}`
        );
        setIsCommissionMember(commissionResponse.data.isMember);

        const commissionResponsepresident = await Axios.get(
          `http://localhost:3002/check_commission_President/${Username}`
        );
        setIsPresident(commissionResponsepresident.data.isPresident);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUserData();
  }, [Username]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get(`/demandes/${Username}`);
        setDemandes(response.data.demandes);
        setTypeTraitement(response.data.Type_traitement);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDemandes();
  }, [Username]);
  console.log(demandes);
  const handleOpen = (demande) => {
    setCurrentDemande(demande);
    setNote("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDemande(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/demandes/update/${currentDemande.Table_Type}/${currentDemande.id}`,
        { note, Username }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Update successful");
          window.location.reload();
        } else {
          alert("Failed to update demande");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.error("Error updating demande:", error);
      });
  };

  const filteredDemandes = demandes.filter((demande) =>
    (demande.Username_Mat || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const columnsDoct = [
    { field: "Username_Mat", headerName: "Username Matiere", width: 150 },
    { field: "Pays", headerName: "Pays", width: 150 },
    { field: "Ville", headerName: "Ville", width: 150 },
    { field: "Etablissement_acc", headerName: "Établissement", width: 150 },
    { field: "Date_dep", headerName: "Date de départ", width: 150 },
    { field: "Date_retour", headerName: "Date de retour", width: 150 },
    { field: "Periode_Stage", headerName: "Période de stage", width: 150 },
    { field: "Document", headerName: "Document", width: 150 },
    {
      field: "Certificat",
      headerName: " Documents",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          href={`http://localhost:3002/uploadfile/${params.row.Document}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PictureAsPdfIcon />
        </Button>
      ),
    },
    { field: "Table_Type", headerName: "Type de Table", width: 350 }, // Nouvelle colonne
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(params.row)}
        >
          Update Note
        </Button>
      ),
    },
  ];

  const columnsEns = [
    { field: "Username_NSS", headerName: "Social Security Number", width: 150 },
    { field: "Pays", headerName: "Pays", width: 150 },
    { field: "Ville", headerName: "Ville", width: 150 },
    { field: "Etablissement_acc", headerName: "Établissement", width: 150 },
    { field: "Date_dep", headerName: "Date de départ", width: 150 },
    { field: "Date_retour", headerName: "Date de retour", width: 150 },
    { field: "Periode_Stage", headerName: "Période de stage", width: 150 },
    {
      field: "Certificat",
      headerName: " Documents",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          href={`http://localhost:3002/uploadfile/${params.row.Document}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PictureAsPdfIcon />
        </Button>
      ),
    },
    { field: "Table_Type", headerName: "Type de Table", width: 350 }, // Nouvelle colonne
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(params.row)}
        >
          Update Note
        </Button>
      ),
    },
  ];

  return (
    <div className="dashboard-container_v">
      <header>
        <nav className="nav_home_doc">
          <div className="lab">
            <p className="sedan-regular1">Faculty of Chemistry</p>
          </div>
          <div className="toggle_menu">
            <i class="bx bx-grid-alt"></i>
          </div>
          <ul className="nav_list"></ul>
          <div className="close_menu">
            <i class="bx bx-x"></i>
          </div>
          <li className="nav_item">
            <a className="nav_link" href="#">
              {" "}
              <i class="bx bx-home"></i>
            </a>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to={`/profileEnseignant/${id}`}>
              Profile{" "}
              <i class="bx bxs-user-detail" style={{ marginRight: "20px" }}></i>
            </Link>
          </li>

          <li className="nav_item">
            <a className="nav_link dropdown_link" href="#" onClick={toggleMenu}>
              Formation <i class="bx bx-chevron-down"></i>
            </a>
            {menuVisible && (
              <div className="megamenu">
                <ul className="content">
                  <li className="megamenu_item header_megamenu"></li>
                  <li className="megamenu_item">
                    <div className="menu_icone"></div>
                    <div className="menu_link">
                      <Link to={`/${Username}/Page_MSI`}>
                        <p>Manifestation Scientifique Internationale</p>
                      </Link>
                    </div>
                  </li>

                  <li className="megamenu_item">
                    <div className="menu_icone"></div>
                    <div className="menu_link">
                      <Link to={`/${Username}/Page_SSHN`}>
                        <p>
                          Séjour scientifique de courte durée de haut niveau
                        </p>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>
          {isCommissionMember && (
            <li className="nav_item">
              <Link className="nav_link" to={`/${Username}/Traitement_dossier`}>
                {" "}
                <span className="nav-item">Request</span>
              </Link>
            </li>
          )}
          {isCommissionMember && (
            <li className="nav_item">
              {" "}
              <Link className="nav_link" to={`/${Username}/Recours`}>
                {" "}
                <i className="fas fa-user"></i>
                <span className="nav-item">Recours</span>
              </Link>
            </li>
          )}
          {IsPresident && (
            <li className="nav_item">
              <Link className="nav_link" to={`/${Username}/CSF`}>
                {" "}
                <span className="nav-item">CSF</span>
              </Link>
            </li>
          )}
          <li className="nav_item">
            {" "}
            <Link className="nav_link" to="/Login">
              {" "}
              <i className="fas fa-user"></i>
              <span className="nav-item">
                Logout <i class="bi bi-box-arrow-left"></i>
              </span>
            </Link>
          </li>
        </nav>
      </header>

      <Box
        sx={{
          height: 700,
          width: "99%",
          paddingLeft: "20px",
          paddingTop: "90px",
          paddingRight: "40px",
        }}
      >
        <DataGrid
          rows={filteredDemandes}
          columns={
            typeTraitement === "traitement_doctorant" ? columnsDoct : columnsEns
          }
          pageSize={5}
        />
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Update Note
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              required
            />
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Traitement_Demande;
