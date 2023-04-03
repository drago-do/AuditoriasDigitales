const { Router } = require("express");
const router = Router();
const multer = require("multer");
//Requerir el Schema para CRUD DOCUMENT F_TI_DT_013REV3
const documentF_TI_DT_013REV3Schema = require("../models/F_TI_DT_013REV3");
const Responsiva = require("./../models/responsivaST");
const imageModel = require("./../models/imageSchema");

//Create DOCUMENT
router.post("/", (req, res) => {
  // console.log(req.body);
  let datosDocumento = req.body;
  //Obtener serviceTag de datosDocumento.datosEquipo.serviceTag
  let serviceTag = datosDocumento.datosEquipo.serviceTag;
  console.log(serviceTag);
  //Obtener responsiva.numeroResponsiva donde responsiva.serviceTag sea igual a serviceTag
  Responsiva.findOne({ serviceTag: serviceTag })
    .then((data) => {
      let numeroResponsiva;
      if (data === null) {
        numeroResponsiva = "No Asociado";
      } else {
        //Obtener numeroResponsiva de data.numeroResponsiva
        numeroResponsiva = data.numeroResponsiva;
      }
      //Agregar numeroResponsiva a datosDocumento.numeroResponsiva
      datosDocumento.numeroResponsiva = numeroResponsiva;
      const dataDocument = documentF_TI_DT_013REV3Schema(datosDocumento);
      //Agregar datosDocumento a dataDocument
      dataDocument
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    })
    .catch((error) => console.log(error));
  //Agregar datosDocumento a dataDocument
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
  deleteImage(id);
  documentF_TI_DT_013REV3Schema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Upload image
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/upload/:id", upload.array("image", 5), (req, res) => {
  const images = req.files;
  const { id } = req.params;

  const newImages = images.map((image) => {
    return new imageModel({
      linkTo: id,
      name: image.originalname,
      img: {
        data: image.buffer,
        contentType: image.mimetype,
      },
    });
  });

  imageModel
    .insertMany(newImages)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// router.post("/upload/:id", upload.single("image"), (req, res) => {
//   const { image } = req.file;
//   const { id } = req.params;
//   const newImage = new imageModel({
//     linkTo: id,
//     name: image,
//     img: {
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     },
//   });
//   newImage
//     .save()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

//Get image by id
// router.get("/image/:linkTo", (req, res) => {
//   const { linkTo } = req.params;
//   //Download images
//   imageModel
//     .findOne({ linkTo })
//     .then((data) => {
//       console.log(data);
//       res.contentType(data.img.contentType);
//       res.send(data.img.data);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({ message: error });
//     });
// });

const archiver = require("archiver");
const fs = require("fs");

// ...

router.get("/image/:linkTo", async (req, res) => {
  const { linkTo } = req.params;

  try {
    const images = await imageModel.find({ linkTo });

    const zip = archiver("zip");
    images.forEach((image) => {
      zip.append(image.img.data, { name: linkTo + Date.now() });
    });
    zip.finalize();

    res.attachment("images_" + linkTo + ".zip");
    zip.pipe(res);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

//Metodo get regresa verdadero si existen imagenes para ese linkTo
router.get("/image/exists/:linkTo", (req, res) => {
  const { linkTo } = req.params;
  imageModel
    .find({ linkTo })
    .then((data) => {
      if (data.length > 0) {
        res.json(true);
      } else {
        res.json(false);
      }
    })
    .catch((error) => {
      console.log(error);
      res.json(false);
    });
});

//Metodo para eliminar todas las imagenes que tengan linkTo

router.delete("/image/:linkTo", (req, res) => {
  imageModel
    .remove({ linkTo: req.params.linkTo })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

function deleteImage(linkTo) {
  //Eliminar todas las imagenes de la base de datos que coincidan con linkTo
  imageModel
    .remove({ linkTo })
    .then((data) => {
      console.log(data);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

module.exports = router;
