import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

class AltaCliente extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      Clientes: "",
      Nombre: "",
      Numero: "",
      Nuevo: false,
      id: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      const url = "http://172.18.10.79:4000/clientes";
      axios({
        method: "get",
        url,
      }).then(
        (response) => {
          if (response.data.length === 0) {
            this.setState({
              Nuevo: true,
            });
            document.getElementById("Nombre").focus();

            document.getElementById("Nombre").attributes.required = "required";
            document.getElementById("Nombre").removeAttribute("readonly");

            document.getElementById("Numero").attributes.required = "required";
            document.getElementById("Numero").removeAttribute("readonly");
          }
          this.setState({
            Clientes: response.data,
            Nombre: "",
            Numero: "",
          });
        },
        (error) => {
          alert("Ha ocurrido un error");
          console.log(error);
        }
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleOnChange = (e) => {
    //console.log("handleOnChange");
    const { value } = e.target;
    const nombre = value.split(".")[0];
    const numero = value.split(".")[1];
    const id = value.split(".")[2];
    this.setState({
      Numero: numero,
      Nombre: nombre,
      Nuevo: false,
      id: id,
    });
  };

  handleonClick = (e) => {
    //console.log("handleonClick");
    this.setState({
      Nuevo: true,
      Nombre: "",
      Numero: "",
    });
    document.getElementById("Nombre").focus();

    document.getElementById("Nombre").attributes.required = "required";
    document.getElementById("Nombre").removeAttribute("readonly");

    document.getElementById("Numero").attributes.required = "required";
    document.getElementById("Numero").removeAttribute("readonly");
  };

  handleChange = (e) => {
    //console.log("handleChange");
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    //console.log("handleSubmit");
    event.preventDefault();
    //existente//

    localStorage.setItem("nombre", JSON.stringify(this.state.Nombre));
    localStorage.setItem("numero", JSON.stringify(this.state.Numero));

    if (this.state.Nuevo === false) {
      localStorage.setItem("idCliente", JSON.stringify(this.state.id));
      this.props.history.push({
        pathname: "/altaSitio",
        name: this.state.Nombre,
        number: this.state.Numero,
        id: this.state.id,
      });
    } else {
      //Nuevo//
      const data = {
        Nombre: this.state.Nombre.trim(),
        Numero: this.state.Numero.trim(),
      };

      async function postData(location) {
        try {
          let res = await axios({
            url: "http://172.18.10.79:4000/clientes",
            data,
            method: "post",
            timeout: 8000,
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.status >= 200 && res.status < 300) {
            //console.log(res.data)
            localStorage.setItem("idCliente", JSON.stringify(res.data._id));
          }
          location.props.history.push({
            pathname: "/altaSitio",
            name: location.state.Nombre,
            number: location.state.Numero,
            id: location.state.id,
          });

          return res.data;
        } catch (err) {
          console.error(err);
        }
      }

      postData(this)
        .then(function (result) {
          //console.log(".then",result);
        })
        .catch(function (error) {
          console.log(error);
        });
    } //fin else
  };

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="mt-auto p-2 alert alert-light">
          <Link to="/" className="alert-link">
            <h4 className="d-inline">Inicio&gt;</h4>
          </Link>
          <Link to="/altaCliente" className="alert-link">
            <h4 className="d-inline">Alta Cliente&gt;</h4>
          </Link>
        </div>
        <hr></hr>
        <h6>
          <i>Selecciona o Agrega Cliente:</i>
        </h6>

        {this.state.Clientes.length !== 0 && (
          <div className="align-items-center d-flex justify-content-space-between row mb-4">
            <div className="left col-3 d-grid">
              <label className="mr-2">Nombre:</label>
              <select
                name="Nombre"
                onChange={this.handleOnChange}
                value={this.state.Nombre}
              >
                <option value=""></option>

                {this.state.Clientes.map((cliente, key) => (
                  <option
                    key={key}
                    value={
                      cliente.Nombre + "." + cliente.Numero + "." + cliente._id
                    }
                  >
                    {cliente.Nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="center p-2 mr-2 ml-2 col-1">o</div>
            <div className="right col-3">
              <label className="mr-2">Número:</label>
              <select
                name="Numero"
                value={this.state.Numero}
                onChange={this.handleOnChange}
              >
                <option value=""></option>
                {this.state.Clientes.map((cliente, key) => (
                  <option
                    key={key}
                    value={
                      cliente.Nombre + "." + cliente.Numero + "." + cliente._id
                    }
                  >
                    {cliente.Numero}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <hr></hr>
        <div className="col vcenter">
          <button
            type="text"
            className="btn btn-primary btn-circle btn-sm"
            onClick={this.handleonClick}
          >
            + Agregar Nuevo
          </button>
        </div>
        <br></br>

        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <div className="mb-2 d-flex align-items-center">
                <label>Nombre:</label>
                <input
                  className="form-control ml-2 p-1 focusInput"
                  type="text"
                  name="Nombre"
                  id="Nombre"
                  value={this.state.Nombre}
                  onChange={this.handleChange}
                  readOnly
                />
              </div>
              <div className="mb-2 d-flex align-items-center">
                <label>Número:</label>
                <input
                  className="form-control ml-2 p-1"
                  type="text"
                  name="Numero"
                  id="Numero"
                  value={this.state.Numero}
                  onChange={this.handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="row d-flex justify-content-around align-items-center ml-5 mt-3">
              <br></br>
              {this.state.Nombre && this.state.Numero && (
                <div className="col vcenter">
                  <button
                    type="submit"
                    className="ml-2 p-1 btn btn-outline-primary"
                  >
                    Siguiente &gt;&gt;
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AltaCliente;
