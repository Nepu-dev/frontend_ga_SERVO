import React, { useState, useEffect } from "react";
import useOrdenes from "../hooks/useOrdenes";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";

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
    gd_number: "",
    gd_Date: "",
    HES: "",
    HES_Date: "",
    factura_number: "",
    factura_Date: "",
    observaciones: "",
    ot_pictures: "",
  });

  const { mostrarAlerta, alerta, submitOT, orden } = useOrdenes();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setId(params.id);
      setFormulario({
        ot_number: orden.ot_number || '',
        om_number: orden.om_number || '',
        init_Date: orden.init_Date?.split('T')[0] || '',
        end_Date: orden.end_Date?.split('T')[0] || '',
        ot_Description: orden.ot_Description || '',
        value: orden.value || '',
        solped: orden.solped || '',
        aviso: orden.aviso || '',
        oc_number: orden.oc_number || '',
        oc_Date: orden.oc_Date?.split('T')[0] || '',
        gd_number: orden.gd_number || '',
        gd_Date: orden.gd_Date?.split('T')[0] || '',
        HES: orden.HES || '',
        HES_Date: orden.HES_Date?.split('T')[0] || '',
        factura_number: orden.factura_number || '',
        factura_Date: orden.factura_Date?.split('T')[0] || '',
        observaciones: orden.observaciones || '',
        ot_pictures: orden.ot_pictures || '',
      });
    } else {
      console.log("Nuevo proyecto.");
    }
  }, [params])

  const onChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if ([formulario.ot_number, formulario.om_number, formulario.init_Date, formulario.end_Date, formulario.value].includes('')) {
      mostrarAlerta({
        msg: "Ingrese los campos obligatorios (OT, OM, FECHAS Y VALOR)",
        error: true,
      });
      return;
    }

    await submitOT(formulario, id);

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
      gd_number: "",
      gd_Date: "",
      HES: "",
      HES_Date: "",
      factura_number: "",
      factura_Date: "",
      observaciones: "",
      ot_pictures: "",
    });
  };

  const { msg } = alerta;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Formulario de Registro</h2>
      </div>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit}>
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
            Valor:{" "}
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
            {id ? "Actualizar" : "Crear OT"};
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioOT;
