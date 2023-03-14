const { Router } = require("express");
const router = Router();
//Requerir el Schema para CRUD DOCUMENT F_TI_DT_013REV3
const documentF_TI_DT_013REV3Schema = require("../models/F_TI_DT_013REV3");

//Create DOCUMENT
router.post("/", (req, res) => {
  const dataDocument = documentF_TI_DT_013REV3Schema(req.body);
  dataDocument
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get all DOCUMENT's
router.get("/", (req, res) => {
  documentF_TI_DT_013REV3Schema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get one DOCUMENT by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  documentF_TI_DT_013REV3Schema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Update full DOCUMENT by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  documentF_TI_DT_013REV3Schema
    .findByIdAndUpdate(id, req.body)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete DOCUMENT by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  documentF_TI_DT_013REV3Schema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
