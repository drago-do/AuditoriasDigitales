import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./../css/Root.module.css";

const API_URL = process.env.API_URL;

export default function itemDocumentoAuditoria({
  nombre,
  idDocumento,
  numeroResponsiva,
}) {
  //consultar si existen imagenes para este documento
  const [imagenes, setImagenes] = useState(false);
  useEffect(() => {
    axios
      .get(API_URL + "document/F_TI_DT_013REV3/image/exists/" + idDocumento)
      .then((res) => {
        //Si la respuesta es true, entonces hay imagenes
        if (res.data) {
          setImagenes(true);
        }
      })
      .catch((err) => {
        setImagenes(false);
      });
  }, []);

  const deleteImagesHandle = () => {
    axios
      .delete(API_URL + "document/F_TI_DT_013REV3/image/" + idDocumento)
      .then((res) => {
        //Si la respuesta es true, entonces hay imagenes
        if (res.data) {
          alert("Se eliminaron las imagenes correctamente");
          //Reload page before 2 seconds
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        alert("Error eliminando las imagenes");
      });
  };

  const handleEliminarRegistro = (idDocumento) => {
    axios
      .delete(API_URL + "document/F_TI_DT_013REV3/" + idDocumento)
      .then((res) => {
        //Si la respuesta es true, entonces hay imagenes
        if (res.data) {
          alert("Se eliminó el registro correctamente");
          //Reload page before 2 seconds
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        alert("Error eliminando el registro");
      });
  };

  return (
    <div className={styles.containerItem} style={{ margin: "20px" }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/417/417213.png"
        alt={nombre}
      />
      <div className={styles.containerItemInfo}>
        <h3>{nombre}</h3>
        <p>{numeroResponsiva}</p>
        <p>{idDocumento}</p>
      </div>
      <div style={{ display: "flex" }}>
        {imagenes ? (
          <>
            <a
              className={styles.link}
              href={API_URL + "document/F_TI_DT_013REV3/image/" + idDocumento}
            >
              Descargar Imágenes
            </a>
            <div
              className={(styles.link, styles.deleteLink)}
              onClick={deleteImagesHandle}
            >
              Eliminar Imágenes
            </div>
          </>
        ) : (
          <ImageUpload idDocumento={idDocumento} />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a
          className={styles.link}
          href={API_URL + "document/F_TI_DT_013REV3_PDF/" + idDocumento}
        >
          Ver PDF generado
        </a>
        <button
          className={styles.deleteLink}
          onClick={() => handleEliminarRegistro(idDocumento)}
        >
          Eliminar Registro
        </button>
      </div>
    </div>
  );
}

const ImageUpload = ({ idDocumento }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFiles) {
      alert("No se selecciono ninguna imagen");
      return;
    }

    //Verifica que los archivos sean solo imagenes
    for (let i = 0; i < selectedFiles.length; i++) {
      if (!selectedFiles[i].type.includes("image")) {
        alert(
          "Solo se pueden subir imagenes. Este archivo: " +
            selectedFiles[i].name +
            " No es una imagen."
        );
        return;
      }
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image", selectedFiles[i]);
    }

    try {
      await axios.post(
        API_URL + "document/F_TI_DT_013REV3/upload/" + idDocumento,
        formData
      );
      alert("Las imagenes se subieron correctamente.");
      //Reload page before 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("Error al subir las imagenes. Solo puede subir un maximo de 5.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.link}>
      <label htmlFor="image">Subir evidencias</label>
      <input
        name="image"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};
