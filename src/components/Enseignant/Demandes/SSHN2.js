/*import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Axios from "axios";
import "../../Doctorant/Demande/inscription.css";
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

const Doc_dem_SSHN2 = ({ Username_NSS }) => {
  const [demande, setDemande] = useState({});
  const [updatedDemande, setUpdatedDemande] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const { Username } = useParams();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);

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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/SSHN/${Username}`
        );
        setDemande(response.data);
        setUpdatedDemande(response.data);
      } catch (error) {
        console.error("Error fetching demande data:", error);
      }
    };

    fetchDemande();
  }, [Username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDemande({ ...updatedDemande, [name]: value });
  };

  const handleUpdateDemande = async () => {
    const formData = new FormData();

    formData.append("Pays", updatedDemande.Pays);
    formData.append("Ville", updatedDemande.Ville);
    formData.append("Etablissement_acc", updatedDemande.Etablissement_acc);
    formData.append("Date_dep", updatedDemande.Date_dep);
    formData.append("Date_retour", updatedDemande.Date_retour);
    formData.append("Periode_Stage", updatedDemande.Periode_Stage);
    formData.append("certificat", selectedFile);
    try {
      const response = await axios.put(
        `http://localhost:3002/SSHN/${Username}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Mettez à jour l'état ou affichez un message de succès
    } catch (error) {
      console.error("Error updating demande:", error);
      // Affichez un message d'erreur
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

      <div className="container-inscri-SSHN2">
        <div className="container_info_SSHN2">
          <h1 className="h1-info">
            You can modify your destination informations
          </h1>
        </div>
        <form className="container_SSHN2">
          <h2 className="h1-SPE">Destination details</h2>
          <TextField
            label="Country"
            name="Pays"
            value={updatedDemande.Pays}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            name="Ville"
            value={updatedDemande.Ville}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Receiving Institution"
            name="Etablissement_acc"
            value={updatedDemande.Etablissement_acc}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Semester</InputLabel>
            <Select
              label="Semester"
              name="Periode_Stage"
              value={updatedDemande.Periode_Stage}
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>Select the semester</em>
              </MenuItem>
              <MenuItem value="Semester1">Semester1</MenuItem>
              <MenuItem value="Semester2">Semester2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            name="Date_dep"
            type="date"
            value={updatedDemande.Date_dep}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            name="Date_retour"
            type="date"
            value={updatedDemande.Date_retour}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
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
            startIcon={<CloudUploadIcon />}
            onClick={handleUpdateDemande}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Doc_dem_SSHN2;
*/
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Axios from "axios";
import "../../Doctorant/Demande/inscription.css";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
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

const Doc_dem_SSHN2 = ({ Username_NSS }) => {
  const [demande, setDemande] = useState({});
  const [updatedDemande, setUpdatedDemande] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const { Username } = useParams();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isOtherCity, setIsOtherCity] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

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
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (updatedDemande.Pays) {
      axios
        .get(
          `http://api.geonames.org/searchJSON?country=${updatedDemande.Pays}&featureClass=P&maxRows=1000&username=myaccount20`
        )
        .then((response) => {
          const cityNames = response.data.geonames.map((city) => city.name);
          setCities(cityNames);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  }, [updatedDemande.Pays]);

  const handleCityChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsOtherCity(true);
      setUpdatedDemande({ ...updatedDemande, Ville: "" }); // Clear the city field when "Other" is selected
    } else {
      setIsOtherCity(false);
      setUpdatedDemande({ ...updatedDemande, Ville: value });
    }
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/SSHN/${Username}`
        );
        setDemande(response.data);
        setUpdatedDemande(response.data);
        setDateRange([
          dayjs(response.data.Date_dep), // Assuming Date_dep is in ISO format or parsable by dayjs
          dayjs(response.data.Date_retour), // Assuming Date_retour is in ISO format or parsable by dayjs
        ]);
      } catch (error) {
        console.error("Error fetching demande data:", error);
      }
    };

    fetchDemande();
  }, [Username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDemande({ ...updatedDemande, [name]: value });
  };

  const handleUpdateDemande = async () => {
    const formData = new FormData();

    formData.append("Pays", updatedDemande.Pays);
    formData.append("Ville", updatedDemande.Ville);
    formData.append("Etablissement_acc", updatedDemande.Etablissement_acc);
    formData.append("Periode_Stage", updatedDemande.Periode_Stage);
    formData.append("Date_dep", dateRange[0]?.toISOString());
    formData.append("Date_retour", dateRange[1]?.toISOString());
    formData.append("certificat", selectedFile);
    try {
      const response = await axios.put(
        `http://localhost:3002/SSHN/${Username}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Mettez à jour l'état ou affichez un message de succès
    } catch (error) {
      console.error("Error updating demande:", error);
      // Affichez un message d'erreur
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
      {/* <div className="container_info">
        <h1>Important Information</h1>
        <p>You must select one of the destinations. </p>
        <p>You must upload the file containing:</p>
      </div>*/}

      <div className="container-inscri-SSHN2">
        <div className="container_info_SSHN2">
          <h1 className="h1-info">
            You can modify your destination informations
          </h1>
        </div>
        <form className="container_SSHN2">
          <h2 className="h1-SPE">Destination details</h2>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              name="Pays"
              value={updatedDemande.Pays || ""}
              onChange={handleInputChange}
              label="Country"
              fullWidth
              margin="normal"
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
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              id="city"
              name="Ville"
              value={updatedDemande.Ville || ""}
              onChange={handleCityChange}
              label="City"
              fullWidth
              margin="normal"
              disabled={!cities.length}
            >
              <MenuItem value="">
                <em>Select a city</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
              <MenuItem value="Other">
                <em>Other</em>
              </MenuItem>
            </Select>
          </FormControl>

          {isOtherCity && (
            <TextField
              id="otherCity"
              name="otherCity"
              label="Other City"
              variant="outlined"
              fullWidth
              margin="normal"
              value={updatedDemande.Ville}
              onChange={handleInputChange}
            />
          )}

          <TextField
            label="Receiving Institution"
            name="Etablissement_acc"
            value={updatedDemande.Etablissement_acc}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              labelId="semester-label"
              id="semester"
              name="Periode_Stage"
              value={updatedDemande.Periode_Stage || ""}
              onChange={handleInputChange}
              label="Semester"
              fullWidth
              margin="normal"
            >
              <MenuItem value="">
                <em>Select the semester</em>
              </MenuItem>
              <MenuItem value="Semester1">Semester 1</MenuItem>
              <MenuItem value="Semester2">Semester 2</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} fullWidth margin="normal" />
                  <TextField {...endProps} fullWidth margin="normal" />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>

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
            startIcon={<CloudUploadIcon />}
            onClick={handleUpdateDemande}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Doc_dem_SSHN2;
