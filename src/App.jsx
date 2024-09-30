import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook de React Router v6
import {
  Box,
  Button,
  Container,
  Avatar,
  Typography,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import BasicSpeedDial from "./components/SpeedDial";
import { fetchDataFromAPI } from "./api/api";
import { PopupWidget } from "react-calendly";

export default function App() {
  const { slug } = useParams(); // Extrae el slug dinámico de la URL
  const [data, setData] = useState(null); // Datos de la tarjeta
  const [loading, setLoading] = useState(true); // Estado de carga

  console.log("Slug obtenido:", slug); // Agrega este log
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFromAPI(slug); // Pasa el slug a la API

        if (result && result.tarjetas && result.tarjetas.length > 0) {
          setData(result.tarjetas[0].acf); // Almacena los datos de la tarjeta
        } else {
          console.error("No se encontraron tarjetas en la respuesta.");
        }

        setLoading(false); // Deja de mostrar el indicador de carga
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      }
    };

    fetchData(); // Llama a la API cuando cambie el slug
  }, [slug]); // Se actualiza cuando cambie la URL

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!data) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <Container maxWidth="xs" sx={{ maxHeight: "100vh", marginBottom: "0" }}>
      {/* CABECERA */}
      {data.imagen_top && (
        <Box
          sx={{
            backgroundImage: `url(${data.imagen_top})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 150,
            width: "100%",
            borderRadius: "15px 15px 0 0",
            marginTop: "10px",
          }}
        />
      )}

      {/* Nombre y puesto */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginTop: "-30px",
        }}
      >
        {data.foto && (
          <Avatar
            alt={data.nombre}
            src={data.foto}
            sx={{ width: 100, height: 100, border: "6px solid white" }}
          />
        )}

        <Box
          sx={{
            width: "100%",
            height: 100,
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data.nombre && (
            <Typography variant="h6" component="h1" sx={{ display: "" }}>
              {data.nombre}
            </Typography>
          )}

          {data.puesto && (
            <Typography variant="subtitle1" sx={{ marginTop: "-8px" }}>
              {data.puesto}
            </Typography>
          )}
          {data.logo_empresa && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                gap: "10px",
              }}
            >
              <img src={data.logo_empresa} alt="Logo Empresa" width="60px" />
              {data.nombre_empresa && (
                <Typography>{data.nombre_empresa}</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Botones de contacto */}
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          gap: "20px",
        }}
      >
        {data.telefono && (
          <a href={`tel:${data.telefono}`} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" size="small" sx={{ bgcolor: data.color_boton_contacto }}>
              <LocalPhoneIcon />
            </Button>
          </a>
        )}
        {data.enlace_email && (
          <a href={`mailto:${data.enlace_email}`} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" size="small" sx={{ bgcolor: data.color_boton_contacto }}>
              <EmailIcon />
            </Button>
          </a>
        )}
        {data.enlace_web && (
          <a href={data.enlace_web} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" size="small" sx={{ bgcolor: data.color_boton_contacto }}>
              <LanguageIcon />
            </Button>
          </a>
        )}
        {data.direccion && (
          <a
            href={`https://maps.google.com/?q=${data.direccion}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="contained" size="small" sx={{ bgcolor: data.color_boton_contacto }}>
              <PlaceIcon />
            </Button>
          </a>
        )}
      </Grid>

      {/* Redes sociales */}
      <Box sx={{ marginTop: "10px", textAlign: "center" }}>
        <Typography variant="h6">Redes Sociales</Typography>
        {data.facebook && (
          <Chip icon={<FacebookIcon />} label="Facebook" clickable component="a" href={data.facebook} target="_blank" />
        )}
        {data.linkedin && (
          <Chip icon={<LinkedInIcon />} label="LinkedIn" clickable component="a" href={data.linkedin} target="_blank" />
        )}
        {data.instagram && (
          <Chip icon={<InstagramIcon />} label="Instagram" clickable component="a" href={data.instagram} target="_blank" />
        )}
      </Box>

      {/* Calendly Widget */}
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <PopupWidget
          url="https://calendly.com/marceloacampora/consultas"
          rootElement={document.getElementById("root")}
          text="Agenda una cita"
          textColor="#ffffff"
          color={data.color_boton_contacto}
        />
      </Box>

      <BasicSpeedDial />
    </Container>
  );
}
