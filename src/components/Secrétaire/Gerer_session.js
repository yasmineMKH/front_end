<<<<<<< HEAD
import React from 'react';
import './Sec.css'; // Assurez-vous d'avoir le fichier CSS correspondant
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Axios from 'axios'
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function UpdateSession({ sessionId, sessionName }) {
    
    const [ouvert, setOuvert] = useState();
=======
import React, { useState, useEffect } from "react";
import Axios from "axios";

function UpdateSession({ sessionId, sessionName }) {
  const [ouvert, setOuvert] = useState();
>>>>>>> 0aabe4d63021a2e010493cf655258c87c9085834

  useEffect(() => {
    fetch(`/sessions/${sessionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        return response.json();
      })
      .then((session) => {
        console.log("Session Est_ouverte:", session.id, session.Est_ouverte);
        const sessionIsOpen = session.Est_ouverte === "true" ? true : false;

        setOuvert(sessionIsOpen);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }, [sessionId]);

<<<<<<< HEAD
    return (
        <div >
            <h1 >Update Session Status for {sessionName}</h1>
            {console.log('Session Est_ouverte:',ouvert)}
            {ouvert ? (
                <button className="btn-sup" style={{ height: '60px', width: '200px', marginLeft: '10px' }} onClick={handleCloseSession}>Close Session</button>
            ) : (
                <button className="btn-ajout" style={{ height: '60px', width: '200px', marginLeft: '10px' }} onClick={handleOpenSession}>Open Session</button>
            )}
        </div>
    );
}

function UpdateSessions() {
    const sessions = [
        { id: 1, name: "Manifestation Scientifique Internationale " },
        { id: 2, name: "Séjour scientifique de courte durée de haut niveau" },
        { id: 3, name: "Stage de perfectionnement à l’étrangé" },
        { id: 4, name: "Session CSF" },
        { id: 5, name: "Recours" }
    ];
    const { id } = useParams();
    return (
        <div className="dashboard-container_sec ">
      <nav className='nav_sec'>
                    <div className="navbar_sec">
                        <div className="logo">
                            <img src="/pic/logo.jpg" alt="" />
                            <h1>Logo</h1>
                        </div>
                        <ul>
                        <li>
    <Link to={`/Secrétaire/${id}/Profile`}>
        <i className="bi bi-person-circle" style={{ marginRight: '20px' }}></i>
        <span className="nav-item">Profile</span>
    </Link>
</li>


<li>
    <Link to={`/Secrétaire/${id}/session`}>
        
        <span className="nav-item">Gestion des sessions</span>
    </Link>
</li>


<li>
    <Link to={`/Vice_deans/${id}/binome`}>
        
        <span className="nav-item">Binome</span>
    </Link>
</li>
            <li>
            <a href="#">
                <i className="fas fa-user"></i>
                <span className="nav-item">Parameters management</span>
              </a>
            </li>
            <li>
<Link to={`/Vice_deans/${id}/comission`}>
        
        <span className="nav-item">Commission management</span>
    </Link>
            </li>
            <li>
            <a href="#">
                <i className="fas fa-user"></i>
                <span className="nav-item">Assignment of candidate files to the commission</span>
              </a>
            </li>

                            
<li>
    <Link to="/LoginG">
        <i className="bi bi-box-arrow-left" style={{ marginRight: '5px' }}></i>
        <span className="nav-item">Logout</span>
    </Link>
</li>

                        </ul>
                    </div>
                </nav>
      <section className="main">
    
                    {sessions.map(session => (
                        <UpdateSession key={session.id} sessionId={session.id} sessionName={session.name} />
                    ))}
                
        
        </section>
        </div>
    );
}

export default UpdateSessions;
=======
  const handleOpenSession = async () => {
    try {
      const response = await Axios.put(
        `http://localhost:3002/sessions/${sessionId}/open`
      );
      setOuvert(true);
      alert("Session opened successfully");
    } catch (error) {
      console.error("Error opening session:", error);
      alert("Failed to open session");
    }
  };

  const handleCloseSession = async () => {
    try {
      const response = await Axios.put(
        `http://localhost:3002/sessions/${sessionId}/close`
      );
      setOuvert(false);
      alert("Session closed successfully");
    } catch (error) {
      console.error("Error closing session:", error);
      alert("Failed to close session");
    }
  };

  return (
    <div>
      <h2>Update Session Status for {sessionName}</h2>
      {console.log("Session Est_ouverte:", ouvert)}
      {ouvert ? (
        <button className="btn-sup" onClick={handleCloseSession}>
          Close Session
        </button>
      ) : (
        <button className="btn-ajout" onClick={handleOpenSession}>
          Open Session
        </button>
      )}
    </div>
  );
}

function UpdateSessions() {
  const sessions = [
    { id: 1, name: "Manifestation Scientifique Internationale " },
    { id: 2, name: "Séjour scientifique de courte durée de haut niveau" },
    { id: 3, name: "Stage de perfectionnement à l’étrangé" },
    { id: 4, name: "Session CSF" },
  ];

  return (
    <div>
      {sessions.map((session) => (
        <UpdateSession
          key={session.id}
          sessionId={session.id}
          sessionName={session.name}
        />
      ))}
    </div>
  );
}

export default UpdateSessions;
>>>>>>> 0aabe4d63021a2e010493cf655258c87c9085834
