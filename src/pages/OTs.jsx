import ExportarExcel from "../components/ExportarExcel";
import ExportarPDF from "../components/ExportarPDF";
import Spinner from "../components/Spinner";
import TablaOrdenesPendientes from "../components/TablaOrdenesPendientes";
import useOrdenes from "../hooks/useOrdenes";

const OTs = () => {
  const { ordenes, cargando } = useOrdenes();
  const ordenesFiltradas = ordenes.filter((orden) => orden.ot_state === false);

  return cargando ? (
    <Spinner />
  ) : (
    <>
      <h1 className="text-4xl font-black">Órdenes de trabajo pendientes</h1>
      <div className="mt-10 flex justify-center place-content-center">
        <div className="place-content-end justify-between">
          <div className="flex">
            <ExportarExcel ordenesFiltradas={ordenesFiltradas} />
            <ExportarPDF tableData={ordenesFiltradas} />
          </div>
          <TablaOrdenesPendientes ordenesFiltradas={ordenesFiltradas} />
        </div>
      </div>
    </>
  );
};

export default OTs;
