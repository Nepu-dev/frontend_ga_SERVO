import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([user, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return
    }

    try {
      const { data } = await clienteAxios.post('/users/login', { user, password})
      setAlerta({})
      sessionStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/OTs/lista-ot');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-300 text-6xl capitalize font-black text-center">
        Inicia Sesión para acceder a{" "}
        <span className="text-slate-500">SERVO LTDA</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form className="bg-white shadow rounded-lg my-10 py-5 px-5" onSubmit={handleSubmit}>
        <div className="my-4">
          <label
            className="font-bold uppercase block text-gray-700"
            htmlFor="user"
          >
            Usuario
          </label>
          <input
            className="w-full border bg-gray-50 rounded-lg mt-3 p-2"
            type="text"
            id="user"
            value={user}
            onChange={ e => setUser(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label
            className="font-bold uppercase block text-gray-700"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="w-full border bg-gray-50 rounded-lg mt-3 p-2"
            type="password"
            id="password"
            value={password}
            onChange={ e => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value={"Iniciar Sesión"}
            className="bg-sky-700 w-full uppercase text-white font-bold p-3 mt-10 rounded-lg
            hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </div>
      </form>
    </>
  );
};

export default Login;
