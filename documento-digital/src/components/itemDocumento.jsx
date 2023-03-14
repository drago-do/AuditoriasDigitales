import React from "react";
import { Link } from "react-router-dom";
import styles from "./../css/Root.module.css";

export default function itemDocumento({ nombre, descripcion, url, imagen }) {
  return (
    <div className={styles.containerItem}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/417/417213.png"
        alt={nombre}
      />
      <div className={styles.containerItemInfo}>
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
      </div>
      <Link className={styles.link} to={url}>
        Crear nuevo documento
      </Link>
    </div>
  );
}
