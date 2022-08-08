import DefaultIcon from "../../assets/user-icon.svg";
import React from "react";

export default function ChatCard(props) {
  return (
    <div className="card m-4">
      <div className="card-header">
        <div className="d-flex flex-row justify-content-start align-items-center">
          <img
            src={DefaultIcon}
            height={40}
            width={40}
            alt="..."
            className="img-fluid img-thumbnail"
          />
          {/* {props.img} */}
          <div className="m-2 h5">Worker1</div>
          {/* {props.name} */}
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex flex-row w-100 justify-content-between align-items-center">
          <div className="card-text my-4 ms-1 text-weight-bold">
            Zadnje sporočilo...
          </div>
          <span class="badge bg-primary badge-pill">1</span>
        </div>
        <a href="#" className="btn btn-primary">
          Nadaljuj s pogovorom
        </a>
      </div>
    </div>
  );
}
