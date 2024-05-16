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
// Importez le fichier CSS
import "./vice.css";

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
            <DataGrid rows={filteredenseignants} columns={columns} />
          </div>
          <div padding-left="10%">
            <Button
              variant="contained"
              color="success"
              onClick={handlebinome_comission}
            >
              Create binome
            </Button>
          </div>
        </div>
      </div>
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
