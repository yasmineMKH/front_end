import { useState } from "react";
import "./Demande/inscription.css";
import { NavLink, Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
function Doc_dem_SPE() {
  //const history = useHistory();
  const { Username } = useParams();
  const [u, setUsername_Mat] = useState("");
  const [p, setPays] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
  
  const [d, setdebut] = useState("");
  const [f, setfin] = useState("");
<<<<<<< HEAD
  const [menuVisible, setMenuVisible] = useState(false);
      
    const toggleMenu = () => {
          setMenuVisible(!menuVisible);
        };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:3002/${Username}/demande_SPE`, {
=======
  const addSPE = async (e) => {
    e.preventDefault();
    if (!u || !p || !et || !pe || !a || !d || !f) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    Axios.post("http://localhost:3002/demande_SPE", {
      Username_Mat: u,
>>>>>>> 0aabe4d63021a2e010493cf655258c87c9085834
      Pays: p,
      Etablissement_acc: et,
      Periode_Stage: pe,
      
      Date_dep: d,
      Date_retour: f,
    })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          alert("Add successful");
        } else {
          return res.json().then((data) => {
            alert("Failed to add inscription");
          });
        }
      })
      .catch((error) => {
        alert("Please try again later.");
        console.error("Error adding inscription:");
      });
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
  };
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div>
      <header>
    <nav className='nav_home_doc'>
        <div className='lab'>
            <a href='#'>Logo</a>
        </div>
        <div className='toggle_menu'>
        <i class='bx bx-grid-alt'></i>
        </div>
        <ul className='nav_list'></ul>
        <div className='close_menu'>
        <i class='bx bx-x'></i>
        </div>
        <li className='nav_item'><a className='nav_link' href="#"> <i class='bx bx-home'></i></a></li>
        <li className='nav_item'><a className='nav_link' href="#">Profile <i class='bx bxs-user-detail' style={{ marginRight: '20px' }}></i></a></li>
        <li className='nav_item'><a className='nav_link' href="#">Faculty</a></li>
        <li className='nav_item'><a className='nav_link dropdown_link' href="#" onClick={toggleMenu}>Formation <i class='bx bx-chevron-down'></i></a>
        {menuVisible && (
        <div className='megamenu'>
            <ul className='content'>
                <li className='megamenu_item header_megamenu'></li>
                <li className='megamenu_item'>
                    <div className='menu_icone'>

                    </div>
                    <div className='menu_link'>
                    <Link to={`/Page_SPE/${Username}`}>
        
        <span className="nav-item">Stage de perfectionnent à l'étrangé</span>
    </Link>
                        
                        
                    </div>
                </li>

            </ul>

        </div>
        )}
        </li>
        <li className='nav_item'><a className='nav_link' href="#">About</a></li>
        <li className='nav_item'><a className='nav_link' href="#">Contact Us</a></li>
        <li className='nav_item'> <Link className='nav_link' to="/Login"> <i className="fas fa-user"></i><span className="nav-item">Logout <i class="bi bi-box-arrow-left"></i></span></Link></li>


    </nav>

</header>
      <div>
<<<<<<< HEAD
        <h1>Formulaire de la demande de Stage de perfectionnent à l'étrangé</h1>
        <form>
          {/*<label htmlFor="Username_Mat">Username_Mat:</label>
          <input
            type="text"
            name="Username_Mat"
            onChange={(e) => setUsername_Mat(e.target.value)}
      />*/}

          <label htmlFor="Pays">Pays:</label>
          <input
            type="text"
            name="Pays"
=======
        <h1 className="h1-inscri">
          Formulaire de la demande de Stage de perfectionnent à l'étrangé
        </h1>
        <form className="body-inscri">
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
          <TextField
            id="pays"
            name="pays"
            label="Pays"
            variant="outlined"
            fullWidth
            margin="normal"
            value={p}
>>>>>>> 0aabe4d63021a2e010493cf655258c87c9085834
            onChange={(e) => setPays(e.target.value)}
          />

          <TextField
            id="etablissement"
            name="etablissement"
            label="Etablissement d'accueil"
            variant="outlined"
            fullWidth
            margin="normal"
            value={et}
            onChange={(e) => setEtablissement(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="periode-label">Période</InputLabel>
            <Select
              labelId="periode-label"
              id="periode"
              name="periode"
              value={pe}
              onChange={(e) => setPeriode(e.target.value)}
              label="Période"
            >
              <MenuItem value="">
                <em>Sélectionnez la période</em>
              </MenuItem>
              <MenuItem value="Semetre1">Semetre1</MenuItem>
              <MenuItem value="Semetre2">Semetre2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="dateDebut"
            name="dateDebut"
            label="Date de début du stage"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={d}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setdebut(e.target.value)}
          />
          <TextField
            id="dateFin"
            name="dateFin"
            label="Date de fin du stage"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={f}
            onChange={(e) => setfin(e.target.value)}
          />
<<<<<<< HEAD

          <button onClick={handleSubmit}>Envoyer</button>
=======
          <TextField
            id="anneeBourse"
            name="anneeBourse"
            label="Année Bénéfice de bourse"
            variant="outlined"
            fullWidth
            margin="normal"
            value={a}
            onChange={(e) => setAnnee(e.target.value)}
          />
          <form>
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
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={addSPE}
          >
            Envoyer
          </Button>
>>>>>>> 0aabe4d63021a2e010493cf655258c87c9085834
        </form>
      </div>
    </div>
  );
}

export default Doc_dem_SPE;
