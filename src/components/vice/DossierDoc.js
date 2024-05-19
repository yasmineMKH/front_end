import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import "./vice.css";

function DossierDoc() {
  const { id } = useParams();
  const [demande, setDemande] = useState([]);
  const [binomes, setBinomes] = useState([]);
  const [selectedBinomes, setSelectedBinomes] = useState({});
  const [validated, setValidated] = useState({});

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get("/demande");
        setDemande(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBinomes = async () => {
      try {
        const response = await axios.get("/binomes_doc");
        setBinomes(response.data);
      } catch (error) {
        console.error("Error fetching binomes:", error);
      }
    };

    fetchDemandes();
    fetchBinomes();
  }, []);

  const handleBinomeSelect = (event, demandeId) => {
    const { value } = event.target;
    setSelectedBinomes((prev) => ({ ...prev, [demandeId]: value }));
  };

  const handleValidate = async (demandeId) => {
    const selectedBinome = selectedBinomes[demandeId];
    if (!selectedBinome) return;

    const [id_binome, Username_Nss1, Username_Nss2] = selectedBinome.split("-");

    try {
      await axios.post("/demande/affectation", {
        id: demandeId,
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
    { field: "Username_Mat", headerName: "Social Security Number", width: 130 },
    { field: "Pays", headerName: "Destination", width: 130 },
    {
      field: "Etablissement_acc",
      headerName: "Receiving facility",
      width: 130,
    },
    { field: "Date_dep", headerName: "Commencement date", width: 130 },
    { field: "Date_retour", headerName: "Completion date", width: 130 },
    { field: "Periode_Stage", headerName: "Internship period", width: 130 },
    { field: "Annee", headerName: "Year of eligibility", width: 130 },
    { field: "Certificat", headerName: "Certificat Document", width: 130 },
    {
      field: "Binome",
      headerName: "Binome",
      width: 200,
      renderCell: (params) => (
        <select
          value={selectedBinomes[params.row.id] || ""}
          onChange={(e) => handleBinomeSelect(e, params.row.id)}
        >
          <option value="">Sélectionnez un binome</option>
          {binomes.map((binome) => (
            <option
              key={binome.id}
              value={`${binome.Username_Nss1}-${binome.Username_Nss2}`}
            >
              {binome.id} - {binome.Username_Nss1} - {binome.Username_Nss2}
            </option>
          ))}
        </select>
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
          <div className="logo"></div>
          <ul>
            <li>
              <Link to={`/Vice_deans/${id}/Profile`}>Vice Doyen</Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/binome`}>Binome</Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/teachers`}>Teachers</Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/students`}>Students</Link>
            </li>
            <li>
              <a href="#">Parameters</a>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/comission`}>Commission</Link>
            </li>
            <li>Candidate files</li>
            <li>
              <Link to="/LoginG">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={demande} columns={columns} />
      </div>
    </div>
  );
}

export default DossierDoc;
