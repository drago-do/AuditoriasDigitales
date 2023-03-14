const { Router } = require("express");
const router = Router();

//Ante una petición GET regresar una pagina HTML con información de la api.
router.get("/", (req, res) => {
  res.send("DOCUMENTO DIGITAL API");
});

module.exports = router;
