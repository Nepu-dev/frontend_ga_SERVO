import Spinner from "../components/Spinner";
import TablaOrdenes from "../components/TablaOrdenes";
import ExportarExcel from "../components/ExportarExcel";
import ExportarPDF from "../components/ExportarPDF";
import useOrdenes from "../hooks/useOrdenes";


const Checkedots = () => {
  const { ordenes, cargando } = useOrdenes();
  const ordenesFiltradas = ordenes.filter((orden) => orden.ot_state === true);

  return cargando ? (
    <Spinner />
  ) : (
    <>
      <h1 className="text-4xl font-black">Órdenes de trabajo</h1>
      <div className="mt-10 flex justify-center place-content-center">
      <div className="place-content-end justify-between">
          <div className="flex">
            <ExportarExcel ordenesFiltradas={ordenesFiltradas} />
            <ExportarPDF tableData={ordenesFiltradas} />
          </div>
          <TablaOrdenes ordenesFiltradas={ordenesFiltradas} />
        </div>
      </div>
    </>
  );
};

export default Checkedots;