import { useContext } from "react"
import OrdenesContext from "../context/OrdenProvider"

const useOrdenes = () => {
  return useContext(OrdenesContext)
}

export default useOrdenes