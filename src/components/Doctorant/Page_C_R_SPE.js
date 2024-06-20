import React, { useState, useEffect } from "react";
import "./page.css";
import { useParams } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { Button, Modal, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Page_SPE() {
  const [open, setOpen] = useState(false);
  const [Commentaire, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { Username } = useParams();
  const [sessionOuverte, setSessionOuverte] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSessionOpened, setIsSessionOpened] = useState(false);
  const [isStageSessionOpened, setIsStageSessionOpened] = useState(false);

  useEffect(() => {
    // Vérifier si la session "Recours" est ouverte
    Axios.get(`http://localhost:3002/session/recours/is_open`)
      .then((res) => {
        if (res.status === 200) {
          setSessionOuverte(res.data.is_open);
        } else {
          setSessionOuverte(false);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la vérification de la session Recours :",
          error
        );
        setSessionOuverte(false);
      });

    // Vérifier si la session "Stage de perfectionnement à l’étranger" est ouverte
    Axios.get(`http://localhost:3002/session/is_open_stage_perfectionnement`)
      .then((res) => {
        if (res.status === 200) {
          setIsStageSessionOpened(res.data.is_open);
        } else {
          setIsStageSessionOpened(false);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la vérification de la session Stage de perfectionnement :",
          error
        );
        setIsStageSessionOpened(false);
      });
  }, [Username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:3002/${Username}/recours_SPE`, {
      Commentaire: Commentaire,
    })
      .then((res) => {
        if (res.status === 201) {
          setMessage("Recours ajouté avec succès");
        } else {
          res.json().then((data) => {
            setMessage(data.error || "Échec de l'ajout du recours");
          });
        }
      })
      .catch((error) => {
        setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
        console.error("Erreur lors de l'ajout du recours:", error);
      });
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const handleAnnuler = async () => {
    try {
      const response = await fetch(`/doctorants/${Username}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel participation");
      }

      const data = await response.json();
      setMessage1(data.message);
    } catch (error) {
      console.error("Error canceling participation:", error);
      setMessage1(error.message || "Failed to cancel participation");
    }
  };

  const handleCheck = async () => {
    try {
      const response = await fetch(`/doctorants/${Username}/decision`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check decision");
      }

      const data = await response.json();
      setMessage2(data.message);
    } catch (error) {
      console.error("Error checking decision:", error);
      setMessage2(error.message || "Failed to check decision");
    }
  };

  return (
    <div
      className="body_HomeDoc1"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <header>
        <nav className="nav_home_doc">
          <div className="lab">
            <p className="seden-regular">Faculty of Chemistry</p>
          </div>
          <div className="toggle_menu">
            <i className="bx bx-grid-alt"></i>
          </div>
          <ul className="nav_list"></ul>
          <div className="close_menu">
            <i className="bx bx-x"></i>
          </div>
          <li className="nav_item">
            <Link className="nav_link" to="/">
              {" "}
              <i className="bx bx-home"></i>
            </Link>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to="#">
              Profile{" "}
              <i
                className="bx bxs-user-detail"
                style={{ marginRight: "20px" }}
              ></i>
            </Link>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to="#">
              Faculty
            </Link>
          </li>
          <li className="nav_item">
            <a className="nav_link dropdown_link" href="#" onClick={toggleMenu}>
              Formation <i className="bx bx-chevron-down"></i>
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
                          Stage de perfectionnement à l'étranger
                        </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="nav_item">
            <Link className="nav_link" to="#">
              About
            </Link>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to="#">
              Contact Us
            </Link>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to="/Login">
              <i className="fas fa-user"></i>
              <span className="nav-item">
                Logout <i className="bi bi-box-arrow-left"></i>
              </span>
            </Link>
          </li>
        </nav>
      </header>

      <div
        className="top-row"
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <div
          className="sub-div"
          style={{
            width: "300px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(200,207,223)",
            border: "2px solid white",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "-20px",
            maxWidth: "500px",
          }}
        >
          <i
            className="bx bxs-edit-location"
            style={{ fontSize: "48px", color: "purple" }}
          ></i>
          {isStageSessionOpened ? (
            <Link to={`/demandeSPE/${Username}`}>
              <span className="nav-item">Plan your departure</span>
            </Link>
          ) : (
            <p>
              The session "Stage de perfectionnement à l’étranger" is not yet
              open
            </p>
          )}
        </div>
        <div
          className="sub-div"
          style={{
            width: "300px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(200,207,223)",
            border: "2px solid white",
            borderRadius: "10px",
            marginTop: "-20px",
            maxWidth: "500px",
          }}
        >
          <i
            className="bx bxs-folder-plus"
            style={{ fontSize: "48px", color: "purple" }}
          ></i>
          {isStageSessionOpened ? (
            <Link to={`/${Username}/demandeSPE2`}>
              <span className="nav-item">Send your document</span>
            </Link>
          ) : (
            <p>
              the session "Stage de perfectionnement à l’étranger" is not yet
              open
            </p>
          )}
        </div>
      </div>

      <div
        className="bottom-row"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div
          className="sub-div"
          style={{
            width: "300px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(200,207,223)",
            border: "2px solid white",
            borderRadius: "10px",
            marginTop: "-20px",
            maxWidth: "1500px",
          }}
        >
          <i
            className="bx bxs-message-alt-x bx-flip-horizontal"
            style={{ fontSize: "48px", color: "purple" }}
          ></i>
          <button
            className="btn-sup"
            style={{ height: "40px", width: "100px", marginLeft: "10px" }}
            onClick={handleAnnuler}
          >
            Delete
          </button>
          <p style={{ fontSize: "15px", color: "purple" }}>
            Delete your request
          </p>
          {message1 && <p>{message1}</p>}
        </div>
        <div
          className="sub-div"
          style={{
            width: "300px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(200,207,223)",
            border: "2px solid white",
            borderRadius: "10px",
            marginTop: "-20px",
            maxWidth: "1500px",
          }}
        >
          <i
            className="bx bx-show-alt"
            style={{ fontSize: "48px", color: "purple" }}
          ></i>
          <button
            className="btn-ajout"
            style={{ height: "40px", width: "100px", marginLeft: "10px" }}
            onClick={handleCheck}
          >
            Check
          </button>
          <p style={{ fontSize: "15px", color: "purple" }}>
            Check the status of your request
          </p>
          {message2 && <p>{message2}</p>}
        </div>
        <div
          className="sub-div"
          style={{
            width: "300px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(200,207,223)",
            border: "2px solid white",
            borderRadius: "10px",
            marginTop: "-20px",
            maxWidth: "1500px",
          }}
        >
          <i
            className="bx bx-repeat"
            style={{ fontSize: "48px", color: "purple" }}
          ></i>
          <span style={{ fontSize: "15px", color: "purple" }}>
            File an appeal
          </span>
          <div>
            {sessionOuverte ? (
              <div
                style={{ height: "60px", width: "200px", marginLeft: "10px" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleOpen}
                >
                  Add Comment
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Commentaire"
                        value={Commentaire}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, margin: "auto" }}
                        style={{
                          marginBottom: "20px",
                          fontSize: "14px",
                          width: "20%",
                        }}
                      >
                        Submit
                      </Button>
                    </form>
                  </Box>
                </Modal>
              </div>
            ) : (
              <p style={{ fontSize: "15px", color: "purple" }}>
                The appeal session is not open yet
              </p>
            )}
            {<p style={{ fontSize: "15px", color: "purple" }}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page_SPE;
