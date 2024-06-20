/*import { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
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

function Doc_dem_MSI1() {
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
    if (!u || !p || !v || !et || !pe || !d || !f || !tc || !tr || !fr) {
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
      Theme_communication: tc,
      Theme_rencontre: tr,
      frais: fr,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/Destination",
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
      <div className="container-inscri-MSI">
        <div className="container_info_MSI">
          <h1 className="h1-info">
            This form can be submitted up to four times depending on the number
            of desired destinations; any destinations beyond four will not be
            accepted
          </h1>
        </div>
        <form className="container_MSI">
          <h1 className="h1-SPE">
            Form for the application for an International Scientific Event
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
          <TextField
            id="themeCommunication"
            name="themeCommunication"
            label="Theme of Communication"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tc}
            onChange={(e) => setThemeCommunication(e.target.value)}
          />
          <TextField
            id="themeRencontre"
            name="themeRencontre"
            label="Theme of Meeting"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tr}
            onChange={(e) => setThemeRencontre(e.target.value)}
          />
          <TextField
            id="frais"
            name="frais"
            label="Expenses"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fr}
            onChange={(e) => setFrais(e.target.value)}
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

export default Doc_dem_MSI1;
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

function Doc_dem_MSI1() {
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
    if (
      !u ||
      !p ||
      !v ||
      !et ||
      !pe ||
      !dateRange[0] ||
      !dateRange[1] ||
      !tc ||
      !tr ||
      !fr
    ) {
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
      Theme_communication: tc,
      Theme_rencontre: tr,
      frais: fr,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/Destination",
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
      <div className="container-inscri-MSI">
        <div className="container_info_MSI">
          <h1 className="h1-info">
            This form can be submitted up to four times depending on the number
            of desired destinations; any destinations beyond four will not be
            accepted
          </h1>
        </div>
        <form className="container_MSI">
          <h1 className="h1-SPE">
            Form for the application for an International Scientific Event
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

          <TextField
            id="themeCommunication"
            name="themeCommunication"
            label="Theme of Communication"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tc}
            onChange={(e) => setThemeCommunication(e.target.value)}
          />
          <TextField
            id="themeRencontre"
            name="themeRencontre"
            label="Theme of Meeting"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tr}
            onChange={(e) => setThemeRencontre(e.target.value)}
          />
          <TextField
            id="frais"
            name="frais"
            label="Expenses"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fr}
            onChange={(e) => setFrais(e.target.value)}
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

export default Doc_dem_MSI1;
*/
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
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

function Doc_dem_MSI1() {
  const { Username } = useParams();
  const [u, setUsername_NSS] = useState("");
  const [p, setPays] = useState("");
  const [v, setVille] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
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
    const currentDate = dayjs();
    const startDate = dateRange[0];

    if (startDate.isBefore(currentDate, "day")) {
      alert("The start date cannot be in the past.");
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
    if (
      !u ||
      !p ||
      !v ||
      !et ||
      !pe ||
      !dateRange[0] ||
      !dateRange[1] ||
      !tc ||
      !tr ||
      !fr
    ) {
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
      Theme_communication: tc,
      Theme_rencontre: tr,
      frais: fr,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/Destination",
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
      <div className="container-inscri-MSI">
        <div className="container_info_MSI">
          <h1 className="h1-info">
            This form can be submitted up to four times depending on the number
            of desired destinations; any destinations beyond four will not be
            accepted
          </h1>
        </div>
        <form className="container_MSI">
          <h1 className="h1-SPE">
            Form for the application for an International Scientific Event
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

          <TextField
            id="themeCommunication"
            name="themeCommunication"
            label="Theme of Communication"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tc}
            onChange={(e) => setThemeCommunication(e.target.value)}
          />
          <TextField
            id="themeRencontre"
            name="themeRencontre"
            label="Theme of Meeting"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tr}
            onChange={(e) => setThemeRencontre(e.target.value)}
          />
          <TextField
            id="frais"
            name="frais"
            label="Expenses"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fr}
            onChange={(e) => setFrais(e.target.value)}
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

export default Doc_dem_MSI1;

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

function Doc_dem_MSI1() {
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
    fetchCountries();
  }, [Username]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryNames = response.data
        .map((country) => country.name.common)
        .filter((country) => country !== "Israel" && country !== "Morocco");
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchCities = async (country) => {
    try {
      const response = await axios.get(`https://api.cities.example/${country}`); // Remplacer par une API réelle
      const cityNames = response.data.map((city) => city.name);
      setCities(cityNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setPays(selectedCountry);
    fetchCities(selectedCountry);
  };

  const validateDates = () => {
    const currentDate = dayjs();
    const startDate = dateRange[0];

    if (startDate.isBefore(currentDate, "day")) {
      alert("The start date cannot be in the past.");
      return false;
    }
    return true;
  };

  const addSPE = async (e) => {
    e.preventDefault();
    if (
      !u ||
      !p ||
      !v ||
      !et ||
      !pe ||
      !dateRange[0] ||
      !dateRange[1] ||
      !tc ||
      !tr ||
      !fr
    ) {
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
      Theme_communication: tc,
      Theme_rencontre: tr,
      frais: fr,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/Destination",
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
                <i class="bx bx-log-out-circle bx-rotate-180"></i>
              </span>
            </Link>
          </li>
        </nav>
      </header>

      <div className="boddy">
        <form className="formS">
          <h3 className="titre">
            Request to participate in a scientific event
          </h3>
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={u}
            onChange={(e) => setUsername_NSS(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country"
              id="country"
              name="country"
              value={p}
              onChange={handleCountryChange}
              label="Country"
            >
              <MenuItem value="">
                <em>Select the country</em>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city"
              id="city"
              name="city"
              value={v}
              onChange={(e) => setVille(e.target.value)}
              label="City"
            >
              <MenuItem value="">
                <em>Select the city</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="receiving institution"
            name="receiving institution"
            label="Receiving Institution"
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
              <MenuItem value="Semester1">Semester 1</MenuItem>
              <MenuItem value="Semester2">Semester 2</MenuItem>
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

          <TextField
            id="themeCommunication"
            name="themeCommunication"
            label="Theme of Communication"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tc}
            onChange={(e) => setThemeCommunication(e.target.value)}
          />
          <TextField
            id="themeRencontre"
            name="themeRencontre"
            label="Theme of Meeting"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tr}
            onChange={(e) => setThemeRencontre(e.target.value)}
          />
          <TextField
            id="frais"
            name="frais"
            label="Expenses"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fr}
            onChange={(e) => setFrais(e.target.value)}
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

export default Doc_dem_MSI1;
*/
/*import React, { useState, useEffect } from "react";
import axios from "axios";

// Composant pour sélectionner le pays
const SelectCountry = ({ countries, selectedCountry, onCountryChange }) => {
  return (
    <div>
      <label htmlFor="country">Pays: </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        <option value="">Sélectionner un pays</option>
        {countries.map((country) => (
          <option key={country.alpha2Code} value={country.alpha2Code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Composant pour sélectionner la ville
const SelectCity = ({ cities, selectedCity, onCityChange }) => {
  return (
    <div>
      <label htmlFor="city">Ville: </label>
      <select
        id="city"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        disabled={!cities.length}
      >
        <option value="">Sélectionner une ville</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Récupérer la liste des pays
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Récupérer les villes du pays sélectionné
      axios
        .get(
          `http://api.geonames.org/searchJSON?country=${selectedCountry}&featureClass=P&maxRows=1000&username=myaccount20`
        )
        .then((response) => {
          const cityNames = response.data.geonames.map((city) => city.name);
          setCities(cityNames);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(""); // Réinitialise la ville sélectionnée lorsque le pays change
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h1>Choisissez votre Pays et Ville</h1>
      <SelectCountry
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={handleCountryChange}
      />
      <SelectCity
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
      />
    </div>
  );
};

export default App;
*/
