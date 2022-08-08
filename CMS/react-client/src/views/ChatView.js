import ChatMessage from "./components/ChatMessage";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import React from "react";

export default function ChatView(props) {
  const [message, setMessage] = useState("");

  let QGetTextFromField = (e) => {
    setMessage(e);
  };

  let messages_arr = [];

  useEffect(() => {
    axios.get("chat/get_messages", { group_id: props.group_id }).then((res) => {
      messages_arr = res;
    });
  });

  let QPostMessage = () => {
    axios
      .post(
        "chat/post_message",
        {
          text: message,
          groupe_id: props.group_id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Sent to server...");
        console.log("responce:", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container ">
      <div className="d-flex justify-content-center h3 m-3">
        me and {props.name}
      </div>
      <div className="card my-3">
        <div
          className="card-body"
          style={{
            height: "70vh",
            // backgroundColor: "#F5F5F5",
          }}
        >
          <div
            className="d-flex flex-column-reverse align-items-end"
            style={{
              height: "100%",
              overflowY: "scroll",
            }}
          >
            <ChatMessage sent={false} text={"Hello"} />
            <ChatMessage sent={true} text={"Hello"} />
          </div>
        </div>
        <div
          className="card-footer"
          style={{
            height: "7vh",
          }}
        >
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="chat_input"
              on
              onChange={(e) => QGetTextFromField(e)}
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-primary"
                type="button"
                onClick={() => QPostMessage()}
              >
                Pošlji
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
