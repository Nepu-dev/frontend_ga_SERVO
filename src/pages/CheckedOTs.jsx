import Spinner from "../components/Spinner";
import TablaOrdenes from "../components/TablaOrdenes";

import useOrdenes from "../hooks/useOrdenes";


const CheckedOTs = () => {
  const { cargando } = useOrdenes();

  return cargando ? (
    <Spinner />
  ) : (
    <>
      <h1 className="text-4xl font-black">Órdenes de trabajo</h1>
      <div className="mt-10 flex justify-center place-content-center">
        <div>
          <TablaOrdenes />
        </div>
      </div>
    </>
  );
};

export default CheckedOTs;