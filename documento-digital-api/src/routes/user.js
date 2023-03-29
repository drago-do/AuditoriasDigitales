const { Router } = require("express");
const router = Router();
//Requerir el Schema para CRUD DOCUMENT F_TI_DT_013REV3
const User = require("../models/user");

var tokenAutorizado;

//Create user
router.post("/", (req, res) => {
  //Verifica que el toquen recibido es el mismo que el autorizado.
  if (parseInt(req.body.timeStamp) === tokenAutorizado) {
    const dataUser = User(req.body.usuario);
    dataUser
      .save()
      .then((data) => {
        console.log("datos:");
        console.log(data);
        res.json(data);
      })
      .catch((error) => res.json({ message: error }));
  } else {
    res.status(401).json({ message: "No autorizado" });
  }
});

//Login  user
router.post("/login", (req, res) => {
  //GruTIC1
  //Usuario y contraseña en req. Buscar username en la base de datos, si el user name y la contraseña coinciden devuelve 200 estatus, si no 401
  const { username, password, timeStamp } = req.body;
  tokenAutorizado = timeStamp;
  console.log(tokenAutorizado);
  User.findOne({ username: username })
    .then((data) => {
      if (data) {
        console.log(data.password === password);
        if (data.password === password) {
          res.status(200).json({ message: "correcto" });
        } else {
          res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        }
      } else {
        res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }
    })
    .catch((error) => res.json({ message: error }));
});

//Get all user's
router.get("/", (req, res) => {
  if (tokenAutorizado) {
    //Verifica que el toquen recibido es el mismo que el autorizado.
    if (parseInt(req.query.timeStamp) === tokenAutorizado) {
      User.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    } else {
      res.status(401).json({ message: "No autorizado" });
    }
  } else {
    res.status(401).json({ message: "No autorizado" });
  }
});

//Get one user by id
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   User.findById(id)
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

//Update full user by id
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const dataUser = User(req.body);
//   dataUser.id = id;
//   dataUser
//     .save()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

//Delete user by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
