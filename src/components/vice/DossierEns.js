import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import "./vice.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Select, MenuItem } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LockResetIcon from "@mui/icons-material/LockReset";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
function DossierEns() {
  const { id } = useParams();
  const [demande, setDemandes] = useState([]);
  const [binomes, setBinomes] = useState([]);
  const [selectedBinomes, setSelectedBinomes] = useState({});
  const [validated, setValidated] = useState({});
  const [demandesSSHN, setDemandesSSHN] = useState([]);

  useEffect(() => {
    const fetchDemandes_MSI = async () => {
      try {
        const response = await axios.get("/demande_MSI");
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

    const fetchBinomes = async () => {
      try {
        const response = await axios.get("/binomes_ens");
        setBinomes(response.data);
      } catch (error) {
        console.error("Error fetching binomes:", error);
      }
    };

    fetchDemandes_MSI();
    fetchBinomes();
  }, []);

  const renderPdfButton = (url) => (
    <Button
      variant="contained"
      color="error"
      href={"http://localhost:3002/uploadfile/url"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PictureAsPdfIcon />
    </Button>
  );

  const handleBinomeSelect = (event, demandeId) => {
    const { value } = event.target;
    setSelectedBinomes((prev) => ({ ...prev, [demandeId]: value }));
  };

  const handleValidate = async (demandeId) => {
    const selectedBinome = selectedBinomes[demandeId];
    if (!selectedBinome) return;

    const [id_binome, Username_Nss1, Username_Nss2] = selectedBinome.split("-");

    try {
      const endpoint = demandeId.startsWith("MSI-")
        ? "/demande/affectation_MSI"
        : "/demande/affectation_SSHN";

      await axios.post(endpoint, {
        id: demandeId.replace("MSI-", "").replace("SSHN-", ""),
        id_binome,
        Username_Nss1,
        Username_Nss2,
      });

      setValidated((prev) => ({ ...prev, [demandeId]: true }));
      alert("Demande validée avec succès");
    } catch (error) {
      console.error("Error validating demande:", error);
      alert("Erreur lors de la validation de la demande");
    }
  };

  const columns = [
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
    {
      field: "Binome",
      headerName: "Pair",
      width: 150,

      renderCell: (params) => (
        <Select
          fullWidth
          margin="normal"
          value={selectedBinomes[params.row.id] || ""}
          onChange={(e) => handleBinomeSelect(e, params.row.id)}
        >
          <MenuItem value="" disabled>
            Select a pair
          </MenuItem>
          {binomes.map((binome) => (
            <MenuItem
              key={binome.id}
              value={`${binome.id}-${binome.Username_Nss1}-${binome.Username_Nss2}`}
            >
              {" "}
              {binome.id} - {binome.Username_Nss1} - {binome.Username_Nss2}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleValidate(params.row.id)}
          disabled={validated[params.row.id]}
        >
          {validated[params.row.id] ? "Validé" : "Validé"}
        </Button>
      ),
    },
  ];

  return (
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
              <Link to={`/Vice_deans/${id}/DossierEns`}>
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
        <div className="top-vice"></div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={demande} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default DossierEns;
/*
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import "./vice.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Select, MenuItem } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LockResetIcon from "@mui/icons-material/LockReset";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function DossierEns() {
  const { id } = useParams();
  const [demande, setDemandes] = useState([]);
  const [binomes, setBinomes] = useState([]);
  const [selectedBinomes, setSelectedBinomes] = useState({});
  const [validated, setValidated] = useState({});
  const [demandesSSHN, setDemandesSSHN] = useState([]);

  useEffect(() => {
    const fetchDemandes_MSI = async () => {
      try {
        const response = await axios.get("/demande_MSI");
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

        const currentDemande = allDemandes.find((demande) => demande.id === id);
        if (currentDemande) {
          const fetchBinomes = async () => {
            try {
              const response = await axios.get("/binomes_ens");
              const filteredBinomes = response.data.filter(
                (binome) =>
                  currentDemande.Username_NSS !== binome.Username_Nss1 &&
                  currentDemande.Username_NSS !== binome.Username_Nss2
              );
              setBinomes(filteredBinomes);
            } catch (error) {
              console.error("Error fetching binomes:", error);
            }
          };
          fetchBinomes();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDemandes_MSI();
  }, [id]);

  const renderPdfButton = (url) => (
    <Button
      variant="contained"
      color="error"
      href={"http://localhost:3002/uploadfile/url"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PictureAsPdfIcon />
    </Button>
  );

  const handleBinomeSelect = (event, demandeId) => {
    const { value } = event.target;
    setSelectedBinomes((prev) => ({ ...prev, [demandeId]: value }));
  };

  const handleValidate = async (demandeId) => {
    const selectedBinome = selectedBinomes[demandeId];
    if (!selectedBinome) return;

    const [id_binome, Username_Nss1, Username_Nss2] = selectedBinome.split("-");

    try {
      const endpoint = demandeId.startsWith("MSI-")
        ? "/demande/affectation_MSI"
        : "/demande/affectation_SSHN";

      await axios.post(endpoint, {
        id: demandeId.replace("MSI-", "").replace("SSHN-", ""),
        id_binome,
        Username_Nss1,
        Username_Nss2,
      });

      setValidated((prev) => ({ ...prev, [demandeId]: true }));
      alert("Demande validée avec succès");
    } catch (error) {
      console.error("Error validating demande:", error);
      alert("Erreur lors de la validation de la demande");
    }
  };

  const columns = [
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
    {
      field: "Binome",
      headerName: "Pair",
      width: 150,
      renderCell: (params) => (
        <Select
          fullWidth
          margin="normal"
          value={selectedBinomes[params.row.id] || ""}
          onChange={(e) => handleBinomeSelect(e, params.row.id)}
        >
          <MenuItem value="" disabled>
            Select a pair
          </MenuItem>
          {binomes.map((binome) => (
            <MenuItem
              key={binome.id}
              value={`${binome.id}-${binome.Username_Nss1}-${binome.Username_Nss2}`}
            >
              {`${binome.id} - ${binome.Username_Nss1} - ${binome.Username_Nss2}`}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleValidate(params.row.id)}
          disabled={validated[params.row.id]}
        >
          {validated[params.row.id] ? "Validé" : "Validé"}
        </Button>
      ),
    },
  ];

  return (
    <div className="dashboard-container_vice">
      <nav className="nav_vice">
        <div className="navbar_vice">
          <div className="logo-vice">
            <h1 className="sedan-regular">Faculty of Chemistry</h1>
            <div>
              <hr className="divider" />
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
        <div className="top-vice"></div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={demande} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default DossierEns;
*/
