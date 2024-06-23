import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Box, Button, Typography, TextField, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";
import "./vice.css";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  paddingLeft: "10px",
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,

  p: 4,
};

function Gerer_BP() {
  const { id } = useParams();
  const [annees, setAnnees] = useState([]);
  const [annee, setAnnee] = useState("");
  const [budgetGlobal, setBudgetGlobal] = useState("");
  const [historique, setHistorique] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchAnnees();
  }, []);

  const fetchAnnees = async () => {
    try {
      const response = await Axios.get("http://localhost:3002/annee");
      setAnnees(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateAnnee = async (e) => {
    e.preventDefault();
    if (isEdit) {
      try {
        const response = await Axios.put(
          `http://localhost:3002/annee/${selectedId}`,
          {
            Annee: parseInt(annee),
            Budget_global: parseFloat(budgetGlobal),
            Historique: historique,
          }
        );
        console.log("Annee updated:", response.data);
        fetchAnnees();
      } catch (error) {
        console.error("Error updating Annee:", error);
      }
    } else {
      try {
        const response = await Axios.post("http://localhost:3002/annee", {
          Annee: parseInt(annee),
          Budget_global: parseFloat(budgetGlobal),
          Historique: historique,
        });
        console.log("New Annee created:", response.data);
        fetchAnnees();
      } catch (error) {
        console.error("Error creating Annee:", error);
      }
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:3002/annee/${id}`);
      fetchAnnees();
    } catch (error) {
      console.error("Error deleting Annee:", error);
    }
  };

  const handleEdit = (row) => {
    setIsEdit(true);
    setSelectedId(row.id);
    setAnnee(row.Annee);
    setBudgetGlobal(row.Budget_global);
    setHistorique(row.Historique);
    handleOpen();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setAnnee("");
    setBudgetGlobal("");
    setHistorique("");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Annee", headerName: "Année", width: 100 },
    { field: "Budget_global", headerName: "Budget Global", width: 100 },
    { field: "Budget_ens", headerName: "Budget_enseignant", width: 100 },
    { field: "Budget_doc", headerName: "Budget_doctorant", width: 100 },
    {
      field: "Historique",
      headerName: "Historique",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          href={``}
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
          color="primary"
          onClick={() => handleEdit(params.row)}
          startIcon={<AutoFixNormalIcon />}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "Supprimer",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
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
              <Link to={`/Vice_deans/${id}/ListeC`}>
                <FolderCopyIcon style={{ marginRight: "9px" }} /> list of
                condidats
              </Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/Dossier`}>
                <FolderCopyIcon style={{ marginRight: "9px" }} /> students files
              </Link>
            </li>

            <li>
              <Link to={`/Vice_deans/:id/DossierEns`}>
                <GroupsIcon style={{ marginRight: "9px" }} /> Teachers files
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-top">
        <div className="top-vice"></div>

        <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={annees} columns={columns} pageSize={5} />
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ mt: 2, margin: "auto" }}
            style={{ marginBottom: "20px", fontSize: "14px", width: "20%" }}
          >
            ADD
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography variant="h6" component="h2" gutterBottom>
                {isEdit ? "Modifier une Année" : "Ajouter une Année"}
              </Typography>
              <form onSubmit={handleCreateAnnee}>
                <TextField
                  label="Year"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                  required
                />
                <TextField
                  label="Global Budget"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={budgetGlobal}
                  onChange={(e) => setBudgetGlobal(e.target.value)}
                  required
                />

                <p> Enter the archival history of the benifit condidate</p>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  value={historique}
                  onChange={(e) => setHistorique(e.target.value)}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                >
                  {isEdit ? "Update Annee" : "Create Annee"}
                </Button>
              </form>
            </Box>
          </Modal>
        </Box>
      </div>
    </div>
  );
}

export default Gerer_BP;
