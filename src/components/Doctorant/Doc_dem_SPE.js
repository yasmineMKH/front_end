import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Edit_admin.css";
import { NavLink, Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
function Doc_dem_SPE() {
  //const history = useHistory();
  const { Username } = useParams();
  const [u, setUsername_Mat] = useState("");
  const [p, setPays] = useState("");
  const [v, setVille] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
  
  const [d, setdebut] = useState("");
  const [f, setfin] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
      
    const toggleMenu = () => {
          setMenuVisible(!menuVisible);
        };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:3002/${Username}/demande_SPE`, {
      Pays: p,
      Ville: v,
      Etablissement_acc: et,
      Periode_Stage: pe,
      
      Date_dep: d,
      Date_retour: f,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Add successful");
        } else {
          return res.json().then((data) => {
            alert("Failed to add Super_user");
          });
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.error("Error adding Super_user:");
      });
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
            onChange={(e) => setPays(e.target.value)}
          />

          <label htmlFor="Ville">Ville:</label>
          <input
            type="text"
            name="Ville"
            onChange={(e) => setVille(e.target.value)}
          />

          <label htmlFor="Etablissement d'accueil">
            Etablissement d'accueil:
          </label>
          <input
            type="text"
            name="Etablissement_acc"
            onChange={(e) => setEtablissement(e.target.value)}
          />

          <label htmlFor="Période">Période:</label>
          <select
            title="Sélectionnez une option"
            onChange={(e) => setPeriode(e.target.value)}
          >
            <option value=""></option>
            <option value="Semestre1">Semestre 1</option>
            <option value="Semestre2">Semestre 2</option>
          </select>

          <label htmlFor="Date">Date de début du stage:</label>
          <input
            type="date"
            name="debut"
            onChange={(e) => setdebut(e.target.value)}
          />

          <label htmlFor="Date">Date de fin du stage:</label>
          <input
            type="date"
            name="fin"
            onChange={(e) => setfin(e.target.value)}
          />

          <button onClick={handleSubmit}>Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default Doc_dem_SPE;
