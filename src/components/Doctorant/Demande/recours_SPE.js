import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
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

function Comment_SPE() {
  const [open, setOpen] = useState(false);
  const [Commentaire, setComment] = useState("");
  const [message, setMessage] = useState("");

  const { Username } = useParams();
  const [u, setUsername_Mat] = useState("");
  const [p, setPays] = useState("");
  const [et, setEtablissement] = useState("");
  const [pe, setPeriode] = useState("");
  const [d, setdebut] = useState("");
  const [f, setfin] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/demande_SPE", {
      Commentaire: Commentaire,
      Pays: p,
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
      <div style={{ paddingLeft: "10%" }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
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
      {message && <p>{message}</p>}
    </div>
  );
}

export default Comment_SPE;
