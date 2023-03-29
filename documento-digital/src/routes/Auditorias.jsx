import React, { useState } from "react";
import LoaderEnviando from "../components/loaderEnviando";
import axios from "axios";

import style from "./../css/Auditorias.module.css";

const API_URL = process.env.API_URL + "document/F_TI_DT_013REV3";

export default function Auditorias() {
  const [loader, setLoader] = useState(false);

  const handleSubmit = (event) => {
    const fecha = new Date();
    const dataDia = fecha.getDate();
    const dataMes = fecha.getMonth() + 1;
    const dataAnio = fecha.getFullYear();

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const softwareAdicional = softwareBaseAdicional(data);
    let dataForm = {
      id: Date.now(),
      dia: dataDia,
      mes: dataMes,
      anio: dataAnio,
      datosUsuarioResponsable: {
        nombre: data.get("nombre"),
        puesto: data.get("puesto"),
        ubicacion: data.get("ubicacion"),
        direccion: data.get("direccion"),
      },

      datosEquipo: {
        tipo: data.get("tipo"),
        marca: data.get("marca"),
        modelo: data.get("modelo"),
        serviceTag: data.get("serviceTag"),
        macWIFI: data.get("macWIFI"),
        macLAN: data.get("macLAN"),
        nombreEquipo: data.get("nombreEquipo"),
        dominio: data.get("dominio"),
        accesoriosTIC: data.get("accesoriosTIC"),
        accesoriosPer: data.get("accesoriosPer"),
      },

      arquitecturaEquipo: {
        SO: data.get("SO"),
        versionSO: data.get("versionSO"),
        arquitectura: data.get("arquitectura"),
        officeVersion: data.get("officeVersion"),
        ram: data.get("ram"),
        agenteKase: data.get("kase"),
        tarjetaExtra: data.get("tarjetaExtra"),
      },
      configuracionBasica: {
        usuarioAdminTIC: data.get("usAdmin"),
        contraAdminHomologada: data.get("passAdmin"),
        permisosEstandares: data.get("permisos"),
        carpetaImagenGrupak: data.get("carpeta"),
        identidadGrupak: data.get("identidad"),
        menuGrupakDefault: data.get("menu"),
        vpn: data.get("vpn"),
        firmaCorreo: data.get("firma"),
        instanciaSAP: data.get("instancia"),
        oneDriveActualizado: data.get("oneDrive"),
      },
      configuracionSeguridad: {
        accesoNoVigilado: data.get("noVigilado"),
        zonaCoberturaDeshabilitado: data.get("cobertura"),
        iexplorerDeshabilitado: data.get("ie"),
        internetRestringido: data.get("internet"),
        recordarContraDeshabilitado: data.get("recordar"),
        gestorContra: data.get("gestor"),
        dobleAuthCorreo: data.get("doble"),
      },
      softwareBase: {
        bitDefender: softwareInstalado(data.get("bitDefender"))
          ? data.get("bitDefenderVersion")
          : "NO INSTALADO",
        gimp: softwareInstalado(data.get("gimp"))
          ? data.get("gimpVersion")
          : "NO INSTALADO",
        adobe: softwareInstalado(data.get("adobe"))
          ? data.get("adobeVersion")
          : "NO INSTALADO",
        ganttProject: softwareInstalado(data.get("ganttProject"))
          ? data.get("ganttProjectVersion")
          : "NO INSTALADO",
        libreOffice: softwareInstalado(data.get("libreOffice"))
          ? data.get("libreOfficeVersion")
          : "NO INSTALADO",
        winRAR: softwareInstalado(data.get("winRAR"))
          ? data.get("winRARVersion")
          : "NO INSTALADO",
        chrome: softwareInstalado(data.get("chrome"))
          ? data.get("chromeVersion")
          : "NO INSTALADO",
        vlc: softwareInstalado(data.get("vlc"))
          ? data.get("vlcVersion")
          : "NO INSTALADO",
        sap: softwareInstalado(data.get("sap"))
          ? data.get("sapVersion")
          : "NO INSTALADO",
        autoDesk: softwareInstalado(data.get("autoDesk"))
          ? data.get("autoDeskVersion")
          : "NO INSTALADO",
        teamViewer: softwareInstalado(data.get("teamViewer"))
          ? data.get("teamViewerVersion")
          : "NO INSTALADO",
        inkscape: softwareInstalado(data.get("inkscape"))
          ? data.get("inkscapeVersion")
          : "NO INSTALADO",
        firefox: softwareInstalado(data.get("firefox"))
          ? data.get("firefoxVersion")
          : "NO INSTALADO",
        microsoftTeams: softwareInstalado(data.get("microsoftTeams"))
          ? data.get("microsoftTeamsVersion")
          : "NO INSTALADO",
        bitWarden: softwareInstalado(data.get("bitWarden"))
          ? data.get("bitWardenVersion")
          : "NO INSTALADO",
        aimp: softwareInstalado(data.get("aimp"))
          ? data.get("aimpVersion")
          : "NO INSTALADO",
        drawio: softwareInstalado(data.get("drawio"))
          ? data.get("drawioVersion")
          : "NO INSTALADO",
        anyDesk: softwareInstalado(data.get("anyDesk"))
          ? data.get("anyDeskVersion")
          : "NO INSTALADO",
        lightShot: softwareInstalado(data.get("lightShot"))
          ? data.get("lightShotVersion")
          : "NO INSTALADO",
      },
      softwareAdicional: softwareAdicional,
    };
    setLoader(true);
    enviarDatos(dataForm);
  };

  const enviarDatos = (dataForm) => {
    //Enviar dataForm via post a URLapi usando axios
    axios
      .post(API_URL, dataForm)
      .then((response) => {
        //Si la respuesta es un código 200 entonces redirigir a pagina de DetallesRegistro, enviando parámetros (envió: true, mensaje: "string")
        if (response.status === 200) {
          console.warn("hey");
          console.log(response.data._id);
          //Sleep 1 second
          setTimeout(() => {
            //redirigir sin usar router
            window.location.href = `/detalles-registro?envio=true&idDocumento=${JSON.stringify(
              response.data._id
            )}&tipoDocumento=/document/F_TI_DT_013REV3_PDF/`;
          }, 5000);
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code

          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        //Redirigir después de 1 minuto
        setTimeout(() => {
          window.location.href = `/detalles-registro?envio=false&mensaje=${JSON.stringify(
            error
          )}`;
        }, 5000);
      });
  };

  const softwareInstalado = (instalado) => {
    return instalado === "Si";
  };

  const softwareBaseAdicional = (data) => {
    let softwareAdicional = [];
    for (let index = 1; index < 12; index++) {
      const nombreSoftware = data.get(`softwareBase${index}`);
      const version = data.get(`softwareBase${index}Version`);
      if (nombreSoftware !== "") {
        softwareAdicional.push([nombreSoftware, version]);
      }
    }
    return softwareAdicional;
  };

  return (
    <div className="container">
      {loader ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoaderEnviando />
          <h3>Enviando datos...</h3>
        </div>
      ) : (
        <form className={style.noPadding} onSubmit={handleSubmit}>
          <div>Ref. P-TI-DT-010</div>
          <div className="row align-items-end justify-content-between">
            <div className="col-8">
              <img
                src="/grupak-logo.png"
                alt="Grupak Logo"
                className={style.logo}
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="col">
              <h3 className={style.titulo}>
                FORMATO DE EJECUCIÓN DE AUDITORÍA
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col text-center tituloTabla">
              <h5 className={style.tituloTabla}>
                Datos del usuario responsable del equipo
              </h5>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Nombre completo:</p>
            </div>
            <div className="col-6 col-sm-10">
              <input
                type="text"
                name="nombre"
                autoComplete="name"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Puesto:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="puesto"
                autoComplete="organization-title"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Ubicación:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="ubicacion"
                autoComplete="address-line1"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>
                Dirección a la que pertenece:
              </p>
            </div>
            <div className="col-6 col-sm-10">
              <input
                type="text"
                name="direccion"
                autoComplete="address-line2"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col text-center tituloTabla">
              <h5 className={style.tituloTabla}>Datos del equipo</h5>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Tipo:</p>
            </div>
            <div className="col-6 col-sm-4">
              <select
                name="tipo"
                required
                className={style.datoSolicitado}
                defaultValue="Escritorio"
              >
                <option value="Escritorio">Escritorio</option>
                <option value="Laptop">Laptop</option>
                <option value="Tableta">Tableta</option>
              </select>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Marca:</p>
            </div>
            <div className="col-6 col-sm-4">
              <select
                name="marca"
                required
                defaultValue="Dell"
                className={style.datoSolicitado}
              >
                <option value="Dell">Dell</option>
                <option value="Mac">Mac</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Modelo:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="modelo"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>ServiceTag o S/N:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="serviceTag"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>MAC Address Wi-Fi:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="macWIFI"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>MAC Address Ethernet:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="macLAN"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>
                Nombre del Equipo (Hostname):
              </p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="nombreEquipo"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Dominio:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="dominio"
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-4 col-sm-2">
              <p className={style.datoSolicitado}>
                <br />
                Accesorios adicionales:
              </p>
            </div>
            <div className="col-4 col-sm-5">
              <input
                type="text"
                name="accesoriosTIC"
                placeholder="Asignados por TIC:"
                className={style.datoSolicitado}
              ></input>
            </div>
            <div className="col-4 col-sm-5">
              <input
                type="text"
                name="accesoriosPer"
                placeholder="Personales:"
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col text-center tituloTabla">
              <h5 className={style.tituloTabla}>
                Revisión de la arquitectura del equipo de cómputo
              </h5>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Sistema Operativo:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="SO"
                required
                defaultValue="Windows 10"
                className={style.datoSolicitado}
              ></input>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Versión S/O:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="versionSO"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Arquitectura:</p>
            </div>
            <div className="col-6 col-sm-4 text-center">
              <input
                type="radio"
                name="arquitectura"
                id="arquitectura1"
                value={"32"}
              />
              <label htmlFor="arquitectura1">32 bits</label>
              <input
                defaultChecked
                type="radio"
                name="arquitectura"
                id="arquitectura2"
                value={"64"}
              />
              <label htmlFor="arquitectura2">64 bits</label>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Versión de OFFICE:</p>
            </div>
            <div className="col-6 col-sm-4">
              <input
                type="text"
                name="officeVersion"
                required
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>RAM Instalada:</p>
            </div>
            <div className="col-6 col-sm-2">
              <input
                type="number"
                name="ram"
                min={1}
                required
                defaultValue="4"
                className={style.datoSolicitado}
              ></input>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>Agente KACE: </p>
            </div>
            <div className="col-6 col-sm-2 text-center">
              <div className={style.datoSolicitado}>
                <input
                  type="radio"
                  name="kase"
                  id="kase1"
                  value="si"
                  defaultChecked
                />
                <label htmlFor="kase1">Si</label>
                <input type="radio" name="kase" id="kase2" value="no" />
                <label htmlFor="kase2">No</label>
              </div>
            </div>
            <div className="col-6 col-sm-2">
              <p className={style.datoSolicitado}>
                Tarjeta Extra (RED, Video, etc.){" "}
              </p>
            </div>
            <div className="col-6 col-sm-2">
              <input
                type="text"
                name="tarjetaExtra"
                className={style.datoSolicitado}
              ></input>
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col text-center tituloTabla">
              <h5 className={style.tituloTabla}>
                Revisión del equipo de cómputo
              </h5>
            </div>
          </div>
          <p>
            Verificar las siguientes configuraciones en el equipo marcando la
            casilla que corresponda:
          </p>
          <table className="table table-light table-striped">
            <thead>
              <tr>
                <th scope="col">Configuración básica</th>
                <th scope="col">Si</th>
                <th scope="col">No</th>
                <th scope="col">N/A</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Usuario administrador "tic"</td>
                <td>
                  <input type="radio" id="tabla1" name="usAdmin" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla2" name="usAdmin" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla3" name="usAdmin" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>Contraseña de administrador homologada</td>
                <td>
                  <input type="radio" id="tabla4" name="passAdmin" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla5" name="passAdmin" value="No" />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla6"
                    name="passAdmin"
                    value="N/A"
                  />
                </td>
              </tr>
              <tr>
                <td>Permisos estándar en cuenta de usuario</td>
                <td>
                  <input type="radio" id="tabla7" name="permisos" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla8" name="permisos" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla9" name="permisos" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>Carpeta de Imagen Grupak en Documentos</td>
                <td>
                  <input type="radio" id="tabla10" name="carpeta" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla11" name="carpeta" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla12" name="carpeta" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>
                  Identidad Grupak (Fondo y protector de pantalla oficiales)
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla13"
                    name="identidad"
                    value="Si"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla14"
                    name="identidad"
                    value="No"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla15"
                    name="identidad"
                    value="N/A"
                  />
                </td>
              </tr>
              <tr>
                <td>Menú Grupak en Navegadores (Chrome, Firefox y Edge)</td>
                <td>
                  <input type="radio" id="tabla16" name="menu" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla17" name="menu" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla18" name="menu" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>VPN configurado</td>
                <td>
                  <input type="radio" id="tabla19" name="vpn" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla20" name="vpn" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla21" name="vpn" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>Firma de correo actualizada</td>
                <td>
                  <input type="radio" id="tabla22" name="firma" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla23" name="firma" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla24" name="firma" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>Instancias SAP (Calidad y Productivo)</td>
                <td>
                  <input
                    type="radio"
                    id="tabla25"
                    name="instancia"
                    value="Si"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla26"
                    name="instancia"
                    value="No"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla27"
                    name="instancia"
                    value="N/A"
                  />
                </td>
              </tr>
              <tr>
                <td>OneDrive sincronizado</td>
                <td>
                  <input type="radio" id="tabla28" name="oneDrive" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla29" name="oneDrive" value="No" />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla30"
                    name="oneDrive"
                    value="N/A"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div>Ref. P-TI-DT-010</div>
          <div className="row align-items-end justify-content-between">
            <div className="col">
              <img
                src="/grupak-logo.png"
                alt="Grupak Logo"
                className={style.logo}
              />
            </div>
          </div>

          <div className="row">
            <div className="col text-center tituloTabla">
              <h5 className={style.tituloTabla}>
                Revisión de seguridad en los equipos de cómputo{" "}
              </h5>
            </div>
          </div>
          <p>
            Verificar las siguientes configuraciones en el equipo marcando la
            casilla que corresponda:
          </p>

          <table className="table table-light table-striped">
            <thead>
              <tr>
                <th scope="col">Configuraciones de Seguridad</th>
                <th scope="col">Si</th>
                <th scope="col">No</th>
                <th scope="col">N/A</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  "Acceso no vigilado" deshabilitado en Anydesk y Teamviewer
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla131"
                    name="noVigilado"
                    value="Si"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla32"
                    name="noVigilado"
                    value="No"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla33"
                    name="noVigilado"
                    value="N/A"
                  />
                </td>
              </tr>
              <tr>
                <td>"Zona de cobertura inalámbrica" deshabilitada</td>
                <td>
                  <input
                    type="radio"
                    id="tabla34"
                    name="cobertura"
                    value="Si"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla35"
                    name="cobertura"
                    value="No"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla36"
                    name="cobertura"
                    value="N/A"
                  />
                </td>
              </tr>
              <tr>
                <td>Deshabilitar Internet Explorer (Bajo demanda de DO)</td>
                <td>
                  <input type="radio" id="tabla37" name="ie" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla38" name="ie" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla39" name="ie" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>Acceso a internet restringido</td>
                <td>
                  <input type="radio" id="tabla40" name="internet" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla41" name="internet" value="No" />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla42"
                    name="internet"
                    value="N/A"
                  />
                </td>
              </tr>
              <tr>
                <td>"Recordar contraseña" desactivado en navegadores</td>
                <td>
                  <input type="radio" id="tabla43" name="recordar" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla44" name="recordar" value="No" />
                </td>
                <td>
                  <input
                    type="radio"
                    id="tabla45"
                    name="recordar"
                    value="N/A"
                  />
                </td>
              </tr>
              <tr>
                <td>Uso de gestor de contraseñas</td>
                <td>
                  <input type="radio" id="tabla46" name="gestor" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla47" name="gestor" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla48" name="gestor" value="N/A" />
                </td>
              </tr>
              <tr>
                <td>Doble autenticación de Correo electrónico</td>
                <td>
                  <input type="radio" id="tabla49" name="doble" value="Si" />
                </td>
                <td>
                  <input type="radio" id="tabla50" name="doble" value="No" />
                </td>
                <td>
                  <input type="radio" id="tabla51" name="doble" value="N/A" />
                </td>
              </tr>
            </tbody>
          </table>

          <br />
          <br />
          <div className="row">
            <div className="col-1 .d-lg-none"></div>
            <div className="col-12 col-lg-5 text-center tituloTabla">
              <h5>LISTA DE SOFTWARE BASE</h5>
              <div className="table-responsive">
                <table className="table table-sm table-light table-striped tableInput">
                  <thead>
                    <tr>
                      <th scope="col">Software</th>
                      <th scope="col">Estatus</th>
                      <th scope="col">Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/b.jpg"
                          alt="bitDefender"
                        />
                        <p>Bit defender</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla52"
                          name="bitDefender"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "130px" }}
                          type="text"
                          id="tabla53"
                          name="bitDefenderVersion"
                          defaultValue="6.6.19.274"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/g.jpg"
                          alt="Gimp"
                        />
                        <p>Gimp</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla54"
                          name="gimp"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "130px" }}
                          type="text"
                          id="tabla55"
                          name="gimpVersion"
                          defaultValue="2.10"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/a.jpg"
                          alt="Adobe"
                        />
                        <p>Adobe</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla56"
                          name="adobe"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "130px" }}
                          type="text"
                          id="tabla57"
                          name="adobeVersion"
                          defaultValue="20.009.20067"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/g.1.jpg"
                          alt="GanttProject"
                        />
                        <p>GanttProject</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla58"
                          name="ganttProject"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "130px" }}
                          type="text"
                          id="tabla59"
                          name="ganttProjectVersion"
                          defaultValue="2.8.10"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/lo.jpg"
                          alt="LibreOffice"
                        />
                        <p>LibreOffice</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla60"
                          name="libreOffice"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "130px" }}
                          type="text"
                          id="tabla61"
                          name="libreOfficeVersion"
                          defaultValue="6.4.5"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/rar.jpg"
                          alt="WinRAR"
                        />
                        <p>WinRAR</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla62"
                          name="winRAR"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla63"
                          name="winRARVersion"
                          defaultValue="590"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/ch.jpg"
                          alt="Chrome"
                        />
                        <p>Chrome</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla64"
                          name="chrome"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla65"
                          name="chromeVersion"
                          defaultValue="Ejecutable Online"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/vlc.jpg"
                          alt="VLC"
                        />
                        <p>VLC</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla66"
                          name="vlc"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla67"
                          name="vlcVersion"
                          defaultValue="3.0.11"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/sap.jpg"
                          alt="SAP"
                        />
                        <p>SAP</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla68"
                          name="sap"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla69"
                          name="sapVersion"
                          defaultValue="7.50"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/ad.jpg"
                          alt="AutoDesk"
                        />
                        <p>AutoDesk</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla70"
                          name="autoDesk"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla71"
                          name="autoDeskVersion"
                          defaultValue="2022"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/tv.jpg"
                          alt="TeamViewer"
                        />
                        <p>TeamViewer</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla72"
                          name="teamViewer"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla73"
                          style={{ width: "130px" }}
                          name="teamViewerVersion"
                          defaultValue="13"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/ins.jpg"
                          alt="Inkscape"
                        />
                        <p>Inkscape</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla74"
                          name="inkscape"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla75"
                          style={{ width: "130px" }}
                          name="inkscapeVersion"
                          defaultValue="1.0"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/fir.jpg"
                          alt="Firefox"
                        />
                        <p>Firefox</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla76"
                          name="firefox"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla77"
                          style={{ width: "130px" }}
                          name="firefoxVersion"
                          defaultValue="Ejecutable Online"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/teams.jpg"
                          alt="Microsoft Teams"
                        />
                        <p>Microsoft Teams</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla78"
                          name="microsoftTeams"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla79"
                          style={{ width: "130px" }}
                          name="microsoftTeamsVersion"
                          defaultValue="1.3.00.19173"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/bw.jpg"
                          alt="BitWarden"
                        />
                        <p>BitWarden</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla80"
                          name="bitWarden"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla81"
                          style={{ width: "130px" }}
                          name="bitWardenVersion"
                          defaultValue="1.29"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/aimp.jpg"
                          alt="AIMP"
                        />
                        <p>AIMP</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla82"
                          name="aimp"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla83"
                          style={{ width: "130px" }}
                          name="aimpVersion"
                          defaultValue="4.60.2180"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/draw.jpg"
                          alt="Draw.io"
                        />
                        <p>Draw.io</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla84"
                          name="drawio"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla85"
                          style={{ width: "130px" }}
                          name="drawioVersion"
                          defaultValue="13.3.5"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/any.jpg"
                          alt="AnyDesk"
                        />
                        <p>AnyDesk</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla86"
                          name="anyDesk"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla87"
                          style={{ width: "130px" }}
                          name="anyDeskVersion"
                          defaultValue="5.5"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className={style.containerPLogo}>
                        <img
                          className={style.pLogo}
                          src="/programLogo/lig.jpg"
                          alt="LightShot"
                        />
                        <p>LightShot</p>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id="tabla88"
                          name="lightShot"
                          value="Si"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla89"
                          style={{ width: "130px" }}
                          name="lightShotVersion"
                          defaultValue="5.5.0.4"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-1 .d-lg-none"></div>
            <div className="col-12 col-lg-4 text-center tituloTabla">
              <h5>SOFTWARE BASE ADICIONAL</h5>
              <div className="table-responsive">
                <table className="table table-light table-striped">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla90"
                          name="softwareBase1"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla91"
                          style={{ width: "130px" }}
                          name="softwareBase1Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla92"
                          name="softwareBase2"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla93"
                          style={{ width: "130px" }}
                          name="softwareBase2Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla94"
                          name="softwareBase3"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla95"
                          style={{ width: "130px" }}
                          name="softwareBase3Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla96"
                          name="softwareBase4"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla97"
                          style={{ width: "130px" }}
                          name="softwareBase4Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla98"
                          name="softwareBase5"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla99"
                          name="softwareBase5Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla100"
                          name="softwareBase6"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla101"
                          style={{ width: "130px" }}
                          name="softwareBase6Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla102"
                          name="softwareBase7"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="tabla103"
                          style={{ width: "130px" }}
                          name="softwareBase7Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla104"
                          name="softwareBase8"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla105"
                          name="softwareBase8Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla106"
                          name="softwareBase9"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla107"
                          name="softwareBase9Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla108"
                          name="softwareBase10"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla109"
                          name="softwareBase10Version"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla110"
                          name="softwareBase11"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          style={{ width: "130px" }}
                          id="tabla111"
                          name="softwareBase11Version"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <br />
          <br />
          <br />

          <div className="row">
            <div className="col">
              <button
                type="submit"
                className="btn btn-success"
                style={{ width: "100%" }}
              >
                Enviar formulario
              </button>
            </div>
          </div>
        </form>
      )}
      {/* <Link to={"/"}>Regresar</Link> */}
    </div>
  );
}

function getDate() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return (today = yyyy + "-" + mm + "-" + dd);
}
