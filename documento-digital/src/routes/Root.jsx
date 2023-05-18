import React from "react";
import styles from "./../css/Root.module.css";
import ItemDocumento from "../components/itemDocumento";
import LoaderEnviando from "../components/loaderEnviando";
import { Link } from "react-router-dom";
export default function Root() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <h1>Documentos digitales</h1>
        </div>
        <div className="col-2">
          <Link className="btn btn-secondary" to={"/login"}>
            Administrar
          </Link>
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
