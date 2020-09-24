import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { toggleModal } from "../../actions/modalActions";
import Modal from "../modal/Modal";
import "./css/index.css";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <header>
          <div className="container">
            <a href="">
              <div className="logo">
                <img
                  className="logo-img"
                  src="https://annonceo.aude-henrynoyere.fr/img/logo2.png"
                />
              </div>
            </a>

            <div className="menu">
              <ul>
                <li>
                  <Link to="/">
                    <i className="fas fa-home"></i>
                    <a href=""> ACCUEIL</a>
                  </Link>
                </li>
                <li>
                  <Link to="/ads/add">
                    <i className="fas fa-bullhorn"></i>
                    <a href=""> DEPOSER UNE ANNONCE</a>
                  </Link>
                </li>
                <li>
                  <Link to="/ads">
                    <i className="fas fa-paste"></i>
                    <a href=""> OFFRES</a>
                  </Link>
                </li>
                <li>
                  <Link to="/myads">
                    <i className="fas fa-clipboard"></i>
                    <a href=""> MES ANNONCES</a>
                  </Link>
                </li>
                <li className="user">
                  {!isAuthenticated ? (
                    <a onClick={this.props.toggleModal}>
                      <i className="fas fa-user"></i> SE CONNECTER
                    </a>
                  ) : (
                    <a href="" onClick={this.onLogoutClick}>
                      <i className="fas fa-sign-out-alt"></i> LOGOUT
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </header>
        <Modal isOpen={this.props.modal} />
      </div>
    );
  }
}
Navbar.protoTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
});

export default connect(mapStateToProps, { logoutUser, toggleModal })(Navbar);
