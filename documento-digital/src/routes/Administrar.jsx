import React, { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import axios from "axios";

const API_URL = process.env.API_URL + "user";

export default function Administrar() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    verificarInicioSesion();
  }, []);

  const verificarInicioSesion = () => {
    const timeStamp = Cookies.get("timeStamp");
    //Sie el tiempo es mayor a 5 minutos del actual o no existe timeStamp redirigir
    if (timeStamp === undefined || Date.now() - timeStamp > 300000) {
      window.location.href = "/login";
    } else {
      setLogin(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <h1>Administrador</h1>
        </div>
        <div className="col-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              Cookies.remove("timeStamp");
              window.location.href = "/";
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      {login ? <Usuarios /> : null}
    </div>
  );
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState();
  const [nombreUsuario, setNombreUsuario] = useState();
  const [userDelete, setUserDelete] = useState();
  const [responsivasST, setResponsivasST] = useState();

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = () => {
    const timeStamp = Cookies.get("timeStamp");
    axios
      .get(API_URL, { params: { timeStamp: timeStamp } })
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/";
      });
  };

  const addUsuario = () => {
    //Genera un pin aleatorio 4 dígitos
    const pin = Math.floor(1000 + Math.random() * 9000);
    const timeStamp = Cookies.get("timeStamp");
    axios
      .post(API_URL, {
        timeStamp: timeStamp,
        usuario: {
          username: nombreUsuario,
          password:
            "37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f",
          pin: pin,
        },
      })
      .then((response) => {
        console.log(response);
        obtenerUsuarios();
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/";
      });
  };

  const deleteUsuario = () => {
    axios
      .delete(API_URL + "/" + userDelete)
      .then((response) => {
        console.log(response);
        obtenerUsuarios();
      })
      .catch((error) => {
        console.log(error);
        // redireccionar a pagina inicio al encontra error
        window.location.href = "/";
      });
  };

  const addResponsivaST = () => {
    //Convertir en un array "responsivasST", separando el string en cada salto de linea
    let responsivasSTArray = responsivasST.split("\n");
    // console.log(responsivasSTArray);
    //Guardar en un objeto cada ServiceTag con su numero de responsiva. Esto se obtiene de recorrer "responsivasSTArray" y separar serviceTag y Responsiva cada ","
    let responsivasSTObj = {};
    responsivasSTArray.forEach((responsiva, index) => {
      let numeroResponsiva = responsiva.split(",")[0];
      let serviceTag = responsiva.split(",")[1];
      responsivasSTObj[index] = {
        serviceTag: serviceTag,
        numeroResponsiva: numeroResponsiva,
      };
    });
    console.log(responsivasSTObj);

    let urlAPIRoot = process.env.API_URL;
    axios
      .post(urlAPIRoot + "responsivaST", {
        responsivasSTObj,
      })
      .then((response) => {
        console.log(response);
        alert("Responsivas agregadas");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Eliminar usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              ¿Seguro quieres eliminar este usuario? Esta acción no se puede
              revertir.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteUsuario}
              >
                Eliminar usuario
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {usuarios &&
          usuarios.map((usuario) => {
            if (usuario.pin) {
              return (
                <div className="col-12  my-3" key={usuario._id}>
                  <div className="input-group">
                    <span className="input-group-text">
                      Nombre y PIN de acceso
                    </span>
                    <input
                      type="text"
                      aria-label="Nombre"
                      className="form-control"
                      defaultValue={usuario.username}
                      readOnly
                    />
                    <input
                      type="text"
                      aria-label="Pin"
                      className="form-control"
                      defaultValue={usuario.pin}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setUserDelete(usuario._id)}
                    >
                      Eliminar usuario
                    </button>
                  </div>
                </div>
              );
            }
          })}
        <h3>Añadir nuevo usuario</h3>
        <div className="col-12 my-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de usuario"
              aria-label="Nombre de usuario"
              id="nombreNuevoUsuario"
              onChange={(event) => setNombreUsuario(event.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={addUsuario}
            >
              Añadir nuevo usuario
            </button>
          </div>

          <h3>Añadir números de responsiva</h3>
          <p>
            Los números de responsiva están asociados a solo un{" "}
            <b>Service Tag</b>, el numero de responsiva se documentará solo si
            existe un <b>Service Tag</b> asociado a este.
            <br />
            El formato para agregar responsivas asociadas a Service Tag es el
            siguiente:
            <br />
            <b>Responsiva,ServiceTag</b>
            <br />
            <b>Responsiva,ServiceTag</b>
            <br />
            <br />
            Se pueden agregar tantos como quieras, dando un salto de linea para
            cada asociación.
          </p>
          <div className="col-12 my-3">
            <div className="input-group mb-3">
              {/* Text Area para agregar numerosDeresponsiva,SeviceTag */}
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="004ASC,5C8R8B3
005ASC,5C9Q8B3"
                onChange={(event) => setResponsivasST(event.target.value)}
              ></textarea>
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={addResponsivaST}
              >
                Añadir responsivas
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
