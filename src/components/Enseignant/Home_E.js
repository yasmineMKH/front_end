import React from "react";
import "../Home.css";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
function Home_E() {
  const { id } = useParams();
  const { Username } = useParams();
  const [isCommissionMember, setIsCommissionMember] = useState(false);
  const [IsPresident, setIsPresident] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await Axios.get(
          `http://localhost:3002/user/${id}`
        );
        setUser(userResponse.data);

        const commissionResponse = await Axios.get(
          `http://localhost:3002/check_commission_membership/${userResponse.data.Username}`
        );
        setIsCommissionMember(commissionResponse.data.isMember);

        const commissionResponsepresident = await Axios.get(
          `http://localhost:3002/check_commission_President/${userResponse.data.Username}`
        );
        setIsPresident(commissionResponsepresident.data.isPresident);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <div className="body_HomeDoc">
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
            <Link className="nav_link" to={`/profileEnseignant/${id}`}>
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
                      <Link to={`/${user.Username}/Page_MSI`}>
                        <p>Manifestation Scientifique Internationale</p>
                      </Link>
                    </div>
                  </li>

                  <li className="megamenu_item">
                    <div className="menu_icone"></div>
                    <div className="menu_link">
                      <Link to={`/${user.Username}/Page_SSHN`}>
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
              <Link
                className="nav_link"
                to={`/${user.Username}/Traitement_dossier`}
              >
                {" "}
                <span className="nav-item">Request</span>
              </Link>
            </li>
          )}
          {isCommissionMember && (
            <li className="nav_item">
              {" "}
              <Link className="nav_link" to={`/${user.Username}/Recours`}>
                {" "}
                <i className="fas fa-user"></i>
                <span className="nav-item">Recours</span>
              </Link>
            </li>
          )}

          {IsPresident && (
            <li className="nav_item">
              <Link className="nav_link" to={`/${user.Username}/CSF`}>
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

      <div>
        {user && (
          <div>
            <h1> {user.Username}!</h1>
            <h1 className="sedan-regular1">
              Welcome, {user.Lastname} {user.Firstname}!
            </h1>

            {/*  <p>Email: {user.Email}</p>
            <p>Role: {user.Role}</p>*/}
            {/* Afficher d'autres informations de l'utilisateur */}
          </div>
        )}
      </div>
      <div className="container-home">
        <h1 className="sedan-regular1" font-size="10%">
          Welcome to Our Web-site
          <p className="sedan-regular1">
            Here, you will find all news and updates about
            <p className="sedan-regular1">The faculty of Chemistry At USTHB</p>
          </p>
        </h1>
      </div>
    </div>
  );
}

export default Home_E;
