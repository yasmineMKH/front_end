import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
function BinomesComponent() {
  const [binomes, setBinomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    username1: "",
    username2: "",
  });
  const { id } = useParams();
  useEffect(() => {
    // Fetch des binômes depuis le backend
    fetch("/binome_comission")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch binomes");
        }
        return response.json();
      })
      .then((binomesData) => {
        setBinomes(binomesData);
      })
      .catch((error) => {
        console.error("Error fetching binomes:", error);
      });
  }, []);

  // Filtrer les binômes en fonction des termes de recherche
  const filteredBinomes = binomes.filter(
    (binome) =>
      binome.Username_Nss1.toLowerCase().includes(
        searchTerm.username1.toLowerCase()
      ) &&
      binome.Username_Nss2.toLowerCase().includes(
        searchTerm.username2.toLowerCase()
      )
  );
  const columns = [
    {
      field: "Username_Nss1",
      headerName: "Secial Sucurity Number1",
      width: 250,
    },
    { field: "Enseignant1", headerName: "Teacher 1", width: 250 },
    {
      field: "Username_Nss2",
      headerName: "Secial Sucurity Number2",
      width: 250,
    },
    { field: "Enseignant2", headerName: "Teacher 2", width: 250 },
    { field: "Type_traitement", headerName: "document type", width: 250 },
  ];
  return (
    <>
      <div className="dashboard-container_vice">
        <nav className="nav_vice">
          <div className="navbar_vice">
            <div className="logo">
              <h1>Vice Doyen</h1>
            </div>
            <ul>
              <li>
                <Link to={`/Vice_deans/${id}/Profile`}> Profile</Link>
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
                  {" "}
                  Commission management
                </Link>
              </li>
              <li>
                <a href="#"> candidate files</a>
              </li>

              <li>
                <Link to="/LoginG"> Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="main-top">
          <div className="top">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by username1"
                value={searchTerm.username1}
                onChange={(e) =>
                  setSearchTerm({ ...searchTerm, username1: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Search by username2"
                value={searchTerm.username2}
                onChange={(e) =>
                  setSearchTerm({ ...searchTerm, username2: e.target.value })
                }
              />
              <i className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </i>
            </div>
          </div>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={headerCellStyle}>ID</th>
                <th style={headerCellStyle}>Username_Nss1</th>
                <th style={headerCellStyle}>Enseignant 1</th>
                <th style={headerCellStyle}>Username_Nss2</th>
                <th style={headerCellStyle}>Enseignant 2</th>
                <th style={headerCellStyle}>Type_traitement</th>
              </tr>
            </thead>
            <tbody>
              {filteredBinomes.map((binome, index) => (
                <React.Fragment key={binome.id}>
                  <tr>
                    <td style={cellStyle}>{binome.id}</td>
                    <td style={cellStyle}>{binome.Username_Nss1}</td>
                    <td style={cellStyle}>
                      {binome.Enseignant1
                        ? `${binome.Enseignant1.Firstname_fr} ${binome.Enseignant1.Lastname_fr}`
                        : "-"}
                    </td>
                    <td style={cellStyle}>{binome.Username_Nss2}</td>
                    <td style={cellStyle}>
                      {binome.Enseignant2
                        ? `${binome.Enseignant2.Firstname_fr} ${binome.Enseignant2.Lastname_fr}`
                        : "-"}
                    </td>
                    <td style={cellStyle}>{binome.Type_traitement}</td>
                  </tr>
                  {index < filteredBinomes.length - 1 && (
                    <tr style={separatorRowStyle}>
                      <td colSpan="6"></td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div style={{ height: 400, width: "130%" }}>
            <DataGrid rows={filteredBinomes} columns={columns} />
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
const separatorRowStyle = {
  height: "1px",
  backgroundColor: "#dddddd",
};

export default BinomesComponent;
