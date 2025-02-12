import React from "react";
import "../Home.css";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
function Home_D() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [menuVisible, setMenuVisible] = useState(false);

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
              Profile{" "}
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
                      <Link to={`/${user.Username}/Page_SPE`}>
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

      <div>
        {user && (
          <div>
            <h1>Welcome, {user.Username}!</h1>
            <h1 className="sedan-regular1">
              Welcome, {user.Lastname} {user.Firstname}!
            </h1>
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

export default Home_D;
