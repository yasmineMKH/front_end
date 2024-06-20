/*import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import "../vice/vice.css";
import { Box, Typography, Modal, Select, MenuItem } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxHeight: "100vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px 10px 10px 10px",
};

const CSF = () => {
  const [doctorants, setDoctorants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ Username_Mat: "" });
  const { id } = useParams();
  const { Username } = useParams();
  const [menuVisible, setMenuVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentDoctorant, setCurrentDoctorant] = useState(null);
  const [formData, setFormData] = useState({ Decision: "" });

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    fetch(`/CSF`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctorant data");
        }
        return response.json();
      })
      .then((doctorants) => {
        // Triez les doctorants par note finale
        const sortedDoctorants = doctorants.sort(
          (a, b) => b.Note_finale - a.Note_finale
        );

        setDoctorants(doctorants);
      })
      .catch((error) => {
        console.error("Error fetching doctorant data:", error);
      });
  }, []);

  const handleOpen = (doctorant) => {
    setCurrentDoctorant(doctorant);
    setFormData({ Decision: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDoctorant(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(
      `http://localhost:3002/SPE/CSF/update/${currentDoctorant.id}`,
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
  };

  const filteredDoctorants = doctorants.filter((doctorant) =>
    doctorant.Username_Mat.toLowerCase().includes(
      searchTerm.Username_Mat.toLowerCase()
    )
  );

  const columns = [
    { field: "Username_Mat", headerName: "ID", width: 100 },
    { field: "Pays", headerName: "Destination", width: 100 },
    {
      field: "Etablissement_acc",
      headerName: "Receiving facility",
      width: 150,
    },
    { field: "Date_dep", headerName: "Commencement date", width: 120 },
    { field: "Date_retour", headerName: "Completion date", width: 120 },
    { field: "Periode_Stage", headerName: "Internship period", width: 150 },
    { field: "Note_finale", headerName: "Note", width: 90 },
    {
      field: "certificat",
      headerName: "Certificat",
      width: 100,

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
      field: "Document",
      headerName: "Document",
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
          Decision
        </Button>
      ),
    },
  ];

  return (
    <div className="dashboard-container_vice">
      <header>
        <nav className="nav_home_doc">
          <div className="lab">
            <p className="sedan-regular">Faculty of Chemistry</p>
          </div>
          <div className="toggle_menu">
            <i className="bx bx-grid-alt"></i>
          </div>
          <ul className="nav_list"></ul>
          <div className="close_menu">
            <i className="bx bx-x"></i>
          </div>
          <li className="nav_item">
            <a className="nav_link" href="#">
              {" "}
              <i className="bx bx-home"></i>
            </a>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to={`/profileEnseignant/${id}`}>
              Profile{" "}
              <i
                className="bx bxs-user-detail"
                style={{ marginRight: "20px" }}
              ></i>
            </Link>
          </li>
          <li className="nav_item">
            <a className="nav_link" href="#">
              Faculty
            </a>
          </li>
          <li className="nav_item">
            <a className="nav_link dropdown_link" href="#" onClick={toggleMenu}>
              Formation <i className="bx bx-chevron-down"></i>
            </a>
            {menuVisible && (
              <div className="megamenu">
                <ul className="content">
                  <li className="megamenu_item header_megamenu"></li>
                  <li className="megamenu_item">
                    <div className="menu_icone"></div>
                    <div className="menu_link">
                      <a></a>
                      <p>Manifestation Scientifique Internationale</p>
                    </div>
                  </li>
                  <li className="megamenu_item">
                    <div className="menu_icone"></div>
                    <div className="menu_link">
                      <a></a>
                      <p>Séjour scientifique de courte durée de haut niveau</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="nav_item">
            <Link className="nav_link" to={`/CSF/${Username}`}>
              {" "}
              <i className="fas fa-user"></i>
              <span className="nav-item">CSF</span>
            </Link>
          </li>
          <li className="nav_item">
            <a className="nav_link" href="#">
              About
            </a>
          </li>
          <li className="nav_item">
            <a className="nav_link" href="#">
              Contact Us
            </a>
          </li>
          <li className="nav_item">
            {" "}
            <Link className="nav_link" to="/Login">
              {" "}
              <i className="fas fa-user"></i>
              <span className="nav-item">
                Logout <i className="bi bi-box-arrow-left"></i>
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

        <Box
          sx={{
            height: 1000,
            width: "99.9%",
            paddingLeft: "10px",
            paddingTop: "30px",
            paddingRight: "40px",
          }}
        >
          <DataGrid
            rows={filteredDoctorants}
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
          <Box sx={{ ...style, width: 300 }}>
            <form onSubmit={handleSubmit}>
              <Typography>The decision is</Typography>
              <Select
                label="Decision"
                variant="outlined"
                fullWidth
                value={formData.Decision}
                onChange={(e) =>
                  setFormData({ ...formData, Decision: e.target.value })
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="Accepté">Accepted</MenuItem>
                <MenuItem value="Non Accepté">Refused</MenuItem>
              </Select>
              <Button
                id="Decision"
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Decision
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CSF;
*/
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import "../vice/vice.css";
import { Box, Typography, Modal, Select, MenuItem } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxHeight: "100vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px 10px 10px 10px",
};

const CSF = () => {
  const [doctorants, setDoctorants] = useState([]);
  const [demandes, setDemandes] = useState([]); // Ajouter l'état pour les demandes
  const [searchTerm, setSearchTerm] = useState({ Username_Mat: "" });
  const { id } = useParams();
  const { Username } = useParams();
  const [menuVisible, setMenuVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [currentDoctorant, setCurrentDoctorant] = useState(null);
  const [formData, setFormData] = useState({ Decision: "" });
  const [formData1, setFormData1] = useState({ Decision: "" });
  const [currentDemande, setCurrentDemande] = useState(null);
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
  const [user, setUser] = useState(null);
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
    fetch(`/CSF`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctorant data");
        }
        return response.json();
      })
      .then((doctorants) => {
        // Triez les doctorants par note finale
        const sortedDoctorants = doctorants.sort(
          (a, b) => b.Note_finale - a.Note_finale
        );
        setDoctorants(sortedDoctorants);
      })
      .catch((error) => {
        console.error("Error fetching doctorant data:", error);
      });

    const fetchDemandes_MSI = async () => {
      try {
        const response = await Axios.get("/demande_MSI");
        const demandesMSI = response.data.demandesMSI.map((demande) => ({
          ...demande,
          id: `MSI-${demande.id}`,
        }));
        const demandesSSHN = response.data.demandesSSHN.map((demande) => ({
          ...demande,
          id: `SSHN-${demande.id}`,
        }));
        const allDemandes = [...demandesMSI, ...demandesSSHN];
        setDemandes(allDemandes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDemandes_MSI();
  }, []);

  const handleOpen1 = (demande) => {
    setCurrentDemande(demande);
    setFormData1({ Decision: "" });
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setCurrentDemande(null);
  };

  const handleOpen = (doctorant) => {
    setCurrentDoctorant(doctorant);
    setFormData({ Decision: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDoctorant(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(
      `http://localhost:3002/SPE/CSF/update/${currentDoctorant.id}`,
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
  };

  const handleSubmitENS = (e) => {
    e.preventDefault();
    const demandeType = currentDemande.id.startsWith("MSI") ? "MSI" : "SSHN";
    const demandeId = currentDemande.id.split("-")[1];

    Axios.put(
      `http://localhost:3002/CSF/update/${demandeType}/${demandeId}`,
      formData1
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
        alert("An error occurred. Please try again later.");
        console.error("Error updating demande:", error);
      });
  };

  /* const handleOpen = (data, type) => {
    setOpen(true);
    if (type === "doctorant") {
      setCurrentDoctorant(data);
    } else if (type === "demande") {
      setCurrentDemande(data);
    }
    setFormData({ Decision: "" });
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDoctorant(null);
    setCurrentDemande(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentDoctorant) {
      console.error("Current doctorant is not defined.");
      return;
    }
    let url;

    if (currentDoctorant) {
      url = `http://localhost:3002/SPE/CSF/update/${currentDoctorant.id}`;
    } else if (currentDemande) {
      const demandeType = currentDemande.id.startsWith("MSI") ? "MSI" : "SSHN";
      const demandeId = currentDemande.id.split("-")[1];
      url = `http://localhost:3002/CSF/update/${demandeType}/${demandeId}`;
    }
    console.log("URL:", url);
    Axios.put(url, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("Update successful");
          window.location.reload();
        } else {
          alert("Failed to update");
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.error("Error updating:", error);
      });
  };*/

  const filteredDoctorants = doctorants.filter((doctorant) =>
    doctorant.Username_Mat.toLowerCase().includes(
      searchTerm.Username_Mat.toLowerCase()
    )
  );

  const columns = [
    { field: "Username_Mat", headerName: "ID", width: 100 },
    { field: "Pays", headerName: "Destination", width: 100 },
    {
      field: "Etablissement_acc",
      headerName: "Receiving facility",
      width: 150,
    },
    { field: "Date_dep", headerName: "Commencement date", width: 120 },
    { field: "Date_retour", headerName: "Completion date", width: 120 },
    { field: "Periode_Stage", headerName: "Internship period", width: 150 },

    {
      field: "certificat",
      headerName: "Certificat",
      width: 100,
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
      field: "Document",
      headerName: "Document",
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
    { field: "Note1", headerName: "Note 1", width: 90 },
    { field: "Note2", headerName: "Note 2", width: 90 },
    { field: "Username_NSS3", headerName: "3rd Member", width: 90 },
    { field: "Note_finale", headerName: "Final Note", width: 90 },
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
          Decision
        </Button>
      ),
    },
  ];

  const demandesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Username_NSS", headerName: "Social Security Number", width: 100 },
    { field: "Pays", headerName: "Destination", width: 100 },
    { field: "Ville", headerName: "City", width: 80 },
    {
      field: "Etablissement_acc",
      headerName: "Receiving facility",
      width: 100,
    },
    { field: "Date_dep", headerName: "Commencement date", width: 100 },
    { field: "Date_retour", headerName: "Completion date", width: 100 },
    { field: "Periode_Stage", headerName: "Internship period", width: 100 },
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
    { field: "Note1", headerName: "Note 1", width: 30 },
    { field: "Note2", headerName: "Note 2", width: 30 },
    { field: "Username_NSS3", headerName: "3rd Member", width: 90 },
    { field: "Note_finale", headerName: "Final Note", width: 30 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen1(params.row)}
        >
          Decision
        </Button>
      ),
    },
  ];

  return (
    <div className="body_HomeDoc">
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

        <Box
          sx={{
            height: 400,
            width: "99.9%",
            paddingLeft: "10px",
            paddingTop: "30px",
            paddingRight: "40px",
          }}
        >
          <DataGrid
            rows={filteredDoctorants}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
            MSI and SSHN Requests
          </Typography>
          <DataGrid
            rows={demandes}
            columns={demandesColumns}
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
          <Box sx={{ ...style, width: 300 }}>
            <form onSubmit={handleSubmit}>
              <Typography>The decision is</Typography>
              <Select
                label="Decision"
                variant="outlined"
                fullWidth
                value={formData.Decision}
                onChange={(e) =>
                  setFormData({ ...formData, Decision: e.target.value })
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="Accepté">Accepted</MenuItem>
                <MenuItem value="Non Accepté">Refused</MenuItem>
              </Select>
              <Button
                id="Decision"
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Decision
              </Button>
            </form>
          </Box>
        </Modal>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 300 }}>
            <form onSubmit={handleSubmitENS}>
              <Typography>The decision </Typography>
              <Select
                label="Decision"
                variant="outlined"
                fullWidth
                value={formData1.Decision}
                onChange={(e) =>
                  setFormData1({ ...formData, Decision: e.target.value })
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="Accepté">Accepted</MenuItem>
                <MenuItem value="Non Accepté">Refused</MenuItem>
              </Select>
              <Button
                id="Decision"
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Decision
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CSF;
