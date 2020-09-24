import React, { Component } from "react";
import { connect } from "react-redux";
import { getAds } from "../../actions/adActions";
import PropTypes from "prop-types";
import { getCategory } from "../constants/data";
import "./css/index.css";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentDidMount() {
    this.props.getAds();
  }
  render() {
    const { ads } = this.props;
    return (
      <div className="landing">
        <div className="bighome">
          <div className="bighome-titre">
            Faite votre recherche et trouver tout ce que vous voulez
          </div>
          <div className="bighome-search">
            <form>
              <input
                type="text"
                name="searchtext"
                placeholder="Votre recherche"
                className="bighome-input-search"
              />
              <select name="categorie" className="bighome-input">
                <option value="0">Toutes les catégories</option>
                {getCategory().map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
              <button className="bighome-btn">
                <i className="fas fa-search"></i> Rechercher
              </button>
            </form>
          </div>
          <img src="https://www.sonisimmo.com/upload/slides/12.jpg" />
        </div>
        <div className="container">
          <div className="ads728"></div>
        </div>

        <div className="colorGray">
          <div className="container">
            <h2>Les Categories</h2>
            <div className="box-cat-englobe">
              <div className="box-categorie">
                <div className="box-categorie-image">
                  <img src="https://www.shua-creation.com/clone/pas/template/shinay/css/images/maison-icon.png" />
                </div>
                <Link
                  to="/ads/search/Maison"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className="box-categorie-title">Maison</div>
                </Link>
              </div>
              <div className="box-categorie">
                <div className="box-categorie-image">
                  <img src="https://www.shua-creation.com/clone/pas/template/shinay/css/images/apparement-icon.png" />
                </div>
                <Link
                  to="/ads/search/Appartement"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className="box-categorie-title">Appartement</div>
                </Link>
              </div>
              <div className="box-categorie">
                <div className="box-categorie-image">
                  <img src="https://www.shua-creation.com/clone/pas/template/shinay/css/images/terrain-icon.png" />
                </div>
                <Link
                  to="/ads/search/Terrain"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className="box-categorie-title">Terrain</div>
                </Link>
              </div>
              <div className="box-categorie">
                <div className="box-categorie-image">
                  <img src="https://www.shua-creation.com/clone/pas/template/shinay/css/images/parking-icon.png" />
                </div>
                <Link
                  to="/ads/search/Parking"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className="box-categorie-title">Parking</div>
                </Link>
              </div>
              <div className="box-categorie">
                <div className="box-categorie-image">
                  <img src="https://www.shua-creation.com/clone/pas/template/shinay/css/images/location-icon.png" />
                </div>
                <Link
                  to="/ads/search/Location"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className="box-categorie-title">Location</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  getAds: PropTypes.func.isRequired,
  ads: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  ads: state.ads,
});

export default connect(mapStateToProps, { getAds })(Landing);
