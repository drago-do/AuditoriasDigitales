import React from "react";

export default function DetallesRegistro(props) {
  const queryParameters = new URLSearchParams(window.location.search);
  const envio = queryParameters.get("envio");
  const mensaje = queryParameters.get("mensaje");

  //Si el envió es exitoso
  if (envio === "true") {
    return (
      <div>
        <h1>Envió Exitoso</h1>
        <p>{mensaje}</p>
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
