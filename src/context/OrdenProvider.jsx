import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const OrdenesContext = createContext();

const OrdenProvider = ({ children }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [orden, setOrden] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerOrdenes = async () => {
      setCargando(true);
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/ot", config);
        setOrdenes(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerOrdenes();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitOT = async (ot, id) => {
    if (id) {
      await editarOT(ot, id);
    } else {
      await nuevaOT(ot);
    }
  };

  const nuevaOT = async (ot) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/ot", ot, config);

      setOrdenes([...ordenes, data]);

      setAlerta({
        msg: "Orden de trabajo creada correctamente",
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/OTs/lista-ot");
      }, 3000);
    } catch (error) {
      console.error();
    }
  };

  const editarOT = async (ot, id) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await clienteAxios.put(`/ot/${id}`, ot, config);

      const ordenesActualizadas = ordenes.map((ordenState) =>
        ordenState._id === data.data._id ? data.data : ordenState
      );
      setOrdenes(ordenesActualizadas);
      setAlerta({
        msg: "Orden de trabajo actualizada correctamente",
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/OTs/lista-ot");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerOT = async (id) => {
    setCargando(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/ot/${id}`, config);
      setOrden(data);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  const eliminarOT = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await clienteAxios.delete(`/ot/${id}`, config);

      const otActualizadas = ordenes.filter(
        (ordenState) => ordenState._id !== id
      );
      setOrdenes(otActualizadas);
      setAlerta({
        msg: data.data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFiles = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      };

      const response = await clienteAxios(`/ot/files/${id}`, config);
      console.log(response);
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesionProvider = () => {
    setOrdenes([]);
    setOrden({});
    setAlerta({});
  }

  return (
    <OrdenesContext.Provider
      value={{
        ordenes,
        mostrarAlerta,
        alerta,
        submitOT,
        obtenerOT,
        orden,
        cargando,
        setCargando,
        eliminarOT,
        downloadFiles,
        cerrarSesionProvider
      }}
    >
      {children}
    </OrdenesContext.Provider>
  );
};

export { OrdenProvider };

export default OrdenesContext;
