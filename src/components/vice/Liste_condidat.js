import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import UpdateIcon from "@mui/icons-material/Update";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./vice.css";

const Liste_Condidat = () => {
  const [msiData, setMsiData] = useState([]);
  const [sshnData, setSshnData] = useState([]);
  const [speData, setSpeData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/liste_condidat"); // Assurez-vous que l'URL est correcte
        setMsiData(response.data.MSI);
        setSshnData(response.data.SSHN);
        setSpeData(response.data.SPE);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "Firstname",
      headerName: "First Name",
      width: 250,
    },
    {
      field: "Lastname",
      headerName: "Last Name",
      width: 250,
    },
    {
      field: "Grade",
      headerName: "Grade",
      width: 250,
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
        <div className="top-vice">
          <div className="search-bar_vice"></div>
        </div>
        <Box sx={{ height: 200, width: 900, paddingLeft: 30 }}>
          <Typography variant="h4" gutterBottom>
            Lists of participants
          </Typography>

          <Typography variant="h5" gutterBottom>
            MSI
          </Typography>
          <DataGrid
            rows={msiData.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            pageSize={5}
            autoHeight
            sx={{
              "& .MuiDataGrid-cell": {
                backgroundColor: "#afadad",
                color: "black",
              },
            }}
          />

          <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
            SSHN
          </Typography>
          <DataGrid
            rows={sshnData.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            pageSize={5}
            autoHeight
            sx={{
              "& .MuiDataGrid-cell": {
                backgroundColor: "#afadad",
                color: "black",
              },
            }}
          />

          <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
            SPE
          </Typography>
          <DataGrid
            rows={speData.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            pageSize={5}
            autoHeight
            sx={{
              "& .MuiDataGrid-cell": {
                backgroundColor: "#afadad",
                color: "black",
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default Liste_Condidat;

/*
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./vice.css";

const Liste_Condidat = () => {
  const [msiData, setMsiData] = useState([]);
  const [sshnData, setSshnData] = useState([]);
  const [speData, setSpeData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/liste_condidat"); // Assurez-vous que l'URL est correcte
        setMsiData(response.data.MSI);
        setSshnData(response.data.SSHN);
        setSpeData(response.data.SPE);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleExport = async () => {
    try {
      await axios.post("/export_to_sheet", { msiData, sshnData, speData });
      alert("Data exported to Google Sheets successfully.");
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data to Google Sheets.");
    }
  };

  const columns = [
    {
      field: "Firstname",
      headerName: "First Name",
      width: 150,
      cellClassName: "whiteBackground",
    },
    {
      field: "Lastname",
      headerName: "Last Name",
      width: 150,
      cellClassName: "whiteBackground",
    },
    {
      field: "Grade",
      headerName: "Grade",
      width: 150,
      cellClassName: "whiteBackground",
    },
  ];

  return (
    <div className="dashboard-container_vice">
      <nav className="nav_vice">
        <div className="navbar_vice">
          <div className="logo">
            <img src="/pic/logo.jpg" alt="Logo" />
            <h1>Logo</h1>
          </div>
          <ul>
            <li>
              <Link to={`/Vice_deans/${id}/Profile`}>
                <i
                  className="bi bi-person-circle"
                  style={{ marginRight: "20px" }}
                ></i>
                <span className="nav-item">Profile</span>
              </Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/binome`}>
                <span className="nav-item">Binome</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-user"></i>
                <span className="nav-item">Parameters management</span>
              </Link>
            </li>
            <li>
              <Link to={`/Vice_deans/${id}/comission`}>
                <span className="nav-item">Commission management</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-user"></i>
                <span className="nav-item">
                  Assignment of candidate files to the commission
                </span>
              </Link>
            </li>
            <li>
              <Link to="/LoginG">
                <i
                  className="bi bi-box-arrow-left"
                  style={{ marginRight: "5px" }}
                ></i>
                <span className="nav-item">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className="main">
        <Box sx={{ height: 1000, width: 1400, paddingLeft: 10 }}>
          <Typography variant="h4" gutterBottom>
            Commission Data
          </Typography>

          <Typography variant="h5" gutterBottom>
            MSI
          </Typography>
          <DataGrid
            rows={msiData.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            pageSize={5}
            autoHeight
            sx={{
              "& .MuiDataGrid-cell": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          />

          <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
            SSHN
          </Typography>
          <DataGrid
            rows={sshnData.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            pageSize={5}
            autoHeight
            sx={{
              "& .MuiDataGrid-cell": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          />

          <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
            SPE
          </Typography>
          <DataGrid
            rows={speData.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            pageSize={5}
            autoHeight
            sx={{
              "& .MuiDataGrid-cell": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleExport}
            style={{ marginTop: "2rem" }}
          >
            Export Data to Google Sheets
          </Button>
        </Box>
      </section>
    </div>
  );
};

export default Liste_Condidat;*/
