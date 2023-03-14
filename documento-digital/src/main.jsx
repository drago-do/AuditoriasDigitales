import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Auditorias from "./routes/Auditorias";
import DetallesRegistro from "./routes/DetallesRegistro";
import ConsultaAuditorias from "./routes/ConsultaAuditorias";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "auditorias-documento",
    element: <Auditorias />,
  },
  {
    path: "detalles-registro",
    element: <DetallesRegistro />,
  },
  {
    path: "/auditorias-documento/ver-registros",
    element: <ConsultaAuditorias />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
