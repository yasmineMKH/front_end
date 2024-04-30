import React, { useState } from 'react';
import Axios from 'axios';

function UpdateSession({ sessionId, sessionName }) {
  
    const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Delai_fermeture: ''
    
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

  const handleSubmit = async (e) => {


    e.preventDefault();
        

        fetch(`/sessions/${sessionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to update session');
                });
            } else {
                // Vice doyenne updated successfully
                alert('sesion updated successfully');
                //window.location.href = '/Admin/vice_deans';
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                // Si le backend a renvoyé une erreur avec un code 400,
                // cela signifie que le vice-doyenne n'est pas un enseignant.
                // Afficher le message d'erreur renvoyé par le backend.
                error.response.json().then(data => {
                    alert(data.error);
                    setMessage(data.error); // Stocker le message d'erreur dans l'état local pour affichage
                });
            } else {
                // Si une autre erreur s'est produite, afficher un message générique.
                alert(error.message || 'Failed to update Session');
                console.error('Error updating Session:', error);
            }
        });
        

    
  };

  return (
    <div>
     <form onSubmit={handleSubmit}>
      <h2>Update Session Duration for {sessionName}</h2>

      <label htmlFor="Delai_fermeture">New Duration (in days):</label>
                <input type="number" name="Delai_fermeture" value={formData.Delai_fermeture} onChange={handleChange} />
      <button type="submit">Update Session</button>
      </form>
    </div>
  );
}

function UpdateSessions() {
  // Données des sessions
  const sessions = [
    { id: 1, name: "Manifestation Scientifique Internationale " },
    { id: 2, name: "Séjour scientifique de courte durée de haut niveau" },
    { id: 3, name: "Stage de perfectionnement à l’étrangé" },
    { id: 4, name: "Session CSF" }
  ];

  return (
    <div>
      {sessions.map(session => (
        <UpdateSession key={session.id} sessionId={session.id} sessionName={session.name} />
      ))}
    </div>
  );
}

export default UpdateSessions;
