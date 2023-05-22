const { Router } = require("express");
const router = Router();
//Requerir el Schema para CRUD DOCUMENT F_TI_DT_013REV3
const documentF_TI_DT_013REV3Schema = require("../models/F_TI_DT_013REV3");
const Users = require("./../models/user");
const pdf = require("html-pdf");
const path = require("path");
const User = require("./../models/user");

const options = {
  format: "letter",
  type: "pdf",
  base: "file://" + path.resolve("") + "/public/",
  footer: {
    height: "20px",
  },
  childProcessOptions: {
    env: {
      OPENSSL_CONF: "/dev/null",
    },
  },
};

var content = `<!doctype html>
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>PDF Result Template</title>
  <style>
    * {
      padding: 0;
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    span {
      font-size: 8px;
    }

    h1 {
      font-size: 10px;
      text-align: center;
      font-weight: bold;
      background-color: #b4d479;
      color: #000;
    }

    .tableTitle {
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      background-color: #b4d479;
      color: #000;
    }

    table {
      border-collapse: collapse;
    }

    .fullTable {
      width: 100%;
    }

    td {
      font-size: 8px;
      border: 2px solid #ddd;
      padding: 2px;
      text-align: end;
      font-weight: bold;
    }

    td.respuesta {
      text-align: start;
      font-weight: 100;
    }

    .pLogo {
      height: 10px;
    }

    .containerPLogo {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .inLine {
      display: inline;
    }

    .sinBorde {
      border: 0px none;
    }
  </style>
</head>

<body>
  <div style="margin: 40px;">
    <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
      <p
        style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">
        Página {{page}} de {{pages}}</p>
    </div>
    <div
      style="border-bottom: 1px solid #ddd; padding-bottom: 5px; display: flex; align-items: end; justify-content: space-between;">
      <img class="logo" src="http://localhost:3002/grupak_logo.png" alt="imagen logo" style="width: 100px;" />
      <span>Ref. P-TI-DT-010</span>
    </div>
    <p style="text-align: end; font-size: 12px;">
      <span>Numero de responsiva: {{responsiva}}</span>
      <span>Nombre de auditor: {{nombreAuditor}}</span>
      Fecha: {{fecha}}
    </p>
    <br>
    <br>
    <h1>Datos del usuario responsable del equipo</h1>
    <!-- tabla -->
    <table class="fullTable">
      <tbody>
        <tr>
          <td width="140">Nombre Completo:</td>
          <td colspan="3" class="respuesta">{{nombre}}</td>
        </tr>
        <tr>
          <td>Puesto:</td>
          <td class="respuesta">{{puesto}}</td>
          <td width="140">Ubicación</td>
          <td class="respuesta">{{ubicacion}}</td>
        </tr>
        <tr>
          <td>
            Dirección a la que pertenece:
          </td>
          <td colspan="3" class="respuesta">{{direccion}}</td>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <h1>Datos del equipo</h1>
    <!-- tabla -->
    <table class="fullTable">
      <tbody>
        <tr>
          <td width="140">Tipo de equipo:</td>
          <td class="respuesta">{{tipo}}</td>
          <td width="140">Marca de equipo:</td>
          <td class="respuesta">{{marca}}</td>
        </tr>
        <tr>
          <td>Modelo de equipo:</td>
          <td class="respuesta">{{modelo}}</td>
          <td>Service TAG o N/S:</td>
          <td class="respuesta">{{serie}}</td>
        </tr>
        <tr>
          <td>MAC Address Wi-Fi</td>
          <td class="respuesta">{{mac}}</td>
          <td>MAC Address Ethernet</td>
          <td class="respuesta">{{mac_ethernet}}</td>
        </tr>
        <tr>
          <td>Nombre del Equipo (Hostname):</td>
          <td class="respuesta">{{hostname}}</td>
          <td>Dominio:</td>
          <td class="respuesta">{{dominio}}</td>
        </tr>
        <tr>
          <td>
            Accesorios Adicionales
          </td>
          <td colspan="2" class="respuesta">
            <p>TIC:</p>{{accesorios_tic}}
          </td>
          <td class="respuesta">
            <p>Personales:</p>{{accesorios_per}}
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <h1>Revisión de la arquitectura del equipo de cómputo</h1>
    <!-- tabla -->
    <table class="fullTable">
      <tbody>
        <tr>
          <td width="140">Sistema operativo:</td>
          <td colspan="2" class="respuesta">{{SO}}</td>
          <td width="140">Versión SO:</td>
          <td colspan="2" class="respuesta">{{versionSO}}</td>
        </tr>
        <tr>
          <td>Arquitectura:</td>
          <td colspan="2" class="respuesta">{{arquitectura}}</td>
          <td>Versión Office:</td>
          <td colspan="2" class="respuesta">{{officeV}}</td>
        </tr>
      </tbody>
    </table>
    <table class="fullTable">
      <tbody style="border-top: none;">
        <tr>
          <td width="100">RAM instalada:</td>
          <td class="respuesta">{{ram}}</td>
          <td width="100">Agente KASE:</td>
          <td width="40" class="respuesta">{{kase}}</td>
          <td width="100">Tarjeta Extra (Red, Video, etc.)</td>
          <td colspan="3" class="respuesta">{{tarjetaExtra}}</td>
        </tr>
      </tbody>
    </table>
    <br><br>
    <h1>Revisión del equipo de cómputo</h1>
    <!-- tabla -->
    <table class="fullTable">
      <tbody>
        <tr>
          <td style="text-align: start;">Configuración básica:</td>
          <td style="text-align: start;" width="140">Respuesta</td>
        </tr>
        <tr>
          <td class="respuesta">Usuario administrador "tic"</td>
          <td class="respuesta">{{usuarioAdminTic}}</td>
        </tr>
        <tr>
          <td class="respuesta">Contraseña de administrador homologada</td>
          <td class="respuesta">{{adminHomologada}}</td>
        </tr>
        <tr>
          <td class="respuesta">Permisos estándar en cuenta de usuario</td>
          <td class="respuesta">{{permisosEsta}}</td>
        </tr>
        <tr>
          <td class="respuesta">Carpeta de imágenes Grupak en Documentos</td>
          <td class="respuesta">{{carpetaImg}}</td>
        </tr>
        <tr>
          <td class="respuesta">Identidad Grupak (Fondo y protector de pantalla oficiales)</td>
          <td class="respuesta">{{fondoPantalla}}</td>
        </tr>
        <tr>
          <td class="respuesta">Menú Grupak en navegadores (Chrome y Edge)</td>
          <td class="respuesta">{{menu}}</td>
        </tr>
        <tr>
          <td class="respuesta">VPN configurado</td>
          <td class="respuesta">{{vpn}}</td>
        </tr>
        <tr>
          <td class="respuesta">Firma de correo actualizada</td>
          <td class="respuesta">{{firmaCorreo}}</td>
        </tr>
        <tr>
          <td class="respuesta">Instancia SAP (Calidad y Productivo)</td>
          <td class="respuesta">{{sap}}</td>
        </tr>
        <tr>
          <td class="respuesta">One Drive sincronizado</td>
          <td class="respuesta">{{oneDrive}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <img src="http://localhost:3002/footer.png" alt="Pie de pagina" style="max-width: 612px;">
  <br><br>
  <div
    style="border-bottom: 1px solid #ddd; padding-bottom: 5px; display: flex; align-items: end; justify-content: space-between;">
    <img class="logo" src="http://localhost:3002/grupak_logo.png" alt="imagen logo" style="width: 100px;" />
    <span>Ref. P-TI-DT-010</span>
  </div>
  <div style="margin: 40px;">
    <h1>Revisión de seguridad en los equipos de cómputo</h1>
    <!-- tabla -->
    <table class="fullTable">
      <tbody>
        <tr>
          <td style="text-align: start;">Configuraciones de seguridad</td>
          <td style="text-align: start;" width="140">Respuesta</td>
        </tr>
        <tr>
          <td class="respuesta">"Acceso no vigilado" deshabilitado en Anydesk y Teamviewer</td>
          <td class="respuesta">{{accesoNoVigilado}}</td>
        </tr>
        <tr>
          <td class="respuesta">"Zona de cobertura inalámbrica" deshabilitada</td>
          <td class="respuesta">{{coberturaInalambrica}}</td>
        </tr>
        <tr>
          <td class="respuesta">Deshabilitar Internet Explorer (Bajo demanda de DO)</td>
          <td class="respuesta">{{ie}}</td>
        </tr>
        <tr>
          <td class="respuesta">Desinstalar Firefox Mozilla del equipo de cómputo</td>
          <td class="respuesta">Si</td>
        </tr>
        <tr>
          <td class="respuesta">Acceso a internet restringido</td>
          <td class="respuesta">{{internetRestringido}}</td>
        </tr>
        <tr>
          <td class="respuesta">"Recordar contraseña" desactivado en navegadores</td>
          <td class="respuesta">Si</td>
        </tr>
        <tr>
          <td class="respuesta">Uso de gestor de contraseñas</td>
          <td class="respuesta">Si</td>
        </tr>
        <tr>
          <td class="respuesta">Doble autenticación de Correo electrónico</td>
          <td class="respuesta">{{dobleAuth}}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <div>
      <div style="display: flex; flex-wrap: nowrap;">
        <div>
          <div class="sinBorde tableTitle">
            LISTA SOFTWARE BASE
          </div>
          <!-- tabla -->
          <table class="fullTable">
            <tbody>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/b.jpg" alt="bitDefender" />
                </td>
                <td class="containerPLogo">
                  <p class="inLine">Bit defender</p>
                </td>
                <td>
                  {{bitDefenderCheck}}
                </td>
                <td>
                  {{bitDefenderVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/g.jpg" alt="Gimp" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">Gimp
                  </p>
                </td>
                <td>
                  {{gimpCheck}}
                </td>
                <td>
                  {{gimpVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/a.jpg" alt="Adobe Acrobat" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">Adobe Acrobat
                  </p>
                </td>
                <td>
                  {{adobeCheck}}
                </td>
                <td>
                  {{adobeVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/g.1.jpg" alt="Adobe Acrobat" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">GanttProject
                  </p>
                </td>
                <td>
                  {{ganttCheck}}
                </td>
                <td>
                  {{ganttVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/lo.jpg" alt="Adobe Acrobat" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">LibreOffice
                  </p>
                </td>
                <td>
                  {{libreOfficeCheck}}
                </td>
                <td>
                  {{libreOfficeVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/rar.jpg" alt="Adobe Acrobat" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">WinRAR
                  </p>
                </td>
                <td>
                  {{winRARCheck}}
                </td>
                <td>
                  {{winRARVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/ch.jpg" alt="WinRAR" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">Chrome
                  </p>
                </td>
                <td>
                  {{chromeCheck}}
                </td>
                <td>
                  {{chromeVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/vlc.jpg" alt="VLC" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">VLC
                  </p>
                </td>
                <td>
                  {{vlcCheck}}
                </td>
                <td>
                  {{vlcVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/sap.png" alt="SAP" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">SAP
                  </p>
                </td>
                <td>
                  {{sapCheck}}
                </td>
                <td>
                  {{sapVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/ad.jpg" alt="Autodesk" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">Autodesk
                  </p>
                </td>
                <td>
                  {{autodeskCheck}}
                </td>
                <td>
                  {{autodeskVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/tv.jpg" alt="TeamViewer" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">TeamViewer
                  </p>
                </td>
                <td>
                  {{tvCheck}}
                </td>
                <td>
                  {{tvVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/ins.jpg" alt="InkScape" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">InkScape
                  </p>
                </td>
                <td>
                  {{inkCheck}}
                </td>
                <td>
                  {{inkVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/teams.jpg" alt="Teams" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">Microsoft Teams
                  </p>
                </td>
                <td>
                  {{teamsCheck}}
                </td>
                <td>
                  {{teamsVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/bw.jpg" alt="Bit Warden" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">Bit Warden
                  </p>
                </td>
                <td>
                  {{bwCheck}}
                </td>
                <td>
                  {{bwVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/aimp.jpg" alt="AIMP" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">AIMP
                  </p>
                </td>
                <td>
                  {{aimpCheck}}
                </td>
                <td>
                  {{aimpVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/draw.jpg" alt="Draw.io" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">Draw.io
                  </p>
                </td>
                <td>
                  {{drawCheck}}
                </td>
                <td>
                  {{drawVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/any.jpg" alt="AnyDesk" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">AnyDesk
                  </p>
                </td>
                <td>
                  {{anyCheck}}
                </td>
                <td>
                  {{anyVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/win.jpg" alt="SO">
                </td>
              </tr>
              <tr>
                <td class="sinBorde">
                  <img class="pLogo inline" src="http://localhost:3002/programLogo/lig.jpg" alt="LightShot" />
                </td>
                <td class="containerPLogo">
                  <p class="inline">LightShot
                  </p>
                </td>
                <td>
                  {{ligCheck}}
                </td>
                <td>
                  {{ligVersion}}
                </td>
                <td>
                  <img class="pLogo inLine" src="http://localhost:3002/programLogo/winMac.jpg" alt="SO">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div class="sinBorde tableTitle">
            LISTA SOFTWARE ADICIONAL
          </div>
          {{softwareAdicional}}
        </div>
      </div>
      <br>
    </div>
  </div>
  <img src="http://localhost:3002/footer.png" alt="Pie de pagina" style="max-width: 612px;">
</body>

</html>
`;

// //Get all DOCUMENT's
// router.get("/", (req, res) => {
//   //Enviar pdf de ejemplo como respuesta, el contenido esta en la variable "content"
//   pdf.create(content, options).toBuffer(function (err, buffer) {
//     console.log(options.base);
//     if (err) return res.send(Promise.reject());
//     res.type("pdf");
//     res.send(buffer);
//   });
// });

//Get one DOCUMENT by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  let backupContent = content;
  //Backup content
  documentF_TI_DT_013REV3Schema.findById(id).then((data) => {
    insertarDatosDocumento(data).then(() => {
      //Esperar 3 segundos antes de generar
      setTimeout(() => {
        pdf.create(content, options).toBuffer(function (err, buffer) {
          console.log(options.base);
          if (err) return res.send(Promise.reject());
          res.type("pdf");
          res.send(buffer);
          content = backupContent;
        });
      }, 3000);
    });
  });
});

function insertarDatosDocumento(data) {
  return new Promise((resolve) => {
    //Obtener el username de el documento users en mongo con el id === data.idAuditor
    User.findById(data.idAuditor).then((respuesta) => {
      //!Nombre auditor
      if (respuesta != null) {
        content = content.replace("{{nombreAuditor}}", respuesta.username);
      } else {
        content = content.replace(
          "{{nombreAuditor}}",
          "No se encontro el usuario"
        );
      }
      if (true) {
        //!Fecha
        content = content.replace(
          "{{fecha}}",
          data.dia + "/" + data.mes + "/" + data.anio
        );
        //!Numero de responsiva
        content = content.replace("{{responsiva}}", data.numeroResponsiva);
        //!Datos del usuario responsable
        content = content.replace(
          "{{nombre}}",
          data.datosUsuarioResponsable.nombre
        );
        content = content.replace(
          "{{puesto}}",
          data.datosUsuarioResponsable.puesto
        );
        content = content.replace(
          "{{ubicacion}}",
          data.datosUsuarioResponsable.ubicacion
        );
        content = content.replace(
          "{{direccion}}",
          data.datosUsuarioResponsable.direccion
        );
        //!Datos del equipo
        content = content.replace("{{tipo}}", data.datosEquipo.tipo);
        content = content.replace("{{marca}}", data.datosEquipo.marca);
        content = content.replace("{{modelo}}", data.datosEquipo.modelo);
        content = content.replace("{{serie}}", data.datosEquipo.serviceTag);
        content = content.replace("{{mac}}", data.datosEquipo.macWIFI);
        content = content.replace("{{mac_ethernet}}", data.datosEquipo.macLAN);
        content = content.replace(
          "{{hostname}}",
          data.datosEquipo.nombreEquipo
        );
        content = content.replace("{{dominio}}", data.datosEquipo.dominio);
        content = content.replace(
          "{{accesorios_tic}}",
          data.datosEquipo.accesoriosTIC
        );
        content = content.replace(
          "{{accesorios_per}}",
          data.datosEquipo.accesoriosPer
        );
        //!Arquitectura equipo
        content = content.replace("{{SO}}", data.arquitecturaEquipo.SO);
        content = content.replace(
          "{{versionSO}}",
          data.arquitecturaEquipo.versionSO
        );
        content = content.replace(
          "{{arquitectura}}",
          data.arquitecturaEquipo.arquitectura
        );
        content = content.replace(
          "{{officeV}}",
          data.arquitecturaEquipo.officeVersion
        );
        content = content.replace("{{ram}}", data.arquitecturaEquipo.ram);
        content = content.replace(
          "{{kase}}",
          data.arquitecturaEquipo.agenteKase
        );
        content = content.replace(
          "{{tarjetaExtra}}",
          data.arquitecturaEquipo.tarjetaExtra
        );
        //!Configuracion básica
        content = content.replace(
          "{{usuarioAdminTic}}",
          data.configuracionBasica.usuarioAdminTIC
        );
        content = content.replace(
          "{{adminHomologada}}",
          data.configuracionBasica.contraAdminHomologada
        );
        content = content.replace(
          "{{permisosEsta}}",
          data.configuracionBasica.permisosEstandares
        );
        content = content.replace(
          "{{carpetaImg}}",
          data.configuracionBasica.carpetaImagenGrupak
        );
        content = content.replace(
          "{{fondoPantalla}}",
          data.configuracionBasica.identidadGrupak
        );
        content = content.replace(
          "{{menu}}",
          data.configuracionBasica.menuGrupakDefault
        );
        content = content.replace("{{vpn}}", data.configuracionBasica.vpn);
        content = content.replace(
          "{{firmaCorreo}}",
          data.configuracionBasica.firmaCorreo
        );
        content = content.replace(
          "{{sap}}",
          data.configuracionBasica.instanciaSAP
        );
        content = content.replace(
          "{{oneDrive}}",
          data.configuracionBasica.oneDriveActualizado
        );
        //!Configuración de seguridad
        content = content.replace(
          "{{accesoNoVigilado}}",
          data.configuracionSeguridad.accesoNoVigilado
        );
        content = content.replace(
          "{{coberturaInalambrica}}",
          data.configuracionSeguridad.zonaCoberturaDeshabilitado
        );
        content = content.replace(
          "{{ie}}",
          data.configuracionSeguridad.iexplorerDeshabilitado
        );
        content = content.replace(
          "{{internetRestringido}}",
          data.configuracionSeguridad.internetRestringido
        );
        content = content.replace(
          "{{recordarContra}}",
          data.configuracionSeguridad.recordarContraDeshabilitado
        );
        content = content.replace(
          "{{gestorContra}}",
          data.configuracionSeguridad.gestorContra
        );
        content = content.replace(
          "{{dobleAuth}}",
          data.configuracionSeguridad.dobleAuthCorreo
        );
        //!Software Base
        content = content.replace(
          "{{bitDefenderCheck}}",
          revisarSoftwareBase(data.softwareBase.bitDefender)
        );
        content = content.replace(
          "{{bitDefenderVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.bitDefender)
        );
        content = content.replace(
          "{{gimpCheck}}",
          revisarSoftwareBase(data.softwareBase.gimp)
        );
        content = content.replace(
          "{{gimpVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.gimp)
        );
        content = content.replace(
          "{{adobeCheck}}",
          revisarSoftwareBase(data.softwareBase.adobe)
        );
        content = content.replace(
          "{{adobeVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.adobe)
        );

        content = content.replace(
          "{{ganttCheck}}",
          revisarSoftwareBase(data.softwareBase.ganttProject)
        );
        content = content.replace(
          "{{ganttVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.ganttProject)
        );

        content = content.replace(
          "{{libreOfficeCheck}}",
          revisarSoftwareBase(data.softwareBase.libreOffice)
        );
        content = content.replace(
          "{{libreOfficeVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.libreOffice)
        );

        content = content.replace(
          "{{winRARCheck}}",
          revisarSoftwareBase(data.softwareBase.winRAR)
        );
        content = content.replace(
          "{{winRARVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.winRAR)
        );

        content = content.replace(
          "{{chromeCheck}}",
          revisarSoftwareBase(data.softwareBase.chrome)
        );
        content = content.replace(
          "{{chromeVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.chrome)
        );

        content = content.replace(
          "{{vlcCheck}}",
          revisarSoftwareBase(data.softwareBase.vlc)
        );
        content = content.replace(
          "{{vlcVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.vlc)
        );

        content = content.replace(
          "{{sapCheck}}",
          revisarSoftwareBase(data.softwareBase.sap)
        );
        content = content.replace(
          "{{sapVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.sap)
        );

        content = content.replace(
          "{{autodeskCheck}}",
          revisarSoftwareBase(data.softwareBase.autoDesk)
        );
        content = content.replace(
          "{{autodeskVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.autoDesk)
        );

        content = content.replace(
          "{{tvCheck}}",
          revisarSoftwareBase(data.softwareBase.teamViewer)
        );
        content = content.replace(
          "{{tvVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.teamViewer)
        );
        content = content.replace(
          "{{inkCheck}}",
          revisarSoftwareBase(data.softwareBase.inkscape)
        );
        content = content.replace(
          "{{inkVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.inkscape)
        );
        content = content.replace(
          "{{firefoxCheck}}",
          revisarSoftwareBase(data.softwareBase.firefox)
        );
        content = content.replace(
          "{{firefoxVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.firefox)
        );
        content = content.replace(
          "{{teamsCheck}}",
          revisarSoftwareBase(data.softwareBase.microsoftTeams)
        );
        content = content.replace(
          "{{teamsVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.microsoftTeams)
        );
        content = content.replace(
          "{{bwCheck}}",
          revisarSoftwareBase(data.softwareBase.bitWarden)
        );
        content = content.replace(
          "{{bwVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.bitWarden)
        );
        content = content.replace(
          "{{aimpCheck}}",
          revisarSoftwareBase(data.softwareBase.aimp)
        );
        content = content.replace(
          "{{aimpVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.aimp)
        );
        content = content.replace(
          "{{drawCheck}}",
          revisarSoftwareBase(data.softwareBase.drawio)
        );
        content = content.replace(
          "{{drawVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.drawio)
        );
        content = content.replace(
          "{{anyCheck}}",
          revisarSoftwareBase(data.softwareBase.anyDesk)
        );
        content = content.replace(
          "{{anyVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.anyDesk)
        );
        content = content.replace(
          "{{ligCheck}}",
          revisarSoftwareBase(data.softwareBase.lightShot)
        );
        content = content.replace(
          "{{ligVersion}}",
          revisarSoftwareBaseVersion(data.softwareBase.lightShot)
        );

        content = content.replace(
          "{{softwareAdicional}}",
          softwareAdicional(data.softwareAdicional)
        );
      }
    });
    resolve(true);
  });
}

function revisarSoftwareBase(version) {
  if (version != "" && version != undefined && version !== "NO INSTALADO") {
    return "X";
  } else {
    return "";
  }
}

function revisarSoftwareBaseVersion(version) {
  if (version == "" && version != undefined) {
    return "";
  } else {
    return version;
  }
}

function softwareAdicional(arrayDeSoftware) {
  let contenido =
    "<table class='fullTable'><td><img class='pLogo inLine' src='http://localhost:3002/programLogo/fir.jpg' />Firefox <b>No instalado</b></td><td>Ejecutable Online</td>";
  let sinDatos = "</table>";

  //Si el array de software esta vació, añadir
  if (arrayDeSoftware.length == 0) {
    return contenido + sinDatos;
  } else {
    //Si no esta vacio, añadir
    arrayDeSoftware.forEach((element) => {
      contenido += `<tr><td>${element[0]}</td><td>${element[1]}</td></tr>`;
    });
    return contenido + "</table>";
  }
}

module.exports = router;
