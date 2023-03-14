import React from "react";
import { Link } from "react-router-dom";
import styles from "./../css/Root.module.css";

const API_URL = process.env.API_URL;

export default function itemDocumentoAuditoria({ nombre, idDocumento }) {
  return (
    <div className={styles.containerItem} style={{ margin: "20px" }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/417/417213.png"
        alt={nombre}
      />
      <div className={styles.containerItemInfo}>
        <h3>{nombre}</h3>
        <p>{idDocumento}</p>
      </div>
      <a
        className={styles.link}
        href={API_URL + "/document/F_TI_DT_013REV3_PDF/" + idDocumento}
      >
        Ver PDF generado
      </a>
    </div>
  );
}
