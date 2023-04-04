import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemDocumentoAuditoria from "../components/itemDocumentoAuditorias";
import Pagination from "@mui/material/Pagination";

const API_URL = process.env.API_URL;

export default function ConsultaAuditorias() {
  const [consultaAuditoria, setConsultaAuditoria] = useState({
    registros: [],
    pinAuditor: "",
    pageNumber: 0,
    resultsPerPage: 5,
  });

  useEffect(() => {
    axios
      .get(API_URL + "document/F_TI_DT_013REV3")
      .then((res) => {
        setConsultaAuditoria({ ...consultaAuditoria, registros: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePinAuditorChange = (evt) => {
    setConsultaAuditoria({
      ...consultaAuditoria,
      pinAuditor: evt.currentTarget.value,
    });
  };

  const handlePageChange = (event, value) => {
    setConsultaAuditoria({
      ...consultaAuditoria,
      pageNumber: value - 1,
    });
  };

  const getPaginatedRecords = () => {
    const { registros, pageNumber, resultsPerPage, pinAuditor } =
      consultaAuditoria;
    const pagesVisited = pageNumber * resultsPerPage;

    const paginatedRecords = registros
      .filter((registro) => {
        if (parseInt(registro.pin) === parseInt(pinAuditor)) {
          return registro;
        }
      })
      .slice(pagesVisited, pagesVisited + resultsPerPage);
    return paginatedRecords;
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
      <h1>Consulta de Auditorias</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Doloribus temporibus delectus quidem
        voluptas,
      </p>
      <label htmlFor="pin">Introduce tu pin de auditor</label>
      <input
        type="number"
        name="pin"
        placeholder="Pin Auditor"
        value={consultaAuditoria.pinAuditor}
        onChange={handlePinAuditorChange}
      />
      <div id="contenido" style={{ width: "80%" }}>
        {consultaAuditoria.registros.length > 0 &&
        getPaginatedRecords().length > 0 ? (
          getPaginatedRecords().map((registro) => (
            <ItemDocumentoAuditoria
              key={registro._id}
              nombre={registro.datosUsuarioResponsable.nombre}
              idDocumento={registro._id}
            />
          ))
        ) : (
          <h1>Introduce tu pin para ver los registros.</h1>
        )}
      </div>
      <div id="paginas">
        <Pagination
          count={Math.ceil(
            consultaAuditoria.registros.filter(
              (registro) => registro.pin === consultaAuditoria.pinAuditor
            ).length / consultaAuditoria.resultsPerPage
          )}
          page={consultaAuditoria.pageNumber + 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
