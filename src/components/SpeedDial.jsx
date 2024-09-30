import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { fetchDataFromAPI } from "../api/api";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Estilos para los modales
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  border: "none",
};

// Definir las acciones del SpeedDial
const actions = [
  { icon: <WhatsAppIcon />, name: "Whatsapp" },
  { icon: <SaveIcon />, name: "Guardar contacto" },
  { icon: <ShareIcon />, name: "Compartir" },
  { icon: <QrCode2Icon />, name: "Codigo Qr" },
];

// Componente de modal reutilizable
const CustomModal = ({ open, onClose, title, description, children }) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
    <Box sx={modalStyle}>
      <Typography id="modal-title" variant="h6">{title}</Typography>
      <Typography id="modal-description" sx={{ mt: 2, fontSize: 12 }}>{description}</Typography>
      {children}
      <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">Cerrar</Button>
    </Box>
  </Modal>
);

// Función para descargar el archivo de contacto
const downloadContactFile = (contacto) => {
  if (!contacto) {
    alert("No hay archivo de contacto disponible.");
    return;
  }
  const link = document.createElement("a");
  link.href = contacto;
  link.download = "contacto.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Función para abrir WhatsApp
const openWhatsApp = (wsp) => {
  if (!wsp) {
    alert("Número de WhatsApp no disponible.");
    return;
  }
  const message = "I'm interested in your car for sale";
  const link = `https://wa.me/${wsp}?text=${encodeURIComponent(message)}`;
  window.open(link, "_blank");
};

export default function SpeedDialTooltipOpen() {
  const [openQrModal, setOpenQrModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [codigoQr, setCodigoQr] = useState(null);
  const [contacto, setContacto] = useState(null);
  const [wsp, setWsp] = useState(null);

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromAPI();
      if (data) {
        setCodigoQr(data.codigo_qr || null);
        setContacto(data.contacto || null);
        setWsp(data.wsp || null);
      }
    };
    fetchData();
  }, []);

  // Función para manejar las acciones del SpeedDial
  const handleActionClick = (actionName) => {
    switch (actionName) {
      case "Whatsapp":
        openWhatsApp(wsp);
        break;
      case "Guardar contacto":
        downloadContactFile(contacto);
        break;
      case "Compartir":
        setOpenShareModal(true);
        break;
      case "Codigo Qr":
        setOpenQrModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ height: 1, transform: "translateZ(10px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial actions"
        sx={{ position: "absolute", bottom: -15, right: 0 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.name)}
          />
        ))}
      </SpeedDial>

      {/* Modal para el código QR */}
      <CustomModal
        open={openQrModal}
        onClose={() => setOpenQrModal(false)}
        title="Comparte esta tarjeta"
        description="Escanea el código QR para compartir esta tarjeta."
      >
        <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
          {codigoQr ? <img src={codigoQr} alt="qr" width="200px" /> : <p>Cargando código QR...</p>}
        </Box>
      </CustomModal>

      {/* Modal para compartir */}
      <CustomModal
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
        title="Compartir Tarjeta"
        description="Puedes compartir este enlace por correo, redes sociales, etc."
      >
        <Box sx={{ mt: 2, width: "100%", display: "flex", justifyContent: "space-around" }}>
          <a href={`https://api.whatsapp.com/send?text=Te%20comparto%20esta%20tarjeta%20https://chelo67.github.io/tarjeta-react/`} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon sx={{ fontSize: 40, color: "#25D366" }} />
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https://chelo67.github.io/demo1-tarjeta" target="_blank">
            <FacebookIcon sx={{ fontSize: 40, color: "#4267B2" }} />
          </a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://chelo67.github.io/demo1-tarjeta/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={{ fontSize: 40, color: "#0e76a8" }} />
          </a>
        </Box>
      </CustomModal>
    </Box>
  );
}
