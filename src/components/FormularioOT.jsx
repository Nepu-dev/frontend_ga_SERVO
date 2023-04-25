import React, { useState, useEffect } from "react";
import useOrdenes from "../hooks/useOrdenes";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";
import PdfViewer from "./PdfViewer";

const FormularioOT = () => {
  const [id, setId] = useState(null);

  const [formulario, setFormulario] = useState({
    ot_number: "",
    om_number: "",
    init_Date: "",
    end_Date: "",
    ot_Description: "",
    value: "",
    solped: "",
    aviso: "",
    oc_number: "",
    oc_Date: "",
    gd_number_client: "",
    gd_Date_client: "",
    gd_number: "",
    gd_Date: "",
    ep_Date: "",
    HES: "",
    HES_Date: "",
    factura_number: "",
    factura_Date: "",
    ot_state: false,
    observaciones: "",
    ot_pictures: [],
  });

  const { mostrarAlerta, alerta, submitOT, orden, downloadFiles, mostrarFiles, index } =
    useOrdenes();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setId(params.id);
      setFormulario({
        ot_number: orden.ot_number || "",
        om_number: orden.om_number || "",
        init_Date: orden.init_Date?.split("T")[0] || "",
        end_Date: orden.end_Date?.split("T")[0] || "",
        ot_Description: orden.ot_Description || "",
        value: orden.value || "",
        solped: orden.solped || "",
        aviso: orden.aviso || "",
        oc_number: orden.oc_number || "",
        oc_Date: orden.oc_Date?.split("T")[0] || "",
        gd_number_client: orden.gd_number_client || "",
        gd_Date_client: orden.gd_Date_client?.split("T")[0] || "",
        gd_number: orden.gd_number || "",
        gd_Date: orden.gd_Date?.split("T")[0] || "",
        ep_Date: orden.ep_Date?.split("T")[0] || "",
        HES: orden.HES || "",
        HES_Date: orden.HES_Date?.split("T")[0] || "",
        factura_number: orden.factura_number || "",
        factura_Date: orden.factura_Date?.split("T")[0] || "",
        ot_state: orden.ot_state || false,
        observaciones: orden.observaciones || "",
        ot_pictures: orden.ot_pictures || [],
      });
    } 
  }, [params]);

  const onChange = (e) => {
    const { name, value, files, checked } = e.target;
    if (e.target.type === "file") {
      setFormulario({
        ...formulario,
        ot_pictures: [...files],
      });
    } else {
      setFormulario({
        ...formulario,
        [name]: name === "ot_state" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (
      [
        formulario.ot_number,
        formulario.om_number,
        formulario.init_Date,
        formulario.end_Date,
        formulario.value,
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Ingrese los campos obligatorios (OT, OM, FECHAS Y VALOR)",
        error: true,
      });
      return;
    }

    formdata.append("ot_number", formulario.ot_number);
    formdata.append("om_number", formulario.om_number);
    formdata.append("init_Date", formulario.init_Date);
    formdata.append("end_Date", formulario.end_Date);
    formdata.append("ot_Description", formulario.ot_Description);
    formdata.append("value", formulario.value);
    formdata.append("solped", formulario.solped);
    formdata.append("aviso", formulario.aviso);
    formdata.append("oc_number", formulario.oc_number);
    formdata.append("oc_Date", formulario.oc_Date);
    formdata.append("gd_number_client", formulario.gd_number_client);
    formdata.append("gd_Date_client", formulario.gd_Date_client);
    formdata.append("gd_number", formulario.gd_number);
    formdata.append("gd_Date", formulario.gd_Date);
    formdata.append("ep_Date", formulario.ep_Date);
    formdata.append("HES", formulario.HES);
    formdata.append("HES_Date", formulario.HES_Date);
    formdata.append("factura_number", formulario.factura_number);
    formdata.append("factura_Date", formulario.factura_Date);
    formdata.append("ot_state", formulario.ot_state);
    formdata.append("observaciones", formulario.observaciones);
    for (let i = 0; i < formulario.ot_pictures.length; i++) {
      formdata.append("ot_pictures", formulario.ot_pictures[i]);
    }

    await submitOT(formdata, id);

    setId(null);
    setFormulario({
      ot_number: "",
      om_number: "",
      init_Date: "",
      end_Date: "",
      ot_Description: "",
      value: "",
      solped: "",
      aviso: "",
      oc_number: "",
      oc_Date: "",
      gd_number_client: "",
      gd_Date_client: "",
      gd_number: "",
      gd_Date: "",
      ep_Date: "",
      HES: "",
      HES_Date: "",
      factura_number: "",
      factura_Date: "",
      ot_state: false,
      observaciones: "",
      ot_pictures: [],
    });
  };

  const { msg } = alerta;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">
          {id ? "Formulario de Edición" : "Formulario de Registro"}
        </h2>
        {id ? (
          <button onClick={() => mostrarFiles(orden._id, index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z" />
            </svg>
          </button>
        ) : (
          ""
        )}
        {id ? (
          <button
            onClick={() => {
              downloadFiles(id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          ""
        )}
      </div>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Aquí irían los campos del primer paso del formulario */}
        <div className="flex justify-between mb-5">
          <label className="font-semibold text-sm uppercase" htmlFor="">
            N° OT:{" "}
          </label>
          <input
            className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
            placeholder="Ex: 1200###"
            type="number"
            name="ot_number"
            value={formulario.ot_number}
            onChange={onChange}
          />
        </div>
        <div className="flex justify-between mb-5">
          <label className="font-semibold text-sm uppercase" htmlFor="">
            N° OM:{" "}
          </label>
          <input
            className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
            placeholder="Ex: 1200###"
            type="number"
            name="om_number"
            value={formulario.om_number}
            onChange={onChange}
          />
        </div>
        <div className="flex justify-between mb-5">
          <label className="font-semibold text-sm uppercase" htmlFor="">
            Fecha de ingreso:{" "}
          </label>
          <input
            className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
            type="Date"
            name="init_Date"
            value={formulario.init_Date}
            onChange={onChange}
          />
        </div>
        <div className="flex justify-between mb-5">
          <label className="font-semibold text-sm uppercase" htmlFor="">
            Fecha de Término:{" "}
          </label>
          <input
            className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
            type="Date"
            name="end_Date"
            value={formulario.end_Date}
            onChange={onChange}
          />
        </div>
        {/* Aquí irían los campos del segundo paso del formulario */}
        <div className="flex justify-between w-full mb-5">
          <label className="font-semibold text-sm uppercase" htmlFor="">
            Descripción:{" "}
          </label>
          <textarea
            className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
            name="ot_Description"
            id=""
            cols="30"
            rows="5"
            placeholder="Descripción de la orden de trabajo..."
            value={formulario.ot_Description}
            onChange={onChange}
          ></textarea>
        </div>
        {/* Aquí irían los campos del tercer paso del formulario */}
        <div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Valor Neto:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="value"
              placeholder="$#####"
              value={formulario.value}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Solped:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="solped"
              placeholder="##########"
              value={formulario.solped}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Aviso:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="aviso"
              placeholder="##########"
              value={formulario.aviso}
              onChange={onChange}
            />
          </div>
        </div>
        {/* Aquí irían los campos del cuarto paso del formulario */}
        <div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Orden de Compra:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="oc_number"
              placeholder="##########"
              value={formulario.oc_number}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Fecha orden de compra:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="Date"
              name="oc_Date"
              value={formulario.oc_Date}
              onChange={onChange}
            />
          </div>
        </div>
        {/* Aquí irían los campos del quinto paso del formulario */}
        <div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              N° guía de despacho de Cliente:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="gd_number_client"
              placeholder="###"
              value={formulario.gd_number_client}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Fecha guía de despacho de Cliente:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="Date"
              name="gd_Date_client"
              value={formulario.gd_Date_client}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              N° guía de despacho:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="gd_number"
              placeholder="###"
              value={formulario.gd_number}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Fecha guía de despacho:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="Date"
              name="gd_Date"
              value={formulario.gd_Date}
              onChange={onChange}
            />
          </div>
        </div>
        {/* Aquí irían los campos del sexto paso del formulario */}
        <div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Fecha Estado de pago{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="Date"
              name="ep_Date"
              value={formulario.ep_Date}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              N° HES:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="HES"
              placeholder="##########"
              value={formulario.HES}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Fecha HES:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="Date"
              name="HES_Date"
              value={formulario.HES_Date}
              onChange={onChange}
            />
          </div>
        </div>
        {/* Aquí irían los campos del séptimo paso del formulario */}
        <div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              N° Factura:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="number"
              name="factura_number"
              placeholder="###"
              value={formulario.factura_number}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="font-semibold text-sm uppercase" htmlFor="">
              Fecha factura:{" "}
            </label>
            <input
              className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
              type="Date"
              name="factura_Date"
              value={formulario.factura_Date}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between mb-5">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-500"
                checked={formulario.ot_state}
                name="ot_state"
                onChange={onChange}
              />
              <span className="text-gray-900 font-medium">Lista</span>
            </label>
          </div>
        </div>
        {/* Aquí irían los campos del octavo paso del formulario */}
        <div className="mb-5">
          <label className="font-semibold text-sm uppercase" htmlFor="">
            Documentos:{" "}
          </label>
          <input
            className="py-2 px-3 rounded-md focus:outline-none bg-gray-300 text-gray-700 border border-gray-400 hover:bg-gray-500 hover:border-gray-500"
            type="file"
            multiple
            name="ot_pictures"
            onChange={onChange}
          />
        </div>
        <div className="flex justify-between mb-5">
          <label className="font-semibold text-sm uppercase" htmlFor="">
            Observaciones:{" "}
          </label>
          <textarea
            className="rounded-md border-2 border-sky-600 focus:outline-none focus:border-sky-500 px-2 py-1 text-gray-400 bg-gray-200"
            name="observaciones"
            id=""
            cols="30"
            rows="5"
            placeholder="Escriba aquí sus observaciones..."
            value={formulario.observaciones}
            onChange={onChange}
          ></textarea>
        </div>
        <div>
          <button
            className="bg-sky-600 text-center text-white w-full font-bold p-3 rounded-md hover:bg-sky-700 transition-colors"
            type="submit"
          >
            {id ? "Actualizar" : "Crear OT"}
          </button>
        </div>
      </form>
      <PdfViewer />
    </div>
  );
};

export default FormularioOT;
