import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./css/index.css";
import { loginUser } from "../../actions/authActions";
class Login extends Component {
  state = {
    phone: "",
    password: "",
    errors: {},
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      phone: this.state.phone,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="login-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Télephone"
            className="form-input"
            name="phone"
            value={this.state.phone}
            onChange={this.onChange}
            id="login"
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
            type="password"
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
        <div>
          <input id="rest" type="checkbox" />
          <label for="rest">restez connecté</label>
        </div>
        <button className="form-btn" onClick={this.onSubmit}>
          Connecter
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
