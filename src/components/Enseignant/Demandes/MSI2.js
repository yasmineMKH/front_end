import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import "../../Doctorant/Demande/inscription.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
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
});
function Doc_dem_MSI2() {
  const { Username } = useParams();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
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
    // Fetch all destinations for the user
    const fetchDestinations = async () => {
      console.log(Username);
      try {
        const response = await axios.get(
          `http://localhost:3002/destinations/${Username}`
        );
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, [Username]);

  const handleSelectDestination = async (destination) => {
    setSelectedDestination(destination);
  };

  const handleAddToMSI = async () => {
    if (!selectedDestination) {
      alert("Please select a destination.");
      return;
    }

    const formData = new FormData();
    formData.append("certificat", selectedFile);
    formData.append("Username_NSS", selectedDestination.Username_NSS);
    formData.append("Pays", selectedDestination.Pays);
    formData.append("Ville", selectedDestination.Ville);
    formData.append("Etablissement_acc", selectedDestination.Etablissement_acc);
    formData.append("Date_dep", selectedDestination.Date_dep);
    formData.append("Date_retour", selectedDestination.Date_retour);
    formData.append("Periode_Stage", selectedDestination.Periode_Stage);
    formData.append(
      "Theme_communication",
      selectedDestination.Theme_communication
    );
    formData.append("Theme_rencontre", selectedDestination.Theme_rencontre);
    formData.append("frais", selectedDestination.frais);

    try {
      const response = await axios.post(
        "http://localhost:3002/msi2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Destination added to MSI successfully");
      } else {
        alert("Failed to add destination to MSI");
      }
    } catch (error) {
      alert("Please try again later.");
      console.error("Error adding destination to MSI:", error);
    }
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div>
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
            <Link className="nav_link" to={`/profileEnseignant/${Username}`}>
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
      <div className="container-inscri-MSI2">
        <div className="container_info_MSI2">
          <h1 className="h1-info">You must select your final destination</h1>
        </div>
        <div className="container_MSI2">
          <h1 className="h1-SPE"> Select a Destination</h1>
          <List>
            {destinations.map((destination) => (
              <ListItem
                key={destination.id}
                button
                onClick={() => handleSelectDestination(destination)}
                selected={
                  selectedDestination &&
                  selectedDestination.id === destination.id
                }
              >
                <ListItemText
                  primary={`${destination.Pays}, ${destination.Ville}`}
                  secondary={`${destination.Etablissement_acc} - ${destination.Periode_Stage}- ${destination.Date_dep}- ${destination.Date_retour}- ${destination.Theme_communication}- ${destination.Theme_rencontre}- ${destination.frais}`}
                />
              </ListItem>
            ))}
          </List>
          <form>
            <p className="sedan-regular3">
              You must enter your documents in a single PDF file
            </p>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={handleFileSelect}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            {selectedFile && <p>{selectedFile.name}</p>}
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToMSI}
            disabled={!selectedDestination}
            style={{ marginTop: "20px" }}
          >
            Add to MSI
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Doc_dem_MSI2;
