import React from "react";
import Image1 from "../assets/Images/Group 253.png";
import style from "../assets/css/DashCard.module.css";

export const DashCards = (props) => {
  return (
    <div className={style[props.wrapperName]}>
      <div className={style.title}>{props.title}</div>
      <div className={style.body}>
        <div className={style.number}>{props.num}</div>
        <img src={Image1} alt="logo" />
      </div>
    </div>
  );
};

export const AllCourseCards = (props) => {
  return (
    <div>
      <span className="allcourse-card">
        <img src={props.img} alt="logo" />

        <div className="card-content">
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut.
          </h5>
          <p>Lorem ipsum dolor</p>
          <div class="stars">
            {" "}
            <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
            <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
            <i class="fa fa-star"></i>{" "}
          </div>
        </div>
      </span>
    </div>
  );
};

export class Pie extends React.Component {
  render() {
    let size = this.props.size;
    let value = parseFloat(String(this.props.value));
    let val = value > 1 ? value : value * 100;
    let dim = size ? parseInt(size, 10) : 32;
    let strokeDasharray = `${val} 100`;
    let containerStyle = {
      display: "inline-block",
      width: dim,
      height: dim,
    };

    return (
      <div className="piechart" style={containerStyle}>
        <svg viewBox="0 0 32 32">
          <circle className="bottom" r="16" cx="16" cy="16" />
          <circle
            className="top rounded"
            r="16"
            cx="16"
            cy="16"
            style={{ strokeDasharray }}
          />
        </svg>
      </div>
    );
  }
}
