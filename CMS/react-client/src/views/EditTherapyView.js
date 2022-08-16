import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultIcon from "../assets/user-icon.svg";

export default function EditTherapyView(props) {
  const [therapy, setTherapy] = useState({});
  const [users, setUsers] = useState([]);
  const [updated, setUpadated] = useState({});
  useEffect(() => {
    axios.get("/therapy/" + props.id).then((response) => {
      console.log(response);

      setTherapy(response.data);
      setUsers(response.data.users);
      setUpadated(response.data);
    });
  }, []);

  const QGetData = (e) => {
    setUpadated({ ...updated, [e.target.name]: e.target.value });
  };

  const QPostUpdate = () => {
    console.log(updated);
    axios.post("/therapy/update", { therapy: updated }).then((response) => {
      console.log(response);
      props.QOpenPostedTherapy(therapy.id);
    });
  };

  return (
    <div className="container">
      <div className="d-flex flex-row mt-3">
        <img
          src={therapy.photo_url}
          alt=""
          style={{
            height: "200px",
            width: "200px",
          }}
        />
        <div className="d-flex flex-column  ms-3">
          {/* <div className="h1">{therapy.title}</div> */}
          <input
            type="text"
            className="form-control-lg"
            name="title"
            defaultValue={therapy.title}
            onChange={(e) => QGetData(e)}
          />
          <div className="h4 text-secondary">{therapy.worker}</div>
        </div>
        <div
          className="btn btn-primary ms-auto"
          style={{ height: "40px" }}
          onClick={() => QPostUpdate()}
        >
          Končaj z urejanjem
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="h3">Opis</div>
        {/* <div className="ms-3">{therapy.description}</div> */}
        <textarea
          name="description"
          cols="30"
          rows="10"
          className="form-control"
          defaultValue={therapy.description}
          onChange={(e) => QGetData(e)}
        ></textarea>
      </div>
      <div className="d-flex flex-column">
        <div className="h3">Pomembne povezave</div>
        {/* <a className="ms-3" href={therapy.link1}>
          {therapy.link1}
        </a> */}
        <input
          type="text"
          className="form-control"
          name="link1"
          defaultValue={therapy.link1}
          onChange={(e) => QGetData(e)}
        />

        {/* <a className="ms-3" href={therapy.link2}>
          {therapy.link2}
        </a> */}
        <input
          type="text"
          className="form-control"
          name="link2"
          defaultValue={therapy.link2}
          onChange={(e) => QGetData(e)}
        />

        {/* <a className="ms-3" href={therapy.link3}>
          {therapy.link3}
        </a> */}
        <input
          type="text"
          className="form-control"
          name="link3"
          defaultValue={therapy.link3}
          onChange={(e) => QGetData(e)}
        />
      </div>

      {/* <div className="h3 mt-4">Vpisani uporabniki</div>

      <div className="d-flex flex-wrap mt-2">
        {users.map((el, index) => {
          return (
            <div
              className="card ms-2 btn"
              id={el.id}
              style={{}}
              onClick={() => {
                props.QVisitUserAccount(el.id);
              }}
            >
              <div className="d-flex flex-row justify-content-center align-items-center">
                <img src={DefaultIcon} alt="" height={20} width={20} />
                <div className="">{el.username}</div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
