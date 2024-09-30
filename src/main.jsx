import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import { fetchDataFromAPI } from "./api/api";

const Main = () => {
  const [primaryColor, setPrimaryColor] = useState(null); // Empieza sin color
  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        primary: {
          main: "#484848", // Color inicial por defecto
        },
        secondary: {
          main: "#f50057",
        },
      },
    })
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDataFromAPI();
      // Verifica los datos de la API
      if (data && data.color_boton_contacto) {
        setPrimaryColor(data.color_boton_contacto); // Establece el color
        setTheme(
          createTheme({
            palette: {
              primary: {
                main: data.color_boton_contacto, // Color dinámico
              },
              secondary: {
                main: "#f50057",
              },
            },
          })
        );
      }
    };

    getData();
  }, []);

  // Si no hay color primario aún, muestra un "loading" o un componente vacío
  if (!primaryColor) {
    return <div>Cargando...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
