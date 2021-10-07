import React from "react";
import "../assets/css/popup.css"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">

        <h1 style={{ marginBottom: "10px", color: "black", fontWeight: "300" }}>Topic</h1>
        <input style={{ marginBottom: "40px", borderColor: "#d4cece" }} type="text" placeholder="topic name" />
        <div className=" bt mb-2">
          <Button style={{ marginBottom: "30px", color: "white", fontWeight: "300", width: "200px", backgroundColor: "#6388ee", borderColor: "#6388ee", height: "50px", borderRadius: "4px",marginLeft:"0", marginBottom:"10px"}} variant="primary">Upload PDF</Button>
        </div>
        <div className=" bt mb-2">
          <Button style={{ marginBottom: "10px", color: "white", fontWeight: "300", width: "200px", height: "50px", backgroundColor: "#6388ee", borderColor: "#6388ee", borderRadius: "4px", marginLeft:"0" }} variant="primary">Upload Videos</Button>
        </div>
        <button className="bt1" style={{ width: "100px", color: "white", fontWeight: "300", float: "right", borderRadius: "4px", height: "50px" }}>Save</button>

      </div>
    </div>
  );
};

export default Popup;
