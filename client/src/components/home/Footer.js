import React, { Component } from "react";
import "./css/index.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="prefooter">
          <div className="container">
            <div style={{ overflow: "auto" }}>
              <div className="col4">
                <h3>A Propos</h3>Site de petites annonces gratuite de
                particulier et professionnels en Tunisie
                <ul>
                  <li>
                    <a href="">Qui somme nous</a>
                  </li>
                  <li>
                    <a href="">Mentions legales</a>
                  </li>
                </ul>
              </div>
              <div className="col4">
                <h3>Informations légales</h3>
                <ul>
                  <li>
                    <a href="">Conditions générales d'utilisation</a>
                  </li>
                  <li>
                    <a href="">Règles générales de diffusion</a>
                  </li>
                  <li>
                    <a href="">Information sur les cookies</a>
                  </li>
                </ul>
              </div>
              <div className="col4">
                <h3>Pages</h3>
                <ul>
                  <li>
                    <a href="">Information sur les cookies</a>
                  </li>
                  <li>
                    <a href="">Règles générales de diffusion</a>
                  </li>
                  <li>
                    <a href="">Conditions générales d'utilisation</a>
                  </li>
                </ul>
              </div>
              <div className="col4">
                <h3>Nous contactez</h3>
                <ul></ul>
              </div>
            </div>
            <div className="social-footer">
              <div className="social-box" style={{ width: "120px" }}>
                <a href="" target="newpage">
                  <div className="social-box-container">
                    <img
                      src="https://www.annonces-top.com/images/facebook.png"
                      alt="Visiter notre page Facebook"
                    />
                  </div>
                </a>
                <a href="" target="newpage">
                  <div className="social-box-container">
                    <img
                      src="https://www.annonces-top.com/images/twitter.png"
                      alt="Visiter notre page Twitter"
                    />
                  </div>
                </a>
                <a href="" target="newpage">
                  <div className="social-box-container">
                    <img
                      src="https://www.annonces-top.com/images/pinterest.png"
                      alt="Visiter notre page Pinterest"
                    />
                  </div>
                </a>
                <a href="" target="newpage">
                  <div className="social-box-container">
                    <img
                      src="https://www.annonces-top.com/images/linkedin.png"
                      alt="Visiter notre page Linkedin"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
