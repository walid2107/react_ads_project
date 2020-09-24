import React, { Component } from "react";
import { connect } from "react-redux";
import { getAds } from "../../actions/adActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCity, getCategory } from "../constants/data";
import "./css/index.css";

class AdsList extends Component {
  state = {
    searchtext: "",
    category: "",
    city: "",
  };
  componentDidMount() {
    this.props.getAds();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { ads } = this.props;
    return (
      <div>
        <div className="search-section-box">
          <div className="search-input">
            <form>
              <input
                className="searchtext"
                type="text"
                name="searchtext"
                onChange={this.handleChange}
                placeholder="Que recherchez-vous ?"
              />
              <select
                name="city"
                onChange={this.handleChange}
                className="categorybox"
              >
                <option value="" selected>
                  Toute la Tunisie
                </option>
                {getCity().map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
              <select
                name="category"
                onChange={this.handleChange}
                className="categorybox"
              >
                <option value="" selected>
                  Tous les categories
                </option>
                {getCategory().map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
              <select name="tri" className="categorybox">
                <option value="plus_recente">Tri : Plus récentes</option>
                <option value="plus_ancienne">Tri : Plus ancienne</option>
                <option value="prix_croissant">Tri : Prix croissants</option>
                <option value="prix_decroissant">
                  Tri : Prix décroissants
                </option>
              </select>
              <button
                className="orangeBtn"
                type="submit"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-search" /> Rechercher
              </button>
              <div id="filtre" />
            </form>
          </div>
        </div>

        {ads.length === 0 ? (
          <div className="unknow-annonce">
            <h2>Aucune annonce pour le moment</h2>
          </div>
        ) : (
          <div className="ad-list">
            {ads
              .filter(
                (el) =>
                  el.city.includes(this.state.city) &&
                  el.category.includes(this.state.category) &&
                  el.title
                    .toLowerCase()
                    .includes(this.state.searchtext.toLowerCase().trim())
              )
              .map((ad, i) => (
                <div className="ads">
                  <div className="img-container">
                    <img
                      className="ads-img"
                      alt=""
                      src={`http://localhost:5000/api/ads/uploads/${ad.img[0]}`}
                    />
                  </div>
                  <div className="ad-foot">
                    <div className="ad-foot-left">
                      <Link className="link" to={`/ad/${ad._id}`}>
                        <b className="ad-name">{ad.title}</b>
                      </Link>
                      <p className="ad-city">{ad.city}</p>
                    </div>
                    <div className="ad-foot-right">
                      <b className="ad-price">{ad.price} DT</b>
                      <p
                        className={
                          ad.isAvailable
                            ? "ad-dispo enable"
                            : "ad-dispo disable"
                        }
                      >
                        <i className="fa fa-check" />
                        {ad.isAvailable ? "disponible" : "non disponible"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}
AdsList.propTypes = {
  getAds: PropTypes.func.isRequired,
  ads: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  ads: state.ads,
});

export default connect(mapStateToProps, { getAds })(AdsList);
