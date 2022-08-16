import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultIcon from "../assets/user-icon.svg";

export default function TherapyView(props) {
  const [therapy, setTherapy] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/therapy/" + props.id).then((response) => {
      console.log(response.data.users);

      setTherapy(response.data);
      setUsers(response.data.users);
    });
  }, []);
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
          <div className="h1">{therapy.title}</div>
          <div className="h4 text-secondary">{therapy.worker}</div>
        </div>
        <div className="d-flex w-100 justify-content-end">
          {/* <i
            class="d-flex btn bi bi-gear-wide-connected"
            style={{
              fontSize: "2rem",
            }}
            onClick={() => {
              props.QEditTherapy(therapy.id);
            }}
          /> */}
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="h3">Opis</div>
        <div className="ms-3">{therapy.description}</div>
      </div>
      <div className="d-flex flex-column">
        <div className="h3">Pomembne povezave</div>
        <a className="ms-3" href={therapy.link1}>
          {therapy.link1}
        </a>
        <a className="ms-3" href={therapy.link2}>
          {therapy.link2}
        </a>
        <a className="ms-3" href={therapy.link3}>
          {therapy.link3}
        </a>
      </div>
      {props.type === "worker" ? (
        <div>
          <div className="h3 mt-4">Vpisani uporabniki</div>

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
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
