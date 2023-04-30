import React from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const ExportarExcel = ({ordenesFiltradas}) => {
  const exportXLSX = (ots) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "Lista de OT";
    const ws = XLSX.utils.json_to_sheet(
      ots.map((ot) => ({
        "Numero ot": ot.ot_number,
        "Numero om": ot.om_number,
        "Fecha de inicio": ot.init_Date,
        "Fecha de término": ot.end_Date,
        Cliente: ot.ot_client,
        Descripción: ot.ot_Description,
        Valor: ot.value,
        SOLPED: ot.solped,
        Aviso: ot.aviso,
        "Orden de compra": ot.oc_number,
        "Fecha orden de compra": ot.oc_Date,
        "Guía Despacho Cliente": ot.gd_number_client,
        "Fecha Guía de Despacho Cliente": ot.gd_Date_client,
        "Guía de Despacho": ot.gd_number,
        "Fecha Guía de Despacho": ot.gd_Date,
        "Fecha Estado de Pago": ot.ep_Date,
        HES: ot.HES,
        "Fecha HES": ot.HES_Date,
        Factura: ot.factura_number,
        "Fecha Factura": ot.factura_Date,
        Observaciones: ot.observaciones,
      }))
    );
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      type="button"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex"
      onClick={() => exportXLSX(ordenesFiltradas)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
          clipRule="evenodd"
        />
        <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
      </svg>
      Exportar Excel
    </button>
  );
};

export default ExportarExcel;
