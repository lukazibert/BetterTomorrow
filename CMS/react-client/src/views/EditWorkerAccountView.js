import React, { useState } from "react";
import DefaultIcon from "../assets/user-icon.svg";
import axios from "axios";

export default function EditWorkerAccountView(props) {
  // const [edit, setEdit] = useState(false);

  const [user, setUser] = useState(props.user);

  const [description, setDescription] = useState(
    JSON.parse(props.user.description)
  );

  const [links, setLinks] = useState(props.links);

  const [therapies, setTherapies] = useState(props.user.therapies);

  const QUpdateDescriptionLabel = (e) => {
    const newState = description.map((el, index) => {
      if (index == e.target.id) {
        return { ...el, label: e.target.value };
      } else {
        return el;
      }
    });
    setDescription(newState);
    console.log(description);
  };

  const QUpdateDescriptionData = (e) => {
    setDescription(
      description.map((el, index) => {
        if (index == e.target.id) {
          return { ...el, data: e.target.value };
        } else {
          return el;
        }
      })
    );
    console.log(description);
  };

  const QUpdateLinkLabel = (e) => {
    setLinks(
      links.map((el, index) => {
        if (index == e.target.id) {
          return { ...el, label: e.target.value };
        } else {
          return el;
        }
      })
    );
    console.log(links);
  };
  const QUpdateLinkData = (e) => {
    setLinks(
      links.map((el, index) => {
        if (index == e.target.id) {
          return { ...el, data: e.target.value };
        } else {
          return el;
        }
      })
    );
    console.log(links);
  };

  const QSaveWorkerInfo = async () => {
    user.description = description;
    user.links = links;
    user.therapies = therapies;
    console.log(user);

    await axios
      .post("/workers/update", {
        // id: user.id,
        // username: user.username,
        // profession: user.profession,
        // description: description,
        user: user,
      })
      .then((response) => {
        console.log(response);
        props.QUpdateUser(user);
      });
  };

  const QGetTextFromField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const QAddDescription = () => {
    setDescription((description) => [...description, { label: "", data: "" }]);
    console.log(description);
  };

  const QAddLink = () => {
    setLinks([...links, { label: "", data: "" }]);
    console.log(links);
  };

  const QRemoveDescription = (i) => {
    setDescription(
      description.filter((el, index) => {
        return index !== i;
      })
    );
    console.log("desc:", description);
  };

  const QRemoveLink = (i) => {
    setLinks(
      links.filter((el, index) => {
        return index !== i;
      })
    );
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
        <div
          className="d-flex flex-column"
          style={{
            width: "60vw",
          }}
        >
          {/* <div className="h1">{props.user.username}</div> */}
          <div className="h1">{user.username}</div>
          <input
            type="text"
            name="profession"
            defaultValue={props.user.profession}
            className="form-control w-100"
            onChange={(e) => QGetTextFromField(e)}
          />
        </div>
        <div className="d-flex w-100 justify-content-end align-items-start">
          <a
            href="#"
            className="d-flex btn btn-primary"
            onClick={() => QSaveWorkerInfo()}
          >
            Save
          </a>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="h2">Opis</div>
        <i
          class="bi btn bi-plus-square"
          style={{
            fontSize: "2rem",
          }}
          onClick={() => {
            QAddDescription();
          }}
        />
      </div>
      <div className="d-flex flex-column my-3">
        {description.map((el, index) => {
          return el.data.length < 100 ? (
            <div className="d-flex flex-row align-items-center ms-3">
              {/* <div className="h5 mb-1">{el.lable + ":"}</div>
              <div className="ms-2">{el.data}</div> */}
              <input
                type="text"
                id={index}
                className="form-control-lg"
                defaultValue={el.label}
                onChange={(e) => QUpdateDescriptionLabel(e)}
              />
              <input
                type="text"
                id={index}
                className="form-control ms-2"
                defaultValue={el.data}
                onChange={(e) => QUpdateDescriptionData(e)}
              />
              <i
                class="btn bi bi-trash ms-a"
                style={{
                  fontSize: "2rem",
                }}
                onClick={() => {
                  QRemoveDescription(index);
                }}
              ></i>
            </div>
          ) : (
            <div className="d-flex flex-row align-items-center">
              <div className="d-flex flex-column align-items-start ms-3 w-100">
                {/* <div className="h5">{el.label + ":"}</div> */}
                <input
                  type="text"
                  id={index}
                  className="form-control-lg"
                  defaultValue={el.label}
                  onChange={(e) => QUpdateDescriptionLabel(e)}
                />
                {/* <div className="ms-2">{el.data}</div> */}
                <textarea
                  class="form-control rounded-1"
                  id={index}
                  rows="10"
                  defaultValue={el.data}
                  onChange={(e) => QUpdateDescriptionData(e)}
                ></textarea>
              </div>
              <i
                class="btn bi bi-trash ms-a"
                style={{
                  fontSize: "2rem",
                }}
                onClick={() => {
                  QRemoveDescription(index);
                }}
              ></i>
            </div>
          );
        })}
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="h2">Povezave</div>
        <i
          class="bi btn bi-plus-square"
          style={{
            fontSize: "2rem",
          }}
          onClick={() => {
            QAddLink();
          }}
        />
      </div>
      <div className="d-flex flex-column my-3">
        {links.map((el, index) => {
          return (
            <div className="d-flex flex-row align-items-center ms-3">
              <input
                type="text"
                id={index}
                className="form-control-lg"
                defaultValue={el.label}
                onChange={(e) => QUpdateLinkLabel(e)}
              />
              <input
                type="text"
                id={index}
                className="form-control ms-2"
                defaultValue={el.data}
                onChange={(e) => QUpdateLinkData(e)}
              />
              <i
                class="btn bi bi-trash ms-a"
                style={{
                  fontSize: "2rem",
                }}
                onClick={() => {
                  QRemoveLink(index);
                }}
              ></i>
            </div>
          );
        })}
      </div>
      {/* <div className="h2">Therapies</div>
      <div className="d-flex flex-wrap my-3">
        {therapies.map((el, index) => {
          return (
            <div
              className="card m-3"
              style={{
                minWidth: "30%",
              }}
            >
              <div className="card-header">
                <div className="h5">{el.title}</div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-row align-items-center justify-content-around">
                  <div className="btn btn-primary" onClick={() => {}}>
                    Odpri terapijo
                  </div>
                  <div className="btn btn-primary" onClick={() => {}}>
                    Nastavitve
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
