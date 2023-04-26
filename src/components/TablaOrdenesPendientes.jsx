import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useOrdenes from "../hooks/useOrdenes";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TablaOrdenesPendientes = () => {
  const { ordenes, eliminarOT } = useOrdenes();
  const params = useParams();
  const ordenesFiltradas = ordenes.filter((orden) => orden.ot_state === false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = (searchTerm) => {
    return ordenesFiltradas.filter(
      (orden) =>
        orden.ot_number
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        orden.om_number
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (id) => {
    if (
      confirm(
        "¿Estás seguro que quieres eliminar esta orden?, No se podrá recuperar"
      )
    ) {
      eliminarOT(id);
    }
  };

  const columns = [
    {
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <div>
              <Link to={`/OTs/editar/${row._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                  <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                </svg>
              </Link>
            </div>
            <div>
              <button onClick={() => handleClick(row._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </>
        );
      },
    },
    {
      name: "N° OT",
      selector: (row) => row.ot_number,
    },
    {
      name: "N° OM",
      selector: (row) => row.om_number,
    },
    {
      name: "Fecha de inicio",
      selector: (row) => (row.init_Date ? row.init_Date.split("T")[0] : ""),
    },
    {
      name: "Fecha término",
      selector: (row) => (row.end_Date ? row.end_Date.split("T")[0] : ""),
    },
    {
      name: "Descripción",
      selector: (row) => row.ot_Description,
    },
    {
      name: "Valor",
      selector: (row) => row.value,
    },
    {
      name: "SOLPED",
      selector: (row) => row.solped,
    },
    {
      name: "Aviso",
      selector: (row) => row.aviso,
    },
    {
      name: "N° Orden de Compra",
      selector: (row) => row.oc_number,
    },
    {
      name: "Fecha Orden de Compra",
      selector: (row) => (row.oc_Date ? row.oc_Date.split("T")[0] : ""),
    },
    {
      name: "N° Guía de Despacho de Cliente",
      selector: (row) => row.gd_number_client,
    },
    {
      name: "Fecha Guía de Despacho de Cliente",
      selector: (row) =>
        row.gd_Date_client ? row.gd_Date_client.split("T")[0] : "",
    },
    {
      name: "N° Guía de Despacho",
      selector: (row) => row.gd_number,
    },
    {
      name: "Fecha Guía de Despacho",
      selector: (row) => (row.gd_Date ? row.gd_Date.split("T")[0] : ""),
    },
    {
      name: "Fecha Estado de Pago",
      selector: (row) => (row.ep_Date ? row.ep_Date.split("T")[0] : ""),
    },
    {
      name: "N° HES",
      selector: (row) => row.HES,
    },
    {
      name: "Fecha HES",
      selector: (row) => (row.HES_Date ? row.HES_Date.split("T")[0] : ""),
    },
    {
      name: "N° Factura",
      selector: (row) => row.factura_number,
    },
    {
      name: "Fecha Factura",
      selector: (row) =>
        row.factura_Date ? row.factura_Date.split("T")[0] : "",
    },
  ];

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <DataTable
          columns={columns}
          data={filteredData(searchTerm)}
          pagination
          paginationComponentOptions={{
            rowsPerPageText: "Filas por página:",
            rangeSeparatorText: "de",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "Todos",
          }}
          subHeader
          subHeaderComponent={
            <div className="flex items-center justify-start">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded-md mr-2"
              />
            </div>
          }
        />
      </div>
    </>
  );
};

export default TablaOrdenesPendientes;
