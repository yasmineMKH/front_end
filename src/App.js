import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin_profile from "./components/Admin_Profile";
import Admin_Users_List from "./components/Admin_Users_List";

import Admin_super_user_List from "./components/Admin_super_user_List";
import Edit_super_user from "./components/Edit_super_user";
import Add_super_user from "./components/add_super_user";
import AdminDashboard from "./components/Admin_Dashboard";

import ReactDOM from "react-dom";
import LoginG from "./components/vice/Login_vice";
import Viced_profile from "./components/vice/Vice_Profile";
import Vice_homevice from "./components/vice/Vice_Homevice";
import Comission_gestion from "./components/vice/Comission_gestion";
import Home_E from "./components/Enseignant/Home_E";
import Home_D from "./components/Doctorant/Home_D";
import Doc_dem_SPE from "./components/Doctorant/Doc_dem_SPE";
import BinomesComponent from "./components/vice/Binome_vice";

import Profile_E from "./components/Enseignant/Profile_E";
import UpdateSessions from "./components/Secrétaire/Gerer_session";
import Page_SPE from "./components/Doctorant/Demande/Page_SPE";
import Doc_dem_SPE2 from "./components/Doctorant/Demande/Doc_dem_SPE2";
import Teacher from "./components/vice/Teacher";
import Home_sec from "./components/Secrétaire/Home_sec";
import Profile_sec from "./components/Secrétaire/Profile_sec";
import Sec_teacher from "./components/Secrétaire/Sec_teacher";
import Sec_doc from "./components/Secrétaire/Sec_doc";
import DossierDoc from "./components/vice/DossierDoc";
import Traitement_demande from "./components/Membre_commission/Traitement_dossier";
import recours_SPE from "./components/Doctorant/Demande/recours_SPE";
import Gerer_BP from "./components/vice/Gerer_BP";
import CSF from "./components/Membre_commission/CSF";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  /*const handleLogin = () => {
    setIsLoggedIn(true);
  };*/

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Vous pouvez ajouter d'autres logiques de déconnexion ici, comme la suppression du token d'authentification, etc.
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homeEnseignant/:id" element={<Home_E />} />
        <Route path="/profileEnseignant/:id" element={<Profile_E />} />

        <Route path="/homeDoctorant/:id" element={<Home_D />} />
        <Route path="/Page_SPE/:Username" element={<Page_SPE />} />
        <Route path="/demandeSPE/:Username" element={<Doc_dem_SPE />} />
        <Route path="/demandeSPE2/:Username" element={<Doc_dem_SPE2 />} />
        <Route path="/recours_SPE/:Username" element={<recours_SPE />} />

        <Route path="/LoginG" element={<LoginG />} />
        <Route path="/Vice_deans/:id/Profile" element={<Viced_profile />} />
        <Route path="/Vice_deans/:id" element={<Vice_homevice />} />
        <Route path="/Vice_deans/:id/teachers" element={<Teacher />} />
        <Route path="/Vice_deans/:id/Dossier" element={<DossierDoc />} />
        <Route path="CSF" element={<CSF />} />
        <Route
          path="/Vice_deans/:id/comission"
          element={<Comission_gestion />}
        />
        <Route path="/Traitement_dossier" element={<Traitement_demande />} />
        <Route path="/Vice_deans/:id/binome" element={<BinomesComponent />} />
        <Route path="/Vice_deans/:id/Budget" element={<Gerer_BP />} />
        <Route path="/Admin/:id" element={<AdminDashboard />} />
        <Route path="/Admin/:id/user" element={<Admin_Users_List />} />
        <Route
          path="/Admin/:id/super_user"
          element={<Admin_super_user_List />}
        />
        <Route
          path="/Admin/:id/super_user/Edit/:id"
          element={<Edit_super_user />}
        />
        <Route path="/Admin/:id/super_user/add" element={<Add_super_user />} />
        <Route path="/Admin/:id/Profile" element={<Admin_profile />} />

        <Route path="/Secrétaire/:id" element={<Home_sec />} />
        <Route path="/Profile" element={<Profile_sec />} />
        <Route path="/Secrétaire/:id/Teachers" element={<Sec_teacher />} />
        <Route path="/Secrétaire/:id/Doctorants" element={<Sec_doc />} />
        <Route path="/Session" element={<UpdateSessions />} />
      </Routes>
    </div>
  );
}

export default App;
