import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = sessionStorage.getItem('token')
      if (!token) {
        setCargando(false)
        return
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const { data } = await clienteAxios('/users/perfil', config)
        setAuth(data);
        navigate('/OTs')
      } catch (error) {
        console.log(error);
        setAuth({})
      }
      setCargando(false)
    }
    autenticarUsuario();
  }, [])

  return (
    <AuthContext.Provider
    value={{
      auth,
      setAuth

    }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export {
    AuthProvider
}

export default AuthContext