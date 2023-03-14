import React from "react";
import { Link } from "react-router-dom";

export default function DetallesRegistro(props) {
  const queryParameters = new URLSearchParams(window.location.search);
  const envio = queryParameters.get("envio");
  const idDocumentoComillas = queryParameters.get("idDocumento");
  const idDocumento = idDocumentoComillas.slice(1, -1);

  const mensaje = queryParameters.get("mensaje");
  const tipoDocumento = queryParameters.get("tipoDocumento");

  //Obtener variable de entorno
  const API_URL = process.env.API_URL;

  //Si el envió es exitoso
  if (envio === "true") {
    return (
      <div>
        <h1>Envió Exitoso</h1>
        <a href={API_URL + tipoDocumento + idDocumento}>Ver PDF generado</a>
        {/* boton link para realizar otro registro */}
        <Link to={"/auditorias-documento"}>Realizar otro registro</Link>
      </div>
    );
  } else {
    //Si el envió no es exitoso
    return (
      <div>
        <h1>Envió Fallido</h1>
        <p>{mensaje}</p>
      </div>
    );
  }
}
