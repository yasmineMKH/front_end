/*import { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import axios from "axios";
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
import Axios from "axios";

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

function Doc_dem_SSHN1() {
  const { Username } = useParams();
  const [u, setUsername_NSS] = useState("");
  const [p, setPays] = useState("");
  const [v, setVille] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
  const [d, setdebut] = useState("");
  const [f, setfin] = useState("");
  const [tc, setThemeCommunication] = useState("");
  const [tr, setThemeRencontre] = useState("");
  const [fr, setFrais] = useState("");
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

  const addSPE = async (e) => {
    e.preventDefault();
    if (!u || !p || !v || !et || !pe || !d || !f) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const data = {
      Username_NSS: u,
      Pays: p,
      Ville: v,
      Etablissement_acc: et,
      Periode_Stage: pe,
      Date_dep: d,
      Date_retour: f,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/add/SSHN",
        data,
        {
          headers: {
            "Content-Type": "application/json",
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
      <div className="container-inscri-SSHN">
        <div className="container_info_SSHN">
          <h1 className="h1-info">
            This form can be submitted up to four times depending on the number
            of desired destinations; any destinations beyond four will not be
            accepted
          </h1>
        </div>
        <form className="container_SSHN">
          <h1 className="h1-SPE">
            Form for the application for an High-level short-term scientific
            stay
          </h1>

          <TextField
            id="usernameNSS"
            name="usernameNSS"
            label="Username_NSS"
            variant="outlined"
            fullWidth
            margin="normal"
            value={u}
            onChange={(e) => setUsername_NSS(e.target.value)}
          />
          <TextField
            id="Country"
            name="Country"
            label="Country"
            variant="outlined"
            fullWidth
            margin="normal"
            value={p}
            onChange={(e) => setPays(e.target.value)}
          />
          <TextField
            id="City"
            name="City"
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            value={v}
            onChange={(e) => setVille(e.target.value)}
          />
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
          <TextField
            id="start date"
            name="start date"
            label="start date of the internship"
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
            id="end date"
            name="end date"
            label="end date of the internship"
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

export default Doc_dem_SSHN1;
*/

/*
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import axios from "axios";
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
import Axios from "axios";

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

function Doc_dem_SSHN1() {
  const { Username } = useParams();
  const [u, setUsername_NSS] = useState("");
  const [p, setPays] = useState("");
  const [v, setVille] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
  const [d, setdebut] = useState("");
  const [f, setfin] = useState("");
  const [tc, setThemeCommunication] = useState("");
  const [tr, setThemeRencontre] = useState("");
  const [fr, setFrais] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
  const [dateRange, setDateRange] = React.useState([dayjs(), dayjs()]);
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

  const addSPE = async (e) => {
    e.preventDefault();
    if (!u || !p || !v || !et || !pe || !dateRange[0] || !dateRange[1]) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const data = {
      Username_NSS: u,
      Pays: p,
      Ville: v,
      Etablissement_acc: et,
      Periode_Stage: pe,
      Date_dep: dateRange[0].format("YYYY-MM-DD"),
      Date_retour: dateRange[1].format("YYYY-MM-DD"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/add/SSHN",
        data,
        {
          headers: {
            "Content-Type": "application/json",
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
      <div className="container-inscri-SSHN">
        <div className="container_info_SSHN">
          <h1 className="h1-info">
            This form can be submitted up to four times depending on the number
            of desired destinations; any destinations beyond four will not be
            accepted
          </h1>
        </div>
        <form className="container_SSHN">
          <h1 className="h1-SPE">
            Form for the application for an High-level short-term scientific
            stay
          </h1>

          <TextField
            id="usernameNSS"
            name="usernameNSS"
            label="Username_NSS"
            variant="outlined"
            fullWidth
            margin="normal"
            value={u}
            onChange={(e) => setUsername_NSS(e.target.value)}
          />
          <TextField
            id="Country"
            name="Country"
            label="Country"
            variant="outlined"
            fullWidth
            margin="normal"
            value={p}
            onChange={(e) => setPays(e.target.value)}
          />
          <TextField
            id="City"
            name="City"
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            value={v}
            onChange={(e) => setVille(e.target.value)}
          />
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

export default Doc_dem_SSHN1;*/

import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import axios from "axios";
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
import Axios from "axios";

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

function Doc_dem_SSHN1() {
  const { Username } = useParams();
  const [u, setUsername_NSS] = useState("");
  const [p, setPays] = useState("");
  const [v, setVille] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
  const [d, setdebut] = useState("");
  const [f, setfin] = useState("");
  const [tc, setThemeCommunication] = useState("");
  const [tr, setThemeRencontre] = useState("");
  const [fr, setFrais] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
  const [dateRange, setDateRange] = React.useState([dayjs(), dayjs()]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isOtherCity, setIsOtherCity] = useState(false);
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

  const handleCityChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsOtherCity(true);
      setVille(""); // Clear the city field when "Other" is selected
    } else {
      setIsOtherCity(false);
      setVille(value);
    }
  };

  const addSPE = async (e) => {
    e.preventDefault();
    if (!u || !p || !v || !et || !pe || !dateRange[0] || !dateRange[1]) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!validateDates()) {
      return;
    }

    const data = {
      Username_NSS: u,
      Pays: p,
      Ville: v,
      Etablissement_acc: et,
      Periode_Stage: pe,
      Date_dep: dateRange[0].format("YYYY-MM-DD"),
      Date_retour: dateRange[1].format("YYYY-MM-DD"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/add/SSHN",
        data,
        {
          headers: {
            "Content-Type": "application/json",
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
      <div className="container-inscri-SSHN">
        <div className="container_info_SSHN">
          <h1 className="h1-info">
            This form can be submitted up to four times depending on the number
            of desired destinations; any destinations beyond four will not be
            accepted
          </h1>
        </div>
        <form className="container_SSHN">
          <h1 className="h1-SPE">
            Form for the application for an High-level short-term scientific
            stay
          </h1>

          <TextField
            id="usernameNSS"
            name="usernameNSS"
            label="Username_NSS"
            variant="outlined"
            fullWidth
            margin="normal"
            value={u}
            onChange={(e) => setUsername_NSS(e.target.value)}
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
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="City-label">City</InputLabel>
            <Select
              labelId="City-label"
              id="City"
              name="City"
              value={v}
              onChange={handleCityChange}
              label="City"
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
              value={v}
              onChange={(e) => setVille(e.target.value)}
            />
          )}
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

export default Doc_dem_SSHN1;
