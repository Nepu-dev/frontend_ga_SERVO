import React from "react";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center">
          SERVO/FAMACON
        </h2>
        <input
          type="search"
          placeholder="Buscar OT"
          className="rounded-lg lg:w-96 block p-2 border"
        />
        <button
        type="button"
        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
      >
        Cerrar Sesión
      </button>
      </div>
    </header>
  );
};

export default Header;
