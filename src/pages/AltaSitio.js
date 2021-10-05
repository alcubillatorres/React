import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

class AltaSitio extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleSubmitOlder = this.handleSubmitOlder.bind(this);
    this.state = {
      Sitios: "",
      Sitio: "",
      Key: "",
      Marca: "",
      Modelo: "",
      id: JSON.parse(localStorage.getItem("idCliente")),
      idSitio: "",
      Nuevo: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      const url = "http://localhost:4000/sitios";
      const params = { id: this.state.id };

      axios({
        method: "get",
        url,
        params,
      }).then(
        (response) => {
          if (response.data.length === 0) {
            this.setState({
              Nuevo: true,
            });
          }
          this.setState({
            Sitios: response.data,
            Sitio: "",
            Key: "",
            Marca: "",
            Modelo: "",
          });
          //console.log(response.data);
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

  handleonClick = (e) => {
    this.setState({
      Nuevo: true,
      Sitio: "",
      Key: "",
      Marca: "",
      Modelo: "",
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnChange = (e) => {
    //console.log("handleOnChange");
    const { value } = e.target;
    const sitio = value.split(".")[0];
    const llave = value.split(".")[1];
    const marca = value.split(".")[2];
    const modelo = value.split(".")[3];
    const idsitio = value.split(".")[4];

    this.setState({
      Sitio: sitio,
      Key: llave,
      Marca: marca,
      Modelo: modelo,
      idSitio: idsitio,
    });
  };


  handleSubmitOlder = (event) => {

    event.preventDefault()
    
    localStorage.setItem("key", JSON.stringify(this.state.Key));
    localStorage.setItem("sitio", JSON.stringify(this.state.Sitio));
    localStorage.setItem("marca", JSON.stringify(this.state.Marca));
    localStorage.setItem("modelo", JSON.stringify(this.state.Modelo));

    if (this.state.Nuevo === false) {
      //console.log("configuracion existente");
      localStorage.setItem("idSitio", JSON.stringify(this.state.idSitio));

      this.props.history.push({
        pathname: "/configuraciones",
      });
    } else {
      //console.log("configuracion Nueva");

      const data = {
        Sitio: this.state.Sitio.trim(),
        Key: this.state.Key.trim(),
        Marca: this.state.Marca.trim(),
        Modelo: this.state.Modelo.trim(),
        Cliente_id: this.state.id.trim(),
      };

      //console.log("data alta sitios", data)

      async function postData(location) {
        try {
          let res = await axios({
            url: "http://localhost:4000/sitios",
            data,
            method: "post",
            timeout: 8000,
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.status === 200) {
            
            // test for status you want, etc
          }
          // Don't forget to return something
          localStorage.setItem("idSitio", JSON.stringify(res.data));
          location.push({
            pathname: "/configuraciones",
          });
          return res.data;
        } catch (err) {
          console.error(err);
        }
      }

      postData(this.props.history)
        .then(function (result) {
         
         /*  this.history.push({
            pathname: "/configuraciones",
          }); */

        })
        .catch(function (error) {
          console.log(error);
        });

     

    }//fin else
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
          <Link to="/altaSitio" className="alert-link">
            <h4 className="d-inline">Alta Sitio&gt;</h4>
          </Link>
        </div>
        <hr></hr>
        <h6>
          <b>Cliente: </b>
          <i>{JSON.parse(localStorage.getItem("nombre"))}</i>
        </h6>
        <h6>
          <b>Número: </b>
          <i>{JSON.parse(localStorage.getItem("numero"))}</i>
        </h6>
        <hr></hr>
        <h6>
          <i>Selecciona o Agrega Sitio:</i>
        </h6>

        {this.state.Sitios.length !== 0 && (
          <div className="align-items-center d-flex justify-content-space-between row mb-4">
            <div className="left col-3 d-grid">
              <label className="mr-2">Sitio:</label>
              <select
                name="Sitio"
                onChange={this.handleOnChange}
                value={this.state.Sitio}
              >
                <option value=""></option>

                {this.state.Sitios.map((sitio, key) => (
                  <option
                    key={key}
                    value={
                      sitio.Sitio +
                      "." +
                      sitio.Key +
                      "." +
                      sitio.Marca +
                      "." +
                      sitio.Modelo +
                      "." +
                      sitio._id
                    }
                  >
                    {sitio.Sitio}
                  </option>
                ))}
              </select>
            </div>
            <div className="center p-2 mr-2 ml-2 col-1">o</div>
            <div className="right col-3">
              <label className="mr-2">Llave:</label>
              <select
                name="Key"
                value={this.state.Key}
                onChange={this.handleOnChange}
              >
                <option value=""></option>
                {this.state.Sitios.map((sitio, key) => (
                  <option
                    key={key}
                    value={
                      sitio.Sitio +
                      "." +
                      sitio.Key +
                      "." +
                      sitio.Marca +
                      "." +
                      sitio.Modelo +
                      "." +
                      sitio._id
                    }
                  >
                    {sitio.Key}
                  </option>
                ))}
              </select>
            </div>
            <div className="col vcenter">
              <button
                type="text"
                className="btn btn-primary btn-circle btn-sm"
                onClick={this.handleonClick}
              >
                + Agregar Nuevo
              </button>
            </div>
          </div>
        )}

        <hr></hr>
        <form onSubmit={this.handleSubmitOlder}>
          <div>
            {this.state.Nuevo && (
              <div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Sitio:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Sitio"
                    value={this.state.Sitio}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Llave:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Key"
                    value={this.state.Key}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <label className="mr-2">Marca de CPE</label>
                  <select
                    required
                    name="Marca"
                    value={this.state.Marca}
                    onChange={this.handleChange}
                  >
                    <option value=""></option>
                    <option value="Fortinet">Fortinet</option>
                    <option value="Cisco">Cisco</option>
                  </select>
                </div>

                {this.state.Marca === "Fortinet" && (
                  <div className="mb-2 d-flex align-items-center">
                    <label className="mr-2">Módelo de CPE</label>
                    <select
                      required
                      name="Modelo"
                      value={this.state.Modelo}
                      onChange={this.handleChange}
                    >
                      <option value=""></option>
                      <option value="100F">100F</option>
                      <option value="60F">60F</option>
                    </select>
                  </div>
                )}
                {this.state.Marca === "Cisco" && (
                  <div className="mb-2 d-flex align-items-center">
                    <label className="mr-2">Módelo de CPE</label>
                    <select
                      required
                      name="Modelo"
                      value={this.state.Modelo}
                      onChange={this.handleChange}
                    >
                      <option value=""></option>
                      <option value="4321">4321</option>
                      <option value="4331">4331</option>
                    </select>
                    <div className="row d-flex justify-content-around align-items-center ml-5 mt-3"></div>
                  </div>
                )}
                <br></br>
              </div>
            )}

            {this.state.Nuevo === false && (
              <div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Sitio:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Sitio"
                    value={this.state.Sitio}
                    onChange={this.handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Llave de Servicio:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Key"
                    value={this.state.Key}
                    onChange={this.handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <label className="mr-2">Marca de CPE</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Marca"
                    value={this.state.Marca}
                    onChange={this.handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <label className="mr-2">Módelo de CPE</label>

                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Modelo"
                    value={this.state.Modelo}
                    onChange={this.handleChange}
                    readOnly
                  />
                </div>
                <div>
                  <div className="row d-flex justify-content-around align-items-center ml-5 mt-3">
                    <br></br>
                  </div>
                </div>
              </div>
            )}
            <div className="col vcenter">
                      <button
                        type="submit"
                        className="ml-2 p-1 btn btn-outline-primary"
                      >
                        Siguiente
                      </button>
                    </div>
            <hr></hr>
          </div>
        </form>
      </div>
    );
  }
}

export default AltaSitio;
