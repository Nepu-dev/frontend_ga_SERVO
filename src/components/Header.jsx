import React from "react";
import useAuth from "../hooks/useAuth";
import useOrdenes from "../hooks/useOrdenes";

const Header = () => {

  const { cerrarSesionAuth } = useAuth();
  const { cerrarSesionProvider } = useOrdenes();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProvider();
    sessionStorage.removeItem('token');
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          SERVO LTDA.
        </h2>
        <button
        type="button"
        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
        onClick={handleCerrarSesion}
      >
        Cerrar Sesión
      </button>
      </div>
    </header>
  );
};

export default Header;
