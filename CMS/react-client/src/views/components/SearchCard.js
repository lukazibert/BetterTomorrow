import DefaultIcon from "../../assets/user-icon.svg";
import React, { useState, useEffect } from "react";

export default function SearchCard(props) {
  return (
    <div
      className="card my-3 btn mx-auto"
      onClick={props.onClick}
      style={{
        width: "70%",
      }}
    >
      <div className="card-body">
        <div className="d-flex flex-row">
          <img
            src={DefaultIcon}
            alt="alt"
            className="card-img-left rounded"
            style={{
              resizeMode: "contain",
              height: 100,
              width: 100,
            }}
          />
          <div className="d-flex flex-column ms-2">
            <div className="h1">{props.username}</div>
            <div className="h3 text-secondary">{props.profession}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
