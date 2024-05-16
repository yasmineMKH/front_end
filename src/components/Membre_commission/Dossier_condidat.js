import React, { useState, useEffect } from "react";
import axios from "axios";

function Dossier_condidat() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Gestion de l'envoi de fichier
  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Veuillez sélectionner un fichier d'abord");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Envoi du fichier au backend
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Mise à jour de la liste des fichiers uploadés
      setUploadedFiles([...uploadedFiles, response.data.filename]);
      setSelectedFile(null);
      alert("Fichier uploadé avec succès");
    } catch (error) {
      console.error("Erreur lors de l'upload du fichier", error);
      alert("Échec de l'upload du fichier");
    }
  };
  // Récupération des fichiers uploadés depuis le serveur
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/uploadfile");
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des fichiers", error);
    }
  };

  // Récupération des fichiers au montage du composant
  useEffect(() => {
    fetchUploadedFiles();
  }, []);
  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        <h3>Fichiers Uploadés :</h3>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <a
                href={`http://localhost:3001/uploadfile/${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dossier_condidat;
