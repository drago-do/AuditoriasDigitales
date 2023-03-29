import React from "react";
import styles from "./../css/Root.module.css";
import ItemDocumento from "../components/itemDocumento";
import LoaderEnviando from "../components/loaderEnviando";

export default function Root() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <h1>Documentos digitales</h1>
        </div>
        <div className="col-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Administrar
          </button>
        </div>
      </div>
      <p>Este es un ejemplo de una aplicación de documentos digitales.</p>
      <div>
        <ItemDocumento
          nombre="Auditorias"
          descripcion="Documento para registrar auditorias a equipos de computo"
          crearDocumento={"/auditorias-documento"}
          consultaDocumento={"/auditorias-documento/ver-registros"}
        />
      </div>
    </div>
  );
}
