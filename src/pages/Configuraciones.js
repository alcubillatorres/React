import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalIP } from '../global'

class Configuraciones extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.idSitio,
      idCliente: this.props.location.idCliente,
      key: this.props.location.Key,
      WanSaved: "",
      LanSaved: "",
      TipoInterface: "",
      Alias: "",
      Servicio: "INTERNET",
      TipoIP: "MANUAL",
      DireccionIP: "",
      Mascara: "",
      Gateway: "",
      Vlan: "",
      LanAlias: "",
      LanDireccionIP: "",
      LanMascara: "",
      LanVlan: "",
      DHCP: "SI",
      DHCPFrom: "",
      DHCPTo: "",
      LanServidorDNS1: "",
      LanServidorDNS2: "",
      Descarga: false,
      ip: GlobalIP,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      const params = { 
        Id_Sitio: this.state.id
      };
      axios({
        method: "get",
        url: "http://"+this.state.ip+":4000/configuraciones",
        params,
      }).then(
        (response) => {
          //console.log("status", response.status);
          if (response.status === 200) {
            this.setState({
              WanSaved: response.data.Wan,
              LanSaved: response.data.Lan,
            });
          }
        },
        (error) => {
          alert("Ha ocurrido un error");
          console.log(error);
        }
      );
    }
  }

  handleOnChange = (e) => {
    //console.log("handleOnChange");
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  hanleDescarga = (e) => {};

  handlePython = (e) => {
    const Cliente = this.state.idCliente;
    const Llave = this.state.key;
    const date = new Date();
    var formattedDate =
      String(date.getDate()) +
      String(date.getMonth() + 1) +
      date.getFullYear().toString().slice(2) +
      date.getHours() +
      date.getMinutes() +
      date.getSeconds();
    const nombre = Cliente + "_" + Llave + "_" + formattedDate + ".txt";
    console.log(nombre);
    const data = { 
      Id_Sitio: this.state.id,
      nombre: nombre
    };
    axios({
      method: "post",
      url: "http://"+this.state.ip+":4000/archivo",
      data,
    }).then((response) => {
      /* 
      var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function () {
          var blob = new File([response.data], "configuracion.txt");
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = blob.name;
          a.click();
          window.URL.revokeObjectURL(url);
        };
      })();
      saveData(); 

      this.setState({
        Descarga: true,
      });*/
    }); 
  };

  componentWillUnmount() {}

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      TipoInterface: this.state.TipoInterface,
      Alias: this.state.Alias.trim(),
      TipoServicio: this.state.Servicio,
      TipoIP: this.state.TipoIP,
      DireccionIP: this.state.DireccionIP.trim(),
      Mascara: this.state.Mascara.trim(),
      Gateway: this.state.Gateway.trim(),
      Vlan: this.state.Vlan.trim(),
      LanAlias: this.state.LanAlias.trim(),
      LanDireccionIP: this.state.LanDireccionIP.trim(),
      LanMascara: this.state.LanMascara.trim(),
      LanVlan: this.state.LanVlan.trim(),
      LanDHCP: this.state.DHCP,
      DHCPFrom: this.state.DHCPFrom.trim(),
      DHCPTo: this.state.DHCPTo.trim(),
      LanServidorDNS1: this.state.LanServidorDNS1.trim(),
      LanServidorDNS2: this.state.LanServidorDNS2.trim(),
      Id_Sitio: this.state.id,
    };

    const sendPostRequest = async (location) => {
      try {
        const resp = await axios.post(
          "http://"+location.state.ip+":4000/configuraciones",
          data
        );
        if (resp.status === 200) {
          this.setState({
            WanSaved: resp.data.Wan,
            LanSaved: resp.data.Lan,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    sendPostRequest(this);
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
          <Link to="/configuraciones" className="alert-link">
            <h4 className="d-inline">Alta Configuración&gt;</h4>
          </Link>
        </div>
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
          {/* SELECCION MENU WAN /LAN*/}

          <label>Agregar Interface (WAN/LAN)</label>
          <select
            name="TipoInterface"
            className="form-select form-select-lg mb-3 ml-2"
            value={this.state.TipoInterface}
            onChange={this.handleOnChange}
          >
            <option value="">Selecciona</option>
            <option value="WAN">WAN</option>
            <option value="LAN">LAN</option>
          </select>

          {/*FIN SELECCION MENU WAN /LAN*/}

          {/* Configuración WAN ///////////////////////////////////////////////////////*/}
          {this.state.WanSaved.length === 0 && (
            <span>
              {this.state.TipoInterface === "WAN" && (
                <div className="align-items-center">
                  <div className="mb-2 d-flex align-items-center">
                    <label>Nombre WAN (Alias)</label>
                    <input
                      className="form-control ml-2"
                      name="Alias"
                      type="text"
                      value={this.state.Alias}
                      onChange={this.handleOnChange}
                      required
                    />
                    <span className="tc-img">
                      &ensp; Nombre con la que se va a identificar a la
                      interface
                    </span>
                  </div>

                  <div className="mb-2">
                    <label>Servicio</label>
                    <select
                      required
                      name="Servicio"
                      value={this.state.Servicio}
                      onChange={this.handleOnChange}
                      className="form-select ml-2"
                    >
                      <option value="MPLS">MPLS</option>
                      <option value="INTERNET">INTERNET</option>
                    </select>
                  </div>

                  <div className="select-control mb-2 d-flex align-items-center">
                    <label>Tipo de IP</label>
                    <select
                      required
                      name="TipoIP"
                      value={this.state.TipoIP}
                      onChange={this.handleOnChange}
                      className="form-select ml-2"
                    >
                      <option value="MANUAL">MANUAL</option>
                      <option value="DHCP">DHCP</option>
                      <option value="PPPoE">PPPoE</option>
                    </select>
                    <span className="tc-img">
                      &ensp; De que manera se le asignará la direccion IP a la
                      interface
                    </span>
                  </div>
                  {this.state.TipoIP === "MANUAL" && (
                    <span>
                      <div className="mb-2 d-flex align-items-center">
                        <label>Dirección IP</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="DireccionIP"
                          value={this.state.DireccionIP}
                          onChange={this.handleOnChange}
                          required
                        />
                        <span className="tc-img">
                          &ensp; Direccion IP de la interface del firewall.
                        </span>
                      </div>

                      <div className="mb-2 d-flex align-items-center">
                        <label>Máscara de Red</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="Mascara"
                          value={this.state.Mascara}
                          onChange={this.handleOnChange}
                          required
                        />
                      </div>

                      <div className="mb-2 d-flex align-items-center">
                        <label>Gateway</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="Gateway"
                          value={this.state.Gateway}
                          onChange={this.handleOnChange}
                          required
                        />
                      </div>
                    </span>
                  )}

                  <div className="mb-2 d-flex align-items-center">
                    <label>VLAN</label>
                    <input
                      className="form-control ml-2"
                      type="number"
                      name="Vlan"
                      value={this.state.Vlan}
                      onChange={this.handleOnChange}
                      placeholder="[1-4096]"
                      required
                    />
                  </div>
                  <br></br>
                  <button
                    type="submit"
                    className="mt-3 btn btn-outline-primary"
                  >
                    Agregar
                  </button>
                </div>
              )}
            </span>
          )}
          {/* FIN Configuración WAN//////////////////////////////////////////////*/}

          {/* Configuración LAN//////////////////////////////////////////////*/}
          {this.state.TipoInterface === "LAN" && (
            <div>
              {this.state.LanSaved.length === 0 && (
                <div className="align-items-center">
                  <div className="mb-2 d-flex align-items-center">
                    <label>Nombre LAN (Alias)</label>
                    <input
                      className="form-control ml-2 d-flex align-items-center"
                      type="text"
                      name="LanAlias"
                      value={this.state.LanAlias}
                      onChange={this.handleOnChange}
                      required
                    />
                    <span className="tc-img">
                      &ensp; Nombre con la que se va a identificar a la
                      interface
                    </span>
                  </div>

                  <div className="mb-2 d-flex align-items-center">
                    <label>Dirección IP</label>
                    <input
                      className="form-control ml-2"
                      type="text"
                      name="LanDireccionIP"
                      value={this.state.LanDireccionIP}
                      onChange={this.handleOnChange}
                      required
                    />
                    <span className="tc-img">
                      &ensp; Direccion IP de la interface del firewall
                    </span>
                  </div>

                  <div className="mb-2 d-flex align-items-center">
                    <label>Máscara de Red</label>
                    <input
                      className="form-control ml-2"
                      type="text"
                      name="LanMascara"
                      value={this.state.LanMascara}
                      onChange={this.handleOnChange}
                      required
                    />
                  </div>

                  <div className="mb-2 d-flex align-items-center">
                    <label>VLAN</label>
                    <input
                      className="form-control ml-2"
                      type="number"
                      name="LanVlan"
                      value={this.state.LanVlan}
                      onChange={this.handleOnChange}
                      placeholder="[1-4096]"
                      required
                    />
                  </div>

                  <div className="select-control mb-2 d-flex        align-items-center">
                    <label>Entrega DHCP</label>
                    <select
                      value={this.state.DHCP}
                      onChange={this.handleOnChange}
                      name="DHCP"
                      className="form-select ml-2"
                    >
                      <option value="SI">Sí</option>
                      <option value="NO">No</option>
                    </select>
                    <span className="tc-img">
                      &ensp; Seleccionar "Sí" en caso de que la interface
                      entregue DHCP
                    </span>
                  </div>
                  {this.state.DHCP === "SI" && (
                    <span>
                      <div className="mb-2 d-flex align-items-center">
                        <label>Rango de DHCP</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="DHCPFrom"
                          value={this.state.DHCPFrom}
                          onChange={this.handleOnChange}
                          required
                        />

                        <input
                          className="form-control ml-2"
                          type="text"
                          name="DHCPTo"
                          value={this.state.DHCPTo}
                          onChange={this.handleOnChange}
                          required
                        />
                        <span className="tc-img">
                          &ensp; Rango de direcciones IP que serán entregadas
                        </span>
                      </div>

                      <div className="mb-2 d-flex align-items-center">
                        <label>Servidor DNS 1</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="LanServidorDNS1"
                          value={this.state.LanServidorDNS1}
                          onChange={this.handleOnChange}
                          required
                        />
                        <span className="tc-img">
                          &ensp; Seleccionar si se desea usar el servidor DNS de
                          Axtel (207.248.224.71) o especificar cual se desea
                          usar en el DHCP
                        </span>
                      </div>

                      <div className="mb-2 d-flex align-items-center">
                        <label>Servidor DNS 2</label>
                        <input
                          className="form-control ml-2"
                          type="text"
                          name="LanServidorDNS2"
                          value={this.state.LanServidorDNS2}
                          onChange={this.handleOnChange}
                          required
                        />
                        <span className="tc-img">
                          &ensp; Seleccionar si se desea usar el servidor DNS de
                          Axtel (207.248.224.71) o especificar cual se desea
                          usar en el DHCP.
                        </span>
                      </div>
                    </span>
                  )}
                  <br></br>
                  <button
                    type="submit"
                    className="mt-3 btn btn-outline-primary"
                  >
                    Agregar
                  </button>
                </div>
              )}
            </div>
          )}
          {/*FIN Configuración LAN//////////////////////////////////////////////*/}

          {/*MOSTRAR INTERFACES WAN REGISTRADAS///////////////////////////////////////*/}
          {this.state.WanSaved.length !== 0 && (
            <div className="row">
              <div className="col-6">
                <hr></hr>
                <label>INTERFACES WAN REGISTRADAS</label>
                <p></p>
                <table border="1">
                  <thead>
                    <tr>
                      <th>Alias</th>
                      <th>Tipo IP</th>
                      <th>Direccion IP</th>
                      <th>Mascara</th>
                      <th>Gateway</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.WanSaved.map(function (wan, key) {
                      return (
                        <tr key={key}>
                          <td>{wan.Alias}</td>
                          <td>{wan.TipoIP}</td>
                          <td>{wan.DireccionIP}</td>
                          <td>{wan.Mascara}</td>
                          <td>{wan.Gateway}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* FIN MOSTRAR INTERFACES WAN REGISTRADAS///////////////////////////////////*/}

          {/*MOSTRAR INTERFACES LAN REGISTRADAS////////////////////////////////////////*/}
          {this.state.LanSaved.length !== 0 && (
            <div>
              <hr></hr>
              <label>INTERFACES LAN REGISTRADAS</label>
              <p></p>
              <table border="1">
                <thead>
                  <tr>
                    <th>Alias</th>
                    <th>Direccion IP</th>
                    <th>Mascara</th>
                    <th>VLAN</th>
                    <th>DHCP</th>
                    <th>Rango DHCP</th>
                    <th>Servidor DNS 1</th>
                    <th>Servidor DNS 2</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.LanSaved.map(function (lan, key) {
                    return (
                      <tr key={key}>
                        <td>{lan.LanAlias}</td>
                        <td>{lan.LanDireccionIP}</td>
                        <td>{lan.LanMascara}</td>
                        <td>{lan.LanVlan}</td>
                        <td>{lan.LanDHCP}</td>
                        <td>
                          {lan.DHCPFrom}-{lan.DHCPTo}
                        </td>
                        <td>{lan.LanServidorDNS1}</td>
                        <td>{lan.LanServidorDNS2}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/*FIN MOSTRAR INTERFACES LAN REGISTRADAS////////////////////////////////////*/}
          <div className="mb-2 d-flex align-items-center invisible">
            <input
              className="form-control ml-2 d-none"
              type="text"
              name="Id_Sitio"
              value={this.state.id}
              readOnly
            />
          </div>
        </form>
        <div className="col">
          <div className="row">
            {this.state.LanSaved.length !== 0 &&
              this.state.WanSaved.length !== 0 && (
                <button
                  onClick={this.handlePython}
                  type="submit"
                  className="mt-3 btn btn-outline-primary"
                >
                  Generar Script
                </button>
              )}
          </div>
          <div className="row">
            {this.state.Descarga && (
              <button
                type="submit"
                className="mt-3 btn btn-outline-primary"
                onClick={this.hanleDescarga}
              >
                Descargar Script
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Configuraciones;
