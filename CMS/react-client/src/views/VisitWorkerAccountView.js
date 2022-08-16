import axios from "axios";
import React, { useState, useEffect } from "react";
import DefaultIcon from "../assets/user-icon.svg";
import EditWorkerAccountView from "./EditWorkerAccountView";

export default function VisitWorkerAccountView(props) {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({});

  const [description, setDescription] = useState([]);

  const [links, setLinks] = useState([]);

  const [therapies, setTherapies] = useState([]);

  const forceUpdate = React.useReducer(() => ({}), {})[1];

  useEffect(() => {
    axios
      .post("/workers/get_acc_data_by_id", { id: props.id })
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setDescription(JSON.parse(response.data.description));
        setLinks(JSON.parse(response.data.links));
        setTherapies(response.data.therapies);
      });
  }, []);

  const QUpdateUser = (data) => {
    setEdit(false);
    forceUpdate();
    // useEffect();
    // setUser(data);
    // setDescription(data.description);
    // setLinks(data.links);
    // setTherapies(data.therapies);
  };

  const QIsUserSingedUp = (id) => {
    // console.log(user.therapies);
    let arr = JSON.parse(props.user.therapies);
    return arr.includes(id);
    // console.log("arr: ", arr);
    // for (let index = 0; index < arr.length; index++) {
    //   if (index == id) {
    //     return true;
    //   }
    // }
    // return false;
  };

  const QAddTherapyToArr = (id) => {
    console.log(props.user.id);
    axios
      .post("users/update_therapy_list", { id: props.user.id, therapy_id: id })
      .then((response) => {
        console.log("responce: ", response);
      });
    axios
      .post("therapy/update_therapy_list", {
        id: props.user.id,
        therapy_id: id,
      })
      .then((response) => {
        console.log("responce: ", response);
      });
    props.QOpenPostedTherapy(id);
  };

  return (
    <div className="container">
      <div className="d-flex flex-row mt-2">
        <img
          src={DefaultIcon}
          alt=""
          className="card-img-left rounded"
          style={{
            resizeMode: "contain",
            height: 300,
            width: 300,
          }}
        />
        <div className="d-flex flex-column w-100">
          <div className="h1">{user.username}</div>
          <div className="text-secondary">{user.profession}</div>
        </div>
      </div>
      <div className="d-flex flex-column my-3">
        <div className="h2">Opis</div>
        {description.map((el, index) => {
          return el.data.length < 100 ? (
            <div className="d-flex flex-row align-items-center ms-3">
              <div className="h5 mb-1">{el.label + ":"}</div>
              <div className="ms-2">{el.data}</div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-start ms-3">
              <div className="h5">{el.label + ":"}</div>
              <div className="ms-2">{el.data}</div>
            </div>
          );
        })}
      </div>
      <div className="d-flex flex-column my-3">
        <div className="h2">Povezave</div>

        {links.map((el, index) => {
          return (
            <div className="d-flex flex-row align-items-center  ms-3">
              <div className="h5 mb-1">{el.label + ":"}</div>
              <a className="link-primary ms-2" href={el.data}>
                {el.data}
              </a>
            </div>
          );
        })}
      </div>
      <div className="h2">Terapije</div>
      <div className="d-flex flex-wrap my-3">
        {therapies.length > 0 ? (
          therapies.map((el, index) => {
            return (
              <div
                className="card m-3"
                style={{
                  minWidth: "30%",
                }}
              >
                <div className="card-header">
                  <div className="h5 ms-3">{el.title}</div>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row align-items-center justify-content-around">
                    {!QIsUserSingedUp(el.id) ? (
                      <div
                        className="btn btn-primary"
                        onClick={() => {
                          QAddTherapyToArr(el.id);
                          props.QOpenPostedTherapy(el.id);
                        }}
                      >
                        Prijavi se na terapijo
                      </div>
                    ) : (
                      <div
                        className="btn btn-primary"
                        onClick={() => {
                          // QAddTherapyToArr(el.id);
                          props.QOpenPostedTherapy(el.id);
                        }}
                      >
                        Pojdi na terapijo
                      </div>
                    )}

                    {/* (<div
                      className="btn btn-primary"
                      onClick={() => {
                        // QAddTherapyToArr(el.id);
                        props.QOpenPostedTherapy(el.id);
                      }}
                    >
                      Prijavi se na terapijo
                    </div>)} */}
                    {/* <div
                      className="btn btn-primary"
                      onClick={() => props.QEditTherapy(el.id)}
                    >
                      Nastavitve
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
  // );
}
