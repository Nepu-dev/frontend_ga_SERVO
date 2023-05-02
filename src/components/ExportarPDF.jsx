import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportarPDF = ({ tableData }) => {
  const columns = [
    { header: "N° OT", dataKey: "ot_number" },
    { header: "N° OM", dataKey: "om_number" },
    { header: "Fecha de inicio", dataKey: "init_Date" },
    { header: "Fecha de Término", dataKey: "end_Date" },
    { header: "Cliente", dataKey: "ot_client" },
    { header: "Descripción", dataKey: "ot_Description" },
    { header: "Valor", dataKey: "value" },
    { header: "SOLPED", dataKey: "solped" },
    { header: "Aviso", dataKey: "aviso" },
    { header: "N° Orden de compra", dataKey: "oc_number" },
    { header: "Fecha orden de compra", dataKey: "oc_Date" },
    { header: "Guia Despacho Cliente", dataKey: "gd_number_client" },
    { header: "Fecha Guia Despacho Cliente", dataKey: "gd_Date_client" },
    { header: "N° Guia Despacho", dataKey: "gd_number" },
    { header: "Fecha Guia Despacho", dataKey: "gd_Date" },
    { header: "Fecha Estado de Pago", dataKey: "ep_Date" },
    { header: "HES", dataKey: "HES" },
    { header: "Fecha HES", dataKey: "HES_Date" },
    { header: "N° Factura", dataKey: "factura_number" },
    { header: "Fecha Factura", dataKey: "factura_Date" },
    { header: "Observaciones", dataKey: "observaciones" },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF("landscape");
    let startY = 10;
    const table = doc.autoTable({
      columns: columns,
      body: tableData.map((ot) => {
        return {
          ot_number: ot.ot_number,
          om_number: ot.om_number,
          init_Date: ot.init_Date,
          end_Date: ot.end_Date,
          ot_client: ot.ot_client,
          ot_Description: ot.ot_Description,
          value: ot.value,
          solped: ot.solped,
          aviso: ot.aviso,
          oc_number: ot.oc_number,
          oc_Date: ot.oc_Date,
          gd_number_client: ot.gd_number_client,
          gd_Date_client: ot.gd_Date_client,
          gd_number: ot.gd_number,
          gd_Date: ot.gd_Date,
          ep_Date: ot.ep_Date,
          HES: ot.HES,
          HES_Date: ot.HES_Date,
          factura_number: ot.factura_number,
          factura_Date: ot.factura_Date,
          observaciones: ot.observaciones,
        };
      }),
      columnStyles: {
        ot_number: {cellWidth: 10, fontSize: 5},
        om_number: {cellWidth: 10, fontSize: 5},
        init_Date: {cellWidth: 15, fontSize: 5},
        end_Date: {cellWidth: 15, fontSize: 5},
        ot_client: {cellWidth: 15, fontSize: 5},
        ot_Description: {cellWidth: 20, fontSize: 5},
        value: {cellWidth: 10, fontSize: 5},
        solped: {cellWidth: 10, fontSize: 5},
        aviso: {cellWidth: 10, fontSize: 5},
        oc_number: {cellWidth: 10, fontSize: 5},
        oc_Date: {cellWidth: 15, fontSize: 5},
        gd_number_client: {cellWidth: 10, fontSize: 5},
        gd_Date_client: {cellWidth: 15, fontSize: 5},
        gd_number: {cellWidth: 10, fontSize: 5},
        gd_Date: {cellWidth: 15, fontSize: 5},
        ep_Date: {cellWidth: 15, fontSize: 5},
        HES: {cellWidth: 15, fontSize: 5},
        HES_Date: {cellWidth: 15, fontSize: 5},
        factura_number: {cellWidth: 10, fontSize: 5},
        factura_Date: {cellWidth: 15, fontSize: 5},
        observaciones: {cellWidth: 20, fontSize: 5},
      },
      startY: startY,
      headStyles: {
        fontSize: 5 // Tamaño de fuente para el encabezado de la columna
      },
      didDrawPage: function(data){
        startY = data.cursor.y + 10;
      },
    });
    if (table.startY === startY) {
      // Si la tabla no se extendió a varias páginas, entonces guarda el archivo
      doc.save("tabla.pdf");
    } else {
      // Si la tabla se extendió a varias páginas, entonces agrega las siguientes páginas y guarda el archivo
      const totalPages = doc.getNumberOfPages();
      for (let i = 2; i <= totalPages; i++) {
        doc.setPage(i);
        doc.text("Página " + i, doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });
      }
      try {
        doc.save("tabla.pdf");
      } catch (error) {
        console.warn("Muchos datos en la tabla");
      }
    }
  };

  return (
    <button
      type="button"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex ml-5"
      onClick={downloadPDF}
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
      Exportar a PDF
    </button>
  );
};

export default ExportarPDF;
