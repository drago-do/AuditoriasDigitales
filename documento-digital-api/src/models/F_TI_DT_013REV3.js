const mongoose = require("mongoose");

const F_TI_DT_013REV3Schema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  numeroResponsiva: {
    type: String,
    required: true,
  },
  dia: {
    type: String,
    required: true,
  },
  mes: {
    type: String,
    required: true,
  },
  anio: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  idAuditor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  datosUsuarioResponsable: {
    nombre: {
      type: String,
      required: true,
    },
    puesto: {
      type: String,
      required: true,
    },
    ubicacion: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
  },
  datosEquipo: {
    tipo: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    modelo: {
      type: String,
      required: true,
    },
    serviceTag: {
      type: String,
      required: true,
    },
    macWIFI: {
      type: String,
      required: true,
    },
    macLAN: {
      type: String,
      required: true,
    },
    nombreEquipo: {
      type: String,
      required: true,
    },
    dominio: {
      type: String,
      required: false,
    },
    accesoriosTIC: {
      type: String,
      required: false,
    },
    accesoriosPer: {
      type: String,
      required: false,
    },
  },
  arquitecturaEquipo: {
    SO: {
      type: String,
      required: true,
    },
    versionSO: {
      type: String,
      required: true,
    },
    arquitectura: {
      type: Number,
      required: true,
    },
    officeVersion: {
      type: String,
      required: false,
    },
    ram: {
      type: Number,
      required: true,
    },
    agenteKase: {
      type: String,
      required: true,
    },
    tarjetaExtra: {
      type: String,
      required: false,
    },
  },
  configuracionBasica: {
    usuarioAdminTIC: {
      type: String,
      required: true,
    },
    contraAdminHomologada: {
      type: String,
      required: true,
    },
    permisosEstandares: {
      type: String,
      required: true,
    },
    carpetaImagenGrupak: {
      type: String,
      required: true,
    },
    identidadGrupak: {
      type: String,
      required: true,
    },
    menuGrupakDefault: {
      type: String,
      required: true,
    },
    vpn: {
      type: String,
      required: true,
    },
    firmaCorreo: {
      type: String,
      required: true,
    },
    instanciaSAP: {
      type: String,
      required: true,
    },
    oneDriveActualizado: {
      type: String,
      required: true,
    },
  },
  configuracionSeguridad: {
    accesoNoVigilado: {
      type: String,
      required: true,
    },
    zonaCoberturaDeshabilitado: {
      type: String,
      required: true,
    },
    iexplorerDeshabilitado: {
      type: String,
      required: true,
    },
    internetRestringido: {
      type: String,
      required: true,
    },
    recordarContraDeshabilitado: {
      type: String,
      required: true,
    },
    gestorContra: {
      type: String,
      required: true,
    },
    dobleAuthCorreo: {
      type: String,
      required: true,
    },
  },
  softwareBase: {
    bitDefender: {
      type: String,
      required: false,
    },
    gimp: {
      type: String,
      required: false,
    },
    adobe: {
      type: String,
      required: false,
    },
    ganttProject: {
      type: String,
      required: false,
    },
    libreOffice: {
      type: String,
      required: false,
    },
    winRAR: {
      type: String,
      required: false,
    },
    chrome: {
      type: String,
      required: false,
    },
    vlc: {
      type: String,
      required: false,
    },
    sap: {
      type: String,
      required: false,
    },
    autoDesk: {
      type: String,
      required: false,
    },
    teamViewer: {
      type: String,
      required: false,
    },
    inkscape: {
      type: String,
      required: false,
    },
    firefox: {
      type: String,
      required: false,
    },
    microsoftTeams: {
      type: String,
      required: false,
    },
    bitWarden: {
      type: String,
      required: false,
    },
    aimp: {
      type: String,
      required: false,
    },
    drawio: {
      type: String,
      required: false,
    },
    anyDesk: {
      type: String,
      required: false,
    },
    lightShot: {
      type: String,
      required: false,
    },
  },
  softwareAdicional: {
    type: [[String]],
    required: false,
  },
});
module.exports = mongoose.model(
  "documentF_TI_DT_013REV3Schema",
  F_TI_DT_013REV3Schema
);
