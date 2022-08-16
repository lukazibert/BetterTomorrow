import axios from "axios";
import React, { useState } from "react";

export default function CreateTherapyView(props) {
  const [therapy, setTherapy] = useState({});
  const [user_id, setId] = useState(props.user_id);

  const QSetValue = (e) => {
    setTherapy({ ...therapy, [e.target.name]: e.target.value });
    console.log(therapy);
  };

  const QPostTherapy = () => {
    axios
      .post("/therapy/post", { therapy: therapy, worker_id: user_id })
      .then((response) => {
        if (typeof response === "string") {
          alert(response);
        } else {
          // console.log("responce: ", response.data.insertId);
          // console.log("responce: ", response);
          props.QOpenPostedTherapy(response.data.insertId);
        }
      });
  };
  return (
    <div className="container">
      <div className="d-flex flex-column mt-4">
        {/* <img src="" alt="" style={{ width: "200px", height: "200px" }} /> */}
        <div className="mb-3">
          <div className="h1">Naslov terapije</div>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={(e) => QSetValue(e)}
          />
        </div>
        <div className="mb-3">
          <div className="h4">Opis terapije</div>
          <textarea
            type="text"
            className="form-control"
            name="description"
            rows="10"
            onChange={(e) => QSetValue(e)}
          />
        </div>
        <div className="mb-3">
          <div className="h4">URL povezava do slike</div>
          <input
            type="text"
            className="form-control"
            name="photo_url"
            onChange={(e) => QSetValue(e)}
          />
        </div>
        <div className="mb-3">
          <div className="h4">Prvi link</div>
          <input
            type="text"
            className="form-control"
            name="link1"
            onChange={(e) => QSetValue(e)}
          />
        </div>
        <div className="mb-3">
          <div className="h3">Drugi link</div>
          <input
            type="text"
            className="form-control"
            name="link2"
            onChange={(e) => QSetValue(e)}
          />
        </div>
        <div className="mb-3">
          <div className="h4">Tretji link</div>
          <input
            type="text"
            className="form-control"
            name="link3"
            onChange={(e) => QSetValue(e)}
          />
        </div>
      </div>
      <div className="d-flex w-100 justify-content-center">
        <div className="btn btn-primary" onClick={() => QPostTherapy()}>
          Ustrvari!
        </div>
      </div>
    </div>
  );
}
