import React, { Component } from "react";

export default function ChatMessage(props) {
  return (
    <div
      className={
        props.sent
          ? "d-flex w-100 justify-content-start"
          : "d-flex w-100 justify-content-end"
      }
    >
      <div
        className={
          props.sent
            ? "badge badge-pill bg-secondary m-2 p-3"
            : "badge badge-pill bg-primary m-2 p-3"
        }
      >
        <div
          className="d-flex"
          style={{
            maxWidth: "40vw",
            overflow: "visible",
            // overflowWrap: "break-word",
            wordBreak: "break-word",
            // lineBreak: "strict",
            whiteSpace: "pre-line",
            textAlign: "left",
            fontSize: "medium",
          }}
        >
          {props.text}
        </div>
      </div>
    </div>
  );
}
