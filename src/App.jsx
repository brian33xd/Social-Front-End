import { useEffect } from "react";
import { Routing } from "./router/Routing";
import { useNavigate } from "react-router-dom";

function App() {
  const Navigate = useNavigate();
  // Función para registrar la última actividad del usuario
  const registrarActividadUsuario = () => {
    localStorage.setItem("lastActivity", Date.now());
  };

  // Función para verificar y limpiar el localStorage si no hay actividad reciente
  const verifyAndCleanLocalStorage = () => {
    const lastActivity = localStorage.getItem("lastActivity");
    if (lastActivity) {
      const pastTime = Date.now() - parseInt(lastActivity, 10);
      const limitTime = 5 * 60 * 1000; // 5 minutos en milisegundos
      if (pastTime > limitTime) {
        // Limpiar el localStorage
        localStorage.clear();
        Navigate("/");
      }
    }
  };

  useEffect(() => {
    // Event listener para detectar la actividad del usuario
    const handleBeforeUnload = () => {
      registrarActividadUsuario();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Intervalo para verificar y limpiar el localStorage regularmente
    const interval = setInterval(verifyAndCleanLocalStorage, 60000); // Verificar cada minuto

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="layout">
      <Routing />
    </div>
  );
}

export default App;
