import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TipoInterface: "",
      Alias: "",
      Internet: "SI",
      TipoIP: "MANUAL",
      DireccionIP: "",
      Mascara: "",
      Gateway: "",
      Vlan: "",
    };
    this.handleTipoInterface = this.handleTipoInterface.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTipoInterface(event) {
    this.setState({ TipoInterface: event.target.value });
  }


  handleAlias = (event) => {
    this.setState({
      Alias: event.target.value,
    });
  };

  handleInternet = (event) => {
    this.setState({
      Internet: event.target.value,
    });
  };

  handleTipoIP = (event) => {
    this.setState({
      TipoIP: event.target.value,
    });
  };

  handleDireccionIP = (event) => {
    this.setState({
      DireccionIP: event.target.value,
    });
  };

  handleMascara = (event) => {
    this.setState({
      Mascara: event.target.value,
    });
  };

  handleGateway = (event) => {
    this.setState({
      Gateway: event.target.value,
    });
  };

  handleVlan = (event) => {
    this.setState({
      Vlan: event.target.value,
    });
  };

  handleSubmit(event) {
    const data = {
      TipoInterface: this.state.TipoInterface,
      Alias: this.state.Alias,
      Internet: this.state.Internet,
      TipoIP: this.state.TipoIP,
      DireccionIP: this.state.DireccionIP,
      Mascara: this.state.Mascara,
      Gateway: this.state.Gateway,
      Vlan: this.state.Vlan,
    };
    const url = "http://172.18.10.79:4000";

    console.log(data)
    axios({
      method: "post",
      url: url,
      data,
    }).then(
      (response) => {
        alert(response.data);
        this.setState({
          TipoInterface: "",
          Alias: "",
          Internet: "SI",
          TipoIP: "MANUAL",
          DireccionIP: "",
          Mascara: "",
          Gateway: "",
          Vlan: "",
        });
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error)
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
       
        <div>
          <img src="axtel.png" alt="axtel logo" className="image-title"></img>
        </div>
        <div className="page-header text-center">
          <h1>
            <small>CONFIGURACIÓN DE INTERFACES</small>
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>TIPO DE INTERFACE</label>
          <select
            className="form-select form-select-lg mb-3 ml-2"
            value={this.state.TipoInterface}
            onChange={this.handleTipoInterface}
          >
            <option value=""></option>
            <option value="WAN">WAN</option>
            <option value="LAN">LAN</option>
          </select>

          <span>
            {this.state.TipoInterface === "WAN" && (
              <div className="align-items-center">
               
                <div className="mb-2 d-flex align-items-center">
                  <label>NOMBRE (ALIAS)</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.Alias}
                    onChange={this.handleAlias}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label>INTERNET</label>
                  <select
                    value={this.state.Internet}
                    onChange={this.handleInternet}
                    className="form-select ml-2"
                  >
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label>TIPO DE IP</label>
                  <select
                    value={this.state.TipoIP}
                    onChange={this.handleTipoIP}
                    className="form-select ml-2"
                  >
                    <option value="MANUAL">MANUAL</option>
                    <option value="DHCP">DHCP</option>
                    <option value="PPPoE">PPPoE</option>
                  </select>
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>DIRECCION IP</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.DireccionIP}
                    onChange={this.handleDireccionIP}
                    placeholder="xxx.xxx.xxx.xxx"
                    required
                  />
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>MASCARA DE RED</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.Mascara}
                    onChange={this.handleMascara}
                    placeholder="xxx.xxx.xxx.xxx"
                    required
                  />
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>GATEWAY</label>
                  <input
                    className="form-control ml-2"
                    type="text"
                    value={this.state.Gateway}
                    onChange={this.handleGateway}
                    placeholder="xxx.xxx.xxx.xxx"
                    required
                  />
                </div>

                <div className="mb-2 d-flex align-items-center">
                  <label>VLAN</label>
                  <input
                    className="form-control ml-2"
                    type="number"
                    value={this.state.Vlan}
                    onChange={this.handleVlan}
                    min="0" max="4096" step="1"
                    pattern="\d+"
                    required
                  />
                </div>

                  <p>
                  {this.state.TipoInterface +
                    "-" +
                    this.state.Alias +
                    "-" +
                    this.state.Internet +
                    "-" +
                    this.state.TipoIP +
                    "-" +
                    this.state.DireccionIP +
                    "-" +
                    this.state.Mascara +
                    "-" +
                    this.state.Gateway +
                    "-" +
                    this.state.Vlan}
                </p> 
                <button className="mt-3 btn btn-outline-primary" type="submit">
                  Registrar
                </button>
              </div>
            )}
          </span>
          {this.state.TipoInterface === "LAN" && <div>Lan</div>}
        </form>
      </div>
    );
  }
}

export default App;
