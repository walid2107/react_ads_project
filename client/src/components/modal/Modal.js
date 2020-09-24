import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import "./css/index.css";
import { toggleModal } from "../../actions/modalActions";
import { connect } from "react-redux";

class Modal extends Component {
  state = {
    active: "login",
  };
  render() {
    return (
      <div
        className={this.props.isOpen === true ? "modal" : "modal modal-hide"}
      >
        <div className="modal-content">
          <div className="modal-header">
            {this.props.modalHeader}
            <span onClick={() => this.props.toggleModal()}>Close</span>
          </div>
          <div className="modal-body">
            <div className="form">
              <div className="form-header">
                <button
                  className={this.state.active === "login" ? "active" : ""}
                  onClick={() => this.setState({ active: "login" })}
                >
                  Se Connecter
                </button>
                <button
                  className={this.state.active === "register" ? "active" : ""}
                  onClick={() => this.setState({ active: "register" })}
                >
                  Inscrivez-vous
                </button>
              </div>
              <div className="form-content">
                {this.state.active === "login" ? <Login /> : <Register />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { toggleModal })(Modal);
