import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ItemDocumentoAuditoria from "../components/itemDocumentoAuditorias";
import Pagination from "@mui/material/Pagination";

const API_URL = process.env.API_URL + "/document/F_TI_DT_013REV3";

export default function ConsultaAuditorias() {
  // const [registros, setRegistros] = useState(null);

  const [registros, setRegistros] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const resultsPerPage = 5;
  const pagesVisited = pageNumber * resultsPerPage;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setRegistros(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, value) => {
    setPageNumber(value - 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>ConsultaAuditorias</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
        temporibus delectus quidem voluptas, ipsa nulla? Cupiditate, iure
        laudantium voluptate cumque alias labore rerum fuga? Quisquam non
        distinctio odio deleniti consequatur.
      </p>
      <div id="contenido" style={{ width: "80%" }}>
        {registros && registros.length > 0 ? (
          registros
            .slice(pagesVisited, pagesVisited + resultsPerPage)
            .map((registro) => {
              return (
                <ItemDocumentoAuditoria
                  key={registro._id}
                  nombre={registro.datosUsuarioResponsable.nombre}
                  idDocumento={registro._id}
                />
              );
            })
        ) : (
          <p>No hay registros</p>
        )}
      </div>
      <div id="paginas">
        <Pagination
          count={Math.ceil(registros.length / resultsPerPage)}
          page={pageNumber + 1}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
