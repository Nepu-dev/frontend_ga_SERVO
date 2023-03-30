import Alerta from "../components/Alerta";
import FormularioOT from "../components/FormularioOT";
import Spinner from "../components/Spinner";
import TablaOrdenesPendientes from "../components/TablaOrdenesPendientes";
import useOrdenes from "../hooks/useOrdenes";

const OTs = () => {
  const { ordenes, cargando, alerta } = useOrdenes();

  const msg = alerta;

  return cargando ? (
    <Spinner />
  ) : (
    <>
      <h1 className="text-4xl font-black">Órdenes de trabajo</h1>
      <div className="mt-10 flex justify-center place-content-center">
        <div>
          <TablaOrdenesPendientes />
        </div>
      </div>
    </>
  );
};

export default OTs;
