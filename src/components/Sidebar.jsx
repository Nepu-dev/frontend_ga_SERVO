import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {auth} = useAuth();

  return (
    <>
    <div>
    <aside className="md:w-80 lg:w-80 px-5 py-10">
    <p className="text-xl font-bold">Bienvenido {auth.user}</p>
      <Link
      to="crear-ot"
      className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
      Nueva Orden de trabajo
      </Link>
      <Link
      to="lista-ot"
      className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
      Lista Ordenes de trabajo Pendientes
      </Link>
      <Link
      to="checked-lista-ot"
      className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
      Lista Ordenes de trabajo Completadas
      </Link>
    </aside>
    </div>

    </>

  );
};

export default Sidebar;
