const { Router } = require("express");
const router = Router();
const ResponsivaST = require("./../models/responsivaST");

//Ante una petición GET regresa todas las responsivas registradas
router.get("/", (req, res) => {
  ResponsivaST.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Ante una petición POST crea una nueva responsiva
router.post("/", (req, res) => {
  //Recibe un objeto con una o varias  asociaciones
  //Guardar cada uno en la base de datos
  //Recibe un json como el siguiente
  /*
  0:{
    serviceTag: "serviceTag",
    numeroResponsiva: "numeroResponsiva"
  },
  1:{
    serviceTag: "serviceTag",
    numeroResponsiva: "numeroResponsiva"
  }

  Meter cada uno individualmente a la base de datos
  */
  console.log(req.body);
  let dataResponse;
  const { responsivasSTObj } = req.body;

  try {
    //Iterar cada objeto dentro de responsivasSTObj y guardar en base de datos
    for (const key in responsivasSTObj) {
      if (responsivasSTObj.hasOwnProperty(key)) {
        const responsivaST = responsivasSTObj[key];
        const dataResponsivaST = ResponsivaST(responsivaST);
        dataResponsivaST
          .save()
          .then((data) => {
            dataResponse += data;
          })
          .catch((error) => (dataResponse += error));
      }
    }
    res.json(dataResponse);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
