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
        </div>
      </div>
    </>
  );
};
