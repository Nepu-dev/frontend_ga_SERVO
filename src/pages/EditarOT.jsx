import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useOrdenes from "../hooks/useOrdenes";
import FormularioOT from '../components/FormularioOT'
import Spinner from '../components/Spinner';


const EditarOT = () => {

  const { cargando, obtenerOT, orden } = useOrdenes();
  const params = useParams();

  useEffect(() => {
    obtenerOT(params.id);
  },[])

  return (
    cargando ? <Spinner/> :
    (<>
    <h1 className="text-4xl font-black">Orden de trabajo: {orden.ot_number}</h1>
    <div className="mt-10 flex justify-center place-content-center">
        <FormularioOT/>
    </div>
  </>)
  )
}

export default EditarOT