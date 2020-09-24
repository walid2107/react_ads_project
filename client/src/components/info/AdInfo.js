import React, { Component } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import "./css/index.css";

class AdInfo extends Component {
  state = {
    ad: {},
    owner: {},
  };
  componentDidMount() {
    axios
      .get(`/api/ads/${this.props.id}`)
      .then((res) => this.setState({ ad: res.data, owner: res.data.owner }))
      .catch((err) => console.log(err));
  }

  render() {
    const { ad } = this.state;
    const { owner } = this.state;
    return (
      <div className="ad-info">
        <div className="ad-title">
          <div>
            <b>{ad.title}</b>
            <p className="ad-city">{ad.city}</p>
          </div>
          <div className="ad-title-right">
            <p>
              {ad.category} / {ad.city}
            </p>
          </div>
        </div>
        <div className="add-main">
          <div className="ad-data">
            <Carousel galery={ad.img} />
          </div>
          <div className="ad-owner">
            <div className="info-card-user">
              <i className="fa fa-user-circle user-img"> </i>
              <b>{owner.fullname}</b>
              <button className="btn-phone">
                <i className="fa fa-phone" />
                <b>{owner.phone}</b>
              </button>
              <button className="btn-msg">
                <i className="fa fa-paper-plane" />
                <b>contacter</b>
              </button>
            </div>
            <div className="info-card">
              <div className="info-row">
                <b>Prix :</b>
                <p className="price">
                  {ad.price}
                  <span> DT</span>
                </p>
              </div>
              <div className="info-row">
                <b>Status :</b>
                {ad.isAvailable ? (
                  <p className="enable"> disponible </p>
                ) : (
                  <p className="disable"> non disponible </p>
                )}
              </div>

              <div className="info-row">
                <b>Ajouter le :</b>
                <p>{String(new Date(Date.parse(ad.date)).toLocaleString())}</p>
              </div>
              <div className="info-row">
                <b>Description:</b>
                <p>{ad.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdInfo;
