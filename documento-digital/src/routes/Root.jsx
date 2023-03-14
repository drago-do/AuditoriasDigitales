import React from "react";
import styles from "./../css/Root.module.css";
import ItemDocumento from "../components/itemDocumento";
import { Button } from "bootstrap";
import LoaderEnviando from "../components/loaderEnviando";

export default function Root() {
  return (
    <div className="container">
      <h1>Documentos digitales</h1>
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
