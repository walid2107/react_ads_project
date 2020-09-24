import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAds, deleteAd } from "../../actions/adActions";
import isEmpty from "../../validation/is-empty";

class DeleteAd extends Component {
  componentDidMount() {
    this.props.getAds();
  }
  handleDelete = (value) => {
    this.props.deleteAd(value);
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { ads } = this.props;
    const userAds = ads.filter((ad) => ad.owner.id === user.id);
    return isAuthenticated ? (
      <div className="myads">
        <h1>Mes Annonces</h1>
        <p>
          Retrouvez l'ensemble de vos annonces postées sur le site, vous pouvez
          les supprimer une fois vendues.
        </p>
        <table>
          <tr>
            <th>Poster le</th>
            <th>Titre</th>
            <th>Category</th>
            <th>Price</th>
            <th style={{ width: "190px" }}>Action</th>
          </tr>
          {!isEmpty(userAds) ? (
            userAds.map((ad, i) => (
              <tr key={i}>
                <th>
                  {String(new Date(Date.parse(ad.date)).toLocaleString())}
                </th>
                <th>{ad.title}</th>
                <th>{ad.category}</th>
                <th>{ad.price}</th>
                <th style={{ width: "190px" }}>
                  <button
                    onClick={() => {
                      this.handleDelete(ad._id);
                    }}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                  <Link to={`/ads/modify/${ad._id}`}>
                    <button>
                      <i class="fas fa-edit"></i>
                    </button>
                  </Link>
                </th>
              </tr>
            ))
          ) : (
            <div>
              <br />
              <br />
              <center>
                <h1>Aucune annonce posté pour le moment</h1>
              </center>
              <br />
              <br />
            </div>
          )}
        </table>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  ads: state.ads,
});

export default connect(mapStateToProps, { getAds, deleteAd })(DeleteAd);
