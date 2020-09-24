import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../actions/userActions";
import { getAds, deleteAd } from "../../actions/adActions";
import "./css/index.css";
import { Redirect } from "react-router-dom";

class Users extends Component {
  state = {
    userAds: [],
  };
  componentDidMount() {
    this.props.getUsers();
    this.props.getAds();
  }
  handleDelete = (value) => {
    this.props.deleteUser(value);
    this.setState({
      userAds: this.props.ads.filter(
        (el) => el.owner.id === value && this.props.deleteAd(el._id)
      ),
    });
  };

  render() {
    return this.props.auth.user.role === "admin" ? (
      <div className="myads">
        <h1>Liste des Users</h1>
        <table>
          <tr>
            <th>Inscrit le</th>
            <th>Full name</th>
            <th>Email</th>
            <th>Telephone</th>
            <th style={{ width: "190px" }}>Action</th>
          </tr>
          {this.props.users
            .filter((el) => el.role === "user")
            .map((user, i) => (
              <tr key={i}>
                <th>
                  {String(new Date(Date.parse(user.date)).toLocaleString())}
                </th>
                <th>{user.fullname}</th>
                <th>{user.email}</th>
                <th>{user.phone}</th>
                <th style={{ width: "190px" }}>
                  <button
                    onClick={() => {
                      this.handleDelete(user._id);
                    }}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </th>
              </tr>
            ))}
        </table>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.users,
  ads: state.ads,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUsers,
  getAds,
  deleteAd,
  deleteUser,
})(Users);
