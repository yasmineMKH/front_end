// Home.js
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Image from "./vice/Pic/image-news.jpg";
import Image1 from "./USTHB.jpg";
const steps = [
  {
    label: "Event",
    description: `We are pleased to invite you to attend an interactive study day on the topic “University Student Participation in Local
    .Student today……. Entrepreneur tomorrow`,
    date: "2024-04-15",
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    date: "2024-04-25",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    date: "2024-04-28",
  },
];
function Home() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1) setActiveStep(0);
    else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) setActiveStep(maxSteps - 1);
    else setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Axios.get(`http://localhost:3002/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUser();
  }, [id]);
  return (
    /*<div class="container_home">
  <header className='header_Home'>
    <div id="diaporama">
      <div class="diaporama-inner">
        <div class="diaporama-slide" style={{backgroundImage: "url('../background.jpg')"}}></div>
        <div class="diaporama-slide" style={{backgroundImage: "url('/images/slide2.jpg')"}}></div>
        
      </div>
    </div>
  </header>

  <nav>
    <div class="logo">
      <a href="#">Logo</a>
    </div>
    <div class="navbar_home">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Faculté</a></li>
        <li><a href="#">Formation</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact Us</a></li>
        
      </ul>
    </div>
  </nav>

  <div class="body-content">
    <div class="b-title">
    <div>
          {user && (
            <div>
              <h1>Welcome, {user.Username}!</h1>
              <p>Email: {user.Email}</p>
              <p>Role: {user.Role}</p>
              
            </div>
          )}
        </div> 
    </div>
    <div class="b-img">
      <img src="/images/svg.png" alt="SVG" />
    </div>
  </div>
</div>*/
    <div className="body_HomeDoc">
      <header className="header-new-home">
        <nav className="nav_home_doc">
          <div className="lab">
            <h3 className="sedan-regular1">Faculty of Chemistry</h3>
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
            <a className="sedan-regular1" href="#">
              Faculty
            </a>
          </li>

          <li className="nav_item">
            <a className="sedan-regular1" href="#">
              About
            </a>
          </li>
          <li className="nav_item">
            <a className="sedan-regular1" href="#">
              Contact Us
            </a>
          </li>
          <li className="nav_item">
            {" "}
            <Link className="nav_link" to="/Login">
              {" "}
              <i className="fas fa-user"></i>
              <span className="sedan-regular1">Connexion</span>
            </Link>
          </li>
        </nav>
      </header>

      <div className="container-home">
        <h1 className="sedan-regular1" font-size="10%">
          Welcome to Our Web-site
          <p className="sedan-regular1">
            Here, you will find all news and updates about
            <p className="sedan-regular1">The faculty of Chemistry At USTHB</p>
          </p>
        </h1>
        {/*<div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              maxWidth: 800,
              flexGrow: 1,
              margin: "auto",
            }}
          >
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                pr: 2,
                bgcolor: "rgba(144, 143, 146, 0.671)",
                borderRadius: "10px 10px 0px 0px  ",
                justifyContent: "space-between",
              }}
            >
              <Typography>{steps[activeStep].label}</Typography>
              <Typography>{steps[activeStep].date}</Typography>
            </Paper>
            <Box
              sx={{
                height: 255,
                width: "100%",
                p: 2,
                margin: "auto",
                bgcolor: "rgba(144, 143, 146, 0.671)",
                //paddingTop: "70px",
                display: "flex",
              }}
            >
              <div style={{ flex: 1 }}>{steps[activeStep].description}</div>
            </Box>
            <MobileStepper
              variant="text"
              bgcolor="rgba(144, 143, 146, 0.671)"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext}>
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack}>
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
            </div>*/}

        <div>
          {user && (
            <div>
              <h1>Welcome, {user.Username}!</h1>
              <p>Email: {user.Email}</p>
              <p>Role: {user.Role}</p>
              {/* Afficher d'autres informations de l'utilisateur */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
