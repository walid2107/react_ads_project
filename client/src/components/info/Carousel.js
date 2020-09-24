import React, { Component } from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      galery: [],
    };
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({
        galery: this.props.galery,
      });
    }, 1);
  }
  componentDidMount() {
    if (this.props.galery)
      this.setState({
        active: 0,
      });
  }
  nextOrPrev = (e) => {
    if (e === "next") {
      if (this.state.active < this.props.galery.length - 1) {
        this.setState({ active: this.state.active + 1 });
      } else {
        this.setState({
          active: 0,
        });
      }

      return;
    }
    if (this.state.active === 0) {
      this.setState({
        active: this.props.galery.length - 1,
      });
    } else {
      this.setState({
        active: this.state.active - 1,
      });
    }
  };
  render() {
    return (
      <div className="slider-container">
        <div className="slider">
          <i
            id="prev"
            className="fa fa-chevron-left slide-arrow-left slide-arrow"
            onClick={(e) => this.nextOrPrev(e.target.id)}
          ></i>
          <img
            className="slider-img"
            src={
              "http://localhost:5000/api/ads/uploads/" +
              this.state.galery[this.state.active]
            }
            alt=""
          />
          <i
            id="next"
            onClick={(e) => this.nextOrPrev(e.target.id)}
            className="fa fa-chevron-right slide-arrow slide-arrow-right"
          ></i>
        </div>
        <div className="slider-foot">
          {this.state.galery.map((x, i) => {
            return (
              <img
                className={
                  this.state.active == i ? "img-item img-hover" : "img-item"
                }
                src={"http://localhost:5000/api/ads/uploads/" + x}
                alt=""
                onClick={() => this.setState({ active: i })}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
