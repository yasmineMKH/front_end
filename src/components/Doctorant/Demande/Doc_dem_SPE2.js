import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./inscription.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function Doc_dem_SPE2() {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("/uploadfile");
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
      <TextField id="outlined-basic" label="destination" variant="outlined" />
      <form onSubmit={handleSubmit}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleFileSelect}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button type="submit">Upload File</Button>
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

export default Doc_dem_SPE2;
