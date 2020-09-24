import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addAd } from "../../actions/adActions";
import { getCategory, getCity } from "../constants/data";
import axios from "axios";
import FormData from "form-data";
import { toggleModal } from "../../actions/modalActions";

class AddAd extends Component {
  state = {
    grabbedValue: "",
    category: "",
    title: "",
    price: "",
    owner: this.props.auth.user,
    isAvailable: true,
    description: "",
    city: "",
    images: [],
    img: [],
    redirect: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  uploadImg(e) {
    const formData = new FormData();
    formData.append("img", e.files[0], e.files[0].name);
    axios.post("/api/ads/fileup", formData);

    let file = e.files;
    let fileArray = [];
    for (let i = 0; i < file.length; i++) {
      fileArray.push(file[i].name);
      console.log(fileArray);
    }
    this.setState({
      img: fileArray,
    });

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        profileImg: [...this.state.profileImg, reader.result],
      });
    };

    reader.readAsDataURL(file[0]);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let newAd = {
      category: this.state.category,
      title: this.state.title,
      price: this.state.price,
      owner: this.state.owner,
      isAvailable: this.state.isAvailable,
      description: this.state.description,
      city: this.state.city,
      img: this.state.img,
    };
    this.props.addAd(newAd);
    this.setState({
      redirect: !this.state.redirect,
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return isAuthenticated ? (
      <div className="user-page">
        <div className="add-form show-form-ad">
          <h1>Ajouter annonce</h1>
          <div className="insert-form ">
            <div className="row">
              <label for="img">Images :</label>
              <input
                id="img"
                multiple
                accept="image/*"
                onChange={(e) => this.uploadImg(e.target)}
                type="file"
                id="img"
              />
              <span className="tooltip">max 5 images</span>
              <div className="img-prev">
                {this.state.images.map((x) => (
                  <img width="30" height="30" src={x} />
                ))}
              </div>
            </div>
            <div className="row">
              <label for="title">Titre :</label>
              <input
                id="title"
                name="title"
                onChange={this.handleChange}
                type="text"
                id="title"
              />
            </div>
            <div className="row">
              <label for="price">Prix :</label>
              <input
                id="price"
                name="price"
                onChange={this.handleChange}
                type="number"
                id="price"
              />
            </div>

            <div className="row">
              <label for="desciption">Description :</label>
              <textarea
                id="description"
                name="description"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="row">
              <label for="category">Categorie :</label>
              <select
                id="category"
                name="category"
                onChange={this.handleChange}
              >
                <option>Selectionnez une categorie</option>
                {getCategory().map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
            </div>
            <div className="row">
              <label for="city">Ville :</label>
              <select id="city" name="city" onChange={this.handleChange}>
                {getCity().map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
            </div>

            <div className="row">
              <label for="avaible">Disponible :</label>
              <select
                id="isAvaible"
                name="isAvailable"
                onChange={this.handleChange}
              >
                <option value="1">oui</option>
                <option value="0">non</option>
              </select>
            </div>
            <div className="row">
              <div>
                <button className="btn add" onClick={this.handleSubmit}>
                  Ajouter
                </button>
                {this.state.redirect ? <Redirect to="/myads" /> : null}
                <button className="btn cancel">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
});

export default connect(mapStateToProps, { addAd, toggleModal })(AddAd);
