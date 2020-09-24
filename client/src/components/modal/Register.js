import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./css/index.css";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    fullname: "",
    phone: "",
    email: "",
    password: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      fullname: this.state.fullname,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.registerUser(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login-form" id="register">
        <div className="form-row">
          <input
            id="fullName"
            name="fullname"
            value={this.state.fullname}
            onChange={this.onChange}
            type="text"
            placeholder="Nom et Prenom"
            className="form-input"
          />
          <i id="phone" className="fa fa-user" />
        </div>
        {this.state.errors ? (
          <div className="form-row" style={{ color: "red" }}>
            {errors.fullname}
          </div>
        ) : (
          ""
        )}
        <div className="form-row">
          <input
            name="phone"
            value={this.state.phone}
            onChange={this.onChange}
            id="phone"
            type="number"
            placeholder="Télephone"
            className="form-input"
          />
          <i id="phone" className="fa fa-phone" />
        </div>
        {this.state.errors ? (
          <div className="form-row" style={{ color: "red" }}>
            {errors.phone}
          </div>
        ) : (
          ""
        )}
        <div className="form-row">
          <input
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            type="text"
            placeholder="Mot de passe"
            className="form-input"
          />
          <i className="fa fa-key" />
        </div>
        {this.state.errors ? (
          <div className="form-row" style={{ color: "red" }}>
            {errors.password}
          </div>
        ) : (
          ""
        )}
        <div className="form-row">
          <input
            id="mail"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email"
            className="form-input"
          />
          <i id="phone" className="fa fa-envelope" />
        </div>
        {this.state.errors ? (
          <div className="form-row" style={{ color: "red" }}>
            {errors.email}
          </div>
        ) : (
          ""
        )}
        <button onClick={this.onSubmit} className="form-btn">
          Enregister
        </button>
      </div>
    );
  }
}
Register.prototypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
