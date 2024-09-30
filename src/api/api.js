export const fetchDataFromAPI = async () => {
  const pathname = window.location.pathname;
  const slug = pathname.split("/").pop(); 

  try {
    const response = await fetch(
      `https://dutiful-lobster-171d4f.instawp.xyz/wp-json/wp/v2/user_slug/${slug}`
    );
    
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
     // Verifica los datos de la API
    return result;
         // Retorna los datos completos
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
