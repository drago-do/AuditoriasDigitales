import { useState } from "react";
import axios from "axios";
import sha256 from "sha256";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("none");

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const login = () => {
    const hashedPassword = sha256(password);
    const timeStamp = Date.now();
    axios
      .post(API_URL + "user/login", {
        username: username,
        password: hashedPassword,
        timeStamp: timeStamp,
      })
      .then((response) => {
        // handle success
        handleSuccess(timeStamp);
      })
      .catch((error) => {
        // handle error
        handleError();
      });
  };

  const handleSuccess = (timeStamp) => {
    Cookies.set("timeStamp", timeStamp);
    window.location.href = "/administrador";
  };

  const handleError = () => {
    setError("block");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6">
          <form>
            <h1>Inicia sesión</h1>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control mb-4"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={login}>
              Iniciar Sesión
            </button>
          </form>
          <div style={{ display: error }}>
            <div className="alert alert-danger mt-5" role="alert">
              Usuario o contraseña incorrecta!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
