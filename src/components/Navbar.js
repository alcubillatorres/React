import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


class Navbar extends Component {
  render() {
    return (
      <div className="row mt-5 mb-5">
        <div className="col-6">
          <img src="axtel.png" alt="axtel logo" className="image-title"></img>
        </div>
        <div className="col-6 d-flex align-items-end flex-column">
          <div className="mt-auto p-2 "></div>
        </div>
      </div>
    );
  }
}

export default Navbar;
