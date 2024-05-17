import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Demande/inscription.css";
import { NavLink, Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function Doc_dem_SPE() {
  //const history = useHistory();
  const { id } = useParams();
  const [u, setUsername_Mat] = useState("");
  const [p, setPays] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
  const [a, setAnnee] = useState("");
  const [d, setdebut] = useState("");
  const [f, setfin] = useState("");
  const addSPE = (e) => {
    e.preventDefault();
    if (!u || !p || !et || !pe || !a || !d || !f) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    Axios.post("http://localhost:3002/demande_SPE", {
      Username_Mat: u,
      Pays: p,
      Etablissement_acc: et,
      Periode_Stage: pe,
      Annee: a,
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
  };

  return (
    <div>
      <div>
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
        </form>
      </div>
    </div>
  );
}

export default Doc_dem_SPE;
