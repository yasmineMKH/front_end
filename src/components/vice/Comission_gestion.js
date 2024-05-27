// Importez React, useState et useEffect
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
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import "./vice.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "10px 10px 10px 10px",
  boxShadow: 24,
  p: 4,
};

// Définissez votre composant Admin_Viced_List
function Comission_gestion() {
  // Déclarez votre état pour stocker les données des enseignants et le terme de recherche
  const { id } = useParams();
  const [enseignants, setenseignants] = useState([]);
  //const [prevEnseignants, setenseignants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const [binomes, setBinomes] = useState([]); // État pour stocker les binômes
  const [open, setOpen] = useState(false); // État pour le Modal

  const handleOpen = () => {
    fetch("/binome_comission") // Fetch binômes data from backend
      .then((response) => response.json())
      .then((data) => {
        setBinomes(data);
        console.log(data);
        setOpen(true);
      })
      .catch((error) => console.error("Error fetching binome data:", error));
  };

  const handleClose = () => setOpen(false);
  const [participants, setParticipants] = useState([]);
  const [openParticipants, setOpenParticipants] = useState(false);

  /*fetch("/enseignants_participants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch participants");
        }
        return response.json();
      })
      .then((data) => {
        setParticipants(data);
        setOpenParticipants(true);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  };*/

  // Utilisez useEffect pour effectuer une action dès que le composant est monté
  /*useEffect(() => {
        // Fetch enseignants data from backend
        fetch('/enseignants')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch enseignant data');
                }
                return response.json();
            })
            .then(enseignants => {
                setenseignants(enseignants);
            })
            .catch(error => {
                console.error('Error fetching enseignant data:', error);
            });
    
        // Fetch commission data from backend
        fetch('/membre_commission/info')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch commission data');
                }
                return response.json();
            })
            .then(commission => {
                // Mettre à jour l'état des enseignants en fonction de la commission
                setenseignants(enseignants => {
                    return enseignants.map(enseignant => {
                        if (commission.includes(enseignant.Username_NSS)) {
                            return {...enseignant, isInCommission: true};
                        } else {
                            return {...enseignant, isInCommission: false};
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching commission data:', error);
            });
    }, []);*/

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

    // Fetch commission data from backend
    fetch("/membre_commission/info")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch commission data");
        }
        return response.json();
      })
      .then(({ commission, president }) => {
        // Mettre à jour l'état des enseignants en fonction de la commission et du président
        setenseignants((enseignants) => {
          return enseignants.map((enseignant) => {
            const isInCommission = commission.includes(enseignant.Username_NSS)
              ? true
              : false;
            const isPresident = president.includes(enseignant.Username_NSS)
              ? true
              : false;
            return { ...enseignant, isInCommission, isPresident };
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching commission data:", error);
      });
  }, []);

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

  const handleMakePresident = (username) => {
    fetch("/membre_commission/president/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username_NSS: username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to make enseignant president");
        }
        // Mettre à jour la liste des enseignants après avoir défini le président de la commission
        setenseignants(
          enseignants.map((enseignant) => {
            if (enseignant.Username_NSS === username) {
              return { ...enseignant, isPresident: true };
            }
            return enseignant;
          })
        );
      })
      .catch((error) => {
        console.error("Error making enseignant president:", error);
      });
  };

  const handleRemovePresident = (username) => {
    fetch(`/membre_commission/${username}/president/delete`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to remove enseignant from president position"
          );
        }
        // Mettre à jour la liste des enseignants après la suppression du président de la commission
        setenseignants(
          enseignants.map((enseignant) => {
            if (enseignant.Username_NSS === username) {
              return { ...enseignant, isPresident: false };
            }
            return enseignant;
          })
        );
      })
      .catch((error) => {
        console.error(
          "Error removing enseignant from president position:",
          error
        );
      });
  };

  const handlebinome_comission = () => {
    fetch("/binome_comission/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Binômes créés avec succès !");
        } else {
          console.error("Échec de la création des binômes.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création des binômes :", error);
      });
  };

  // Filtrer les enseignants en fonction du terme de recherche
  const filteredenseignants = enseignants.filter(
    (enseignant) =>
      enseignant.Firstname_fr.toLowerCase().includes(
        searchTerm.firstname.toLowerCase()
      ) &&
      enseignant.Lastname_fr.toLowerCase().includes(
        searchTerm.lastname.toLowerCase()
      ) &&
      enseignant.Username_NSS.toLowerCase().includes(
        searchTerm.username.toLowerCase()
      )
  );

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3002/delete_all_binome_comission"
      );
      if (response.status === 200) {
        // Mise à jour des boutons de sélection après la suppression réussie
        setenseignants((enseignants) => {
          return enseignants.map((enseignant) => {
            return { ...enseignant, isInCommission: false, isPresident: false };
          });
        });
        alert("All records in Binome_Comission table have been deleted.");
      } else {
        alert("Failed to delete records.");
      }
    } catch (error) {
      console.error("Error deleting records:", error);
      alert(
        "An error occurred while deleting records. Please try again later."
      );
    }
  };

  const columns = [
    { field: "Username_NSS", headerName: "Social Security Number", width: 200 },
    { field: "Firstname_fr", headerName: "First name", width: 130 },
    { field: "Lastname_fr", headerName: "Last name", width: 130 },
    { field: "Grade", headerName: "Grade", width: 130 },
    {
      field: "isInCommission",
      headerName: "Add Commission Member",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClickRemove(params.row.Username_NSS)}
          >
            {" "}
            <i className="bi bi-person-dash" style={{ fontSize: "24px" }}></i>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickAdd(params.row.Username_NSS)}
          >
            <i className="bi bi-person-add" style={{ fontSize: "24px" }}></i>
          </Button>
        ),
    },
    {
      field: "isPresident",
      headerName: "Add Président",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemovePresident(params.row.Username_NSS)}
          >
            {" "}
            <i className="bi bi-person-dash" style={{ fontSize: "24px" }}></i>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleMakePresident(params.row.Username_NSS)}
          >
            {" "}
            <i className="bi bi-person-check" style={{ fontSize: "24px" }}></i>
          </Button>
        ),
    },
  ];
  const binomeColumns = [
    { field: "Username_Nss1", headerName: "Member 1", width: 200 },
    { field: "Username_Nss2", headerName: "Member 2", width: 200 },
    { field: "Type_traitement", headerName: "Type of Treatment", width: 200 },
  ];
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
                <Link to={`/Vice_deans/${id}/Dossier`}>
                  <FolderCopyIcon style={{ marginRight: "9px" }} /> Candidate
                  files
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
          <div className="top-vice">
            <div className="search-bar_vice">
              {/*<input
                type="text"
                className="input_vice "
                placeholder="Search by lastname"
                value={/*searchTerm.lastname}
                onChange={(e) =>
                  setSearchTerm({ ...searchTerm, lastname: e.target.value })
                }
              />
              <i className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </i>*/}
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            style={{ marginLeft: "10px" }}
          >
            View pair
          </Button>
          <div style={{ height: 500 }}>
            <DataGrid rows={filteredenseignants} columns={columns} />
          </div>
          <div padding-left="10%">
            <Button
              variant="contained"
              color="success"
              onClick={handlebinome_comission}
            >
              Create pair
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            List of Pair
          </Typography>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid rows={binomes} columns={binomeColumns} />
          </div>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
}

// Styles pour l'en-tête du tableau
const headerCellStyle = {
  border: "1px solid #dddddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

// Styles pour les cellules du tableau
const cellStyle = {
  border: "1px solid #000000",
  padding: "10px 30px",
  textAlign: "left",
};

// Styles pour les lignes de séparation
const separatorRowStyle = {
  height: "1px",
  backgroundColor: "#dddddd",
};

// Exportez votre composant  Admin_super_user_List
export default Comission_gestion;
