import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { editAd } from "../../actions/adActions";
import { getCategory, getCity } from "../constants/data";
import { Redirect } from "react-router-dom";

class EditAd extends Component {
  state = {
    grabbedValue: "",
    category: "",
    title: "",
    price: "",
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
  handleUpdate = (value) => {
    let newAd = {
      category: this.state.category,
      title: this.state.title,
      price: this.state.price,
      isAvailable: this.state.isAvailable,
      description: this.state.description,
      city: this.state.city,
      img: this.state.img,
    };
    this.props.editAd(value, newAd);
    this.setState({
      redirect: !this.state.redirect,
    });
  };
  uploadImg(e) {
    const formData = new FormData();
    formData.append("img", e.files[0], e.files[0].name);
    axios.post("/api/ads/fileup", formData);

    let file = e.files[0];
    this.setState({
      img: [...this.state.img, file.name],
    });

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        images: [...this.state.images, reader.result],
      });
    };

    reader.readAsDataURL(file);
  }
  componentDidMount() {
    axios.get(`/api/ads/${this.props.id}`).then((res) =>
      this.setState({
        category: res.data.category,
        title: res.data.title,
        price: res.data.price,
        isAvailable: this.state.isAvailable,
        description: this.state.description,
        city: this.state.city,
      })
    );
  }
  render() {
    return (
      <div className="user-page">
        <div className="add-form show-form-ad">
          <h3>Modifier annonce</h3>

          <div className="insert-form ">
            <div className="row">
              <label for="img">images :</label>
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
                {[].map((x) => (
                  <img width="30" height="30" src={x} />
                ))}
              </div>
            </div>
            <div className="row">
              <label for="title">titre :</label>
              <input
                id="title"
                value={this.state.title}
                name="title"
                onChange={this.handleChange}
                type="text"
                id="title"
              />
            </div>
            <div className="row">
              <label for="price">prix :</label>
              <input
                id="price"
                value={this.state.price}
                name="price"
                onChange={this.handleChange}
                type="number"
                id="price"
              />
            </div>

            <div className="row">
              <label for="desciption">description :</label>
              <textarea
                id="description"
                value={this.state.description}
                name="description"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="row">
              <label for="category">categorie :</label>
              <select
                id="category"
                value={this.state.category}
                name="category"
                onChange={this.handleChange}
              >
                <option>selectionnez une categorie</option>
                {getCategory().map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
            </div>
            <div className="row">
              <label for="city">ville :</label>
              <select
                id="city"
                value={this.state.city}
                name="city"
                onChange={this.handleChange}
              >
                {getCity().map((c) => {
                  return <option value={c}>{c}</option>;
                })}
              </select>
            </div>

            <div className="row">
              <label for="avaible">disponible :</label>
              <select
                id="isAvaible"
                value={this.state.isAvailable}
                name="isAvailable"
                onChange={this.handleChange}
              >
                <option value="1">oui</option>
                <option value="0">non</option>
              </select>
            </div>
            <div className="row">
              <div>
                <button
                  className="btn add"
                  onClick={() => this.handleUpdate(this.props.id)}
                >
                  Modifier
                </button>
                {this.state.redirect ? <Redirect to="/ads" /> : null}
                <button className="btn cancel">annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { editAd })(EditAd);
