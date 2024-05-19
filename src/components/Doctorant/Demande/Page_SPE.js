import React,{ useState, useEffect } from "react";
import "./page.css";
import { useParams } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { Button, Modal, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Axios from "axios";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
function Page_SPE() {
  const [open, setOpen] = useState(false);
  const [Commentaire, setComment] = useState('');
  const [message, setMessage] = useState('');
  const { Username } = useParams();
  const [sessionOuverte, setIsSessionOpened] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSessionOpened, setIsStageSessionOpened] = useState(false);

  /*useEffect(() => {
    // Appel à l'API pour vérifier si la session est ouverte
    fetch(`http://localhost:3002/session/is_open_stage_perfectionnement`)
      .then((response) => response.json())
      .then((data) => {
        setIsSessionOpened(data.is_open);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'état de la session :", error);
      });
  }, [Username]);

  useEffect(() => {
    // Vérifier si la session est ouverte
    Axios.get(`http://localhost:3002/session/recours/is_open`)
      .then((res) => {
        if (res.status === 200) {
          setSessionOuverte(res.data.is_open);
        } else {
          setSessionOuverte(false);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification de la session :", error);
        setSessionOuverte(false);
      });
  }, [Username]);*/

  useEffect(() => {
    // Vérifier si la session "Recours" est ouverte
    Axios.get(`http://localhost:3002/session/recours/is_open`)
      .then((res) => {
        if (res.status === 200) {
          setIsSessionOpened(res.data.is_open);
        } else {
          setIsSessionOpened(false);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification de la session Recours :", error);
        setIsSessionOpened(false);
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
        console.error("Erreur lors de la vérification de la session Stage de perfectionnement :", error);
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
  
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const handleAnnuler = async () => {
    try {
      const response = await fetch(`/doctorants/${Username}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel participation');
      }

      const data = await response.json();
      setMessage1(data.message );
    } catch (error) {
      console.error('Error canceling participation:', error);
      setMessage1(error.message || 'Failed to cancel participation');
    }
  };

  const handleCheck = async () => {
    try {
      const response = await fetch(`/doctorants/${Username}/decision`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check decision');
      }

      const data = await response.json();
      setMessage2(data.message);
    } catch (error) {
      console.error('Error checking decision:', error);
      setMessage2(error.message || 'Failed to check decision');
    }
  };
  return (
    <div className="main-container">
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

<div className="top-row">
      <div className="sub-div">


        {isSessionOpened ? (
          <Link to={`/demandeSPE/${Username}`}>
            <span className="nav-item">Planifier votre départ</span>
          </Link>
        ) : (
          <p>La session "Stage de perfectionnement à l’étranger" n'est pas encore ouverte</p>
        )}
      </div>
      <div className="sub-div">
      <i class='bx bxs-folder-plus'></i>
        {isSessionOpened ? (
          <Link to={`/demandeSPE2/${Username}`}>
            <span className="nav-item">Envoyer votre document</span>
          </Link>
        ) : (
          <p>La session "Stage de perfectionnement à l’étranger" n'est pas encore ouverte</p>
        )}
      </div>
    </div>
      <div className="bottom-row">
        <div className="sub-div">
        <i class='bx bxs-message-alt-x bx-flip-horizontal' ></i>
          <button className="btn-sup" style={{ height: '60px', width: '200px', marginLeft: '10px' }} onClick={handleAnnuler}>Annuler la Demande</button>
          {message1 && <p>{message1}</p>}
        </div>
        <div className="sub-div">
          
          <button className="btn-ajout" style={{ height: '60px', width: '200px', marginLeft: '10px' }} onClick={handleCheck}>Consulter l'etat de la demande</button>
          {message2 && <p>{message2}</p>}
        </div>
        <div className="sub-div">
        <i class='bx bx-repeat' ></i>
        <span className="nav-item">Faire un recour</span>
        <div>
      {sessionOuverte ? (
        <div style={{ paddingLeft: '10%' }}>
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
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      ) : (
        <p>La session n'est pas encore ouverte</p>
      )}
      {message && <p>{message}</p>}
    </div>
          
        </div>
      </div>
      </div>
  );
}

export default Page_SPE;
