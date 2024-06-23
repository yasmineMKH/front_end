import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./inscription.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
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
function Doc_dem_SPE2() {
  const { Username } = useParams();
  const [u, setUsername_Mat] = useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const addSPE2 = async (e) => {
    e.preventDefault();
    if (!u || !selectedFile) {
      alert("Veuillez remplir tous les champs et sélectionner un fichier");
      return;
    }
    const formData = new FormData();
    formData.append("Username_Mat", u);
    formData.append("certificat", selectedFile);
    try {
      const response = await axios.put(
        "http://localhost:3002/demande_SPe2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log(response);
        alert("Add successful");
      } else {
        alert("Failed to add inscription");
      }
    } catch (error) {
      alert("Please try again later.");
      console.error("Error adding inscription:", error);
    }
  };
  /*const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };*/

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Récupération des fichiers au montage du composant

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
            <a className="nav_link" href="#">
              Profil{" "}
              <i class="bx bxs-user-detail" style={{ marginRight: "20px" }}></i>
            </a>
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
                      <Link to={`/${Username}/Page_SPE`}>
                        <span className="nav-item">
                          Stage de perfectionnent à l'étrangé
                        </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>

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
      <div className="container-form1">
        <form className="container1">
          <h1 className="h1-SPE">
            Form for the application for an internship abroad.
          </h1>
          <form onSubmit={addSPE2}>
            <TextField
              id="usernameMat"
              name="usernameMat"
              label="Username_Mat"
              variant="outlined"
              fullWidth
              margin="normal"
              value={u}
              onChange={(e) => setUsername_Mat(e.target.value)}
            />
            <p className="sedan-regular3">
              Enter your school certificate form pdf
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
              onClick={addSPE2}
            >
              Send
            </Button>
          </form>
        </form>
      </div>
    </div>
  );
}

export default Doc_dem_SPE2;
