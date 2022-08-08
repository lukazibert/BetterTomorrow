import { useState } from "react";
import ChatCard from "./components/ChatCard";
import React from "react";

export default function ChatLibraryView(props) {
  return (
    <div className="container">
      <div className="d-flex h1 w-100 justify-content-center">
        MOJI POGOVORI
      </div>
      <div className="d-felx flex-col">
        <ChatCard />
        <ChatCard />
      </div>
    </div>
  );
}
