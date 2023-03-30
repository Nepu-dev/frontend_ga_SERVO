import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { OrdenProvider } from "./context/OrdenProvider";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
import Login from "./pages/Login";
import OTs from "./pages/OTs";
import NuevaOT from "./pages/NuevaOT";
import EditarOT from "./pages/EditarOT";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrdenProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="/OTs" element={<RutaProtegida />}>
              <Route index element={<OTs />} />
              <Route path="crear-ot" element={<NuevaOT/>}/>
              <Route path="lista-ot" element={<OTs/>}/>
              <Route path=":id" element={<NuevaOT/>}/>
              <Route path="editar/:id" element={<EditarOT/>}/>
            </Route>
          </Routes>
        </OrdenProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
