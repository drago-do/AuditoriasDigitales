import React from "react";
import { Link } from "react-router-dom";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";
import "./../css/DetallesRegistro.css";

export default function DetallesRegistro(props) {
  const queryParameters = new URLSearchParams(window.location.search);
  const envio = queryParameters.get("envio");
  const idDocumentoComillas = queryParameters.get("idDocumento");
  let idDocumento = "";
  if (idDocumentoComillas) {
    idDocumento = idDocumentoComillas.slice(1, -1);
  }
  const mensaje = queryParameters.get("mensaje");
  const tipoDocumento = queryParameters.get("tipoDocumento");

  //Obtener variable de entorno
  const API_URL = process.env.API_URL;

  if (envio === "true") {
    return (
      <div className="contenedorPrincipal">
        <div className="mensaje mensajeExito">
          <AiFillCheckSquare />
          <h1>Envió Exitoso.</h1>
          <h2>Tu documento fue guardado con éxito.</h2>
        </div>
        <div className="urlRedireccion">
          <a className="pdf" href={API_URL + tipoDocumento + idDocumento}>
            Ver PDF generado
          </a>
          <Link className="normalBTN" to={"/auditorias-documento"}>
            Realizar otro registro
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="contenedorPrincipal">
        <div className="mensaje mensajeError">
          <AiFillCloseSquare />
          <h1>Envió Fallido</h1>
          <h2>El envió de tu archivo falló.</h2>
          <div className="contenedorError">
            <h3>{mensaje}</h3>
          </div>
        </div>
        <div className="urlRedireccion">
          <Link className="pdf" to={"/auditorias-documento"}>
            Realizar otro registro
          </Link>
        </div>
      </div>
    );
  }
}
