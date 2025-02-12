import { useState } from "react";
import "./Demande/inscription.css";
import { NavLink, Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import React from "react";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
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
  const [menuVisible, setMenuVisible] = useState(false);

  const [dateRange, setDateRange] = React.useState([dayjs(), dayjs()]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isOtherCity, setIsOtherCity] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const addSPE = async (e) => {
    e.preventDefault();
    if (
      !u ||
      !p ||
      !et ||
      !pe ||
      !dateRange[0] ||
      !dateRange[1] ||
      !selectedFile
    ) {
      alert("Veuillez remplir tous les champs et sélectionner un fichier");
      return;
    }
    if (!validateDates()) {
      return;
    }
    const formData = new FormData();
    formData.append("Username_Mat", u);
    formData.append("Pays", p);
    formData.append("Etablissement_acc", et);
    formData.append("Periode_Stage", pe);
    formData.append("Date_dep", dateRange[0]);
    formData.append("Date_retour", dateRange[1]);
    formData.append("certificat", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3002/demande_SPE",
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
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (p) {
      axios
        .get(
          `http://api.geonames.org/searchJSON?country=${p}&featureClass=P&maxRows=1000&username=myaccount20`
        )
        .then((response) => {
          const cityNames = response.data.geonames.map((city) => city.name);
          setCities(cityNames);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  }, [p]);

  const validateDates = () => {
    const today = dayjs();
    if (dateRange[0].isBefore(today, "day")) {
      alert("La date de début ne peut pas être inférieure à la date actuelle.");
      return false;
    }
    return true;
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
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="Country-label">Country</InputLabel>
            <Select
              labelId="Country-label"
              id="Country"
              name="Country"
              value={p}
              onChange={(e) => setPays(e.target.value)}
              label="Country"
            >
              <MenuItem value="">
                <em>Select a country</em>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.alpha2Code} value={country.alpha2Code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="receiving institution"
            name="receiving institution"
            label="receiving institution"
            variant="outlined"
            fullWidth
            margin="normal"
            value={et}
            onChange={(e) => setEtablissement(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="Semester-label">Semester</InputLabel>
            <Select
              labelId="Semester"
              id="Semester"
              name="Semester"
              value={pe}
              onChange={(e) => setPeriode(e.target.value)}
              label="Semester"
            >
              <MenuItem value="">
                <em>Select the semester</em>
              </MenuItem>
              <MenuItem value="Semeter1">Semeter1</MenuItem>
              <MenuItem value="Semeter2">Semeter2</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
              <DemoItem
                label="Internship Date Range"
                component="DateRangePicker"
              >
                <DateRangePicker
                  value={dateRange}
                  onChange={(newValue) => setDateRange(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <form>
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
          </form>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={addSPE}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Doc_dem_SPE;
