import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchCard from "./components/SearchCard";
export default function SearchView(props) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    console.log(props.username);
    axios
      .post("/workers/get_search", { username: props.username })
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="d-flex flex-column w-100">
      {result.length > 0 ? (
        result.map((el, index) => {
          return (
            <SearchCard
              username={el.username}
              profession={el.profession}
              onClick={() => {
                props.QVisitWorkerAccount(el.id);
              }}
            />
          );
        })
      ) : (
        <div className="h2 text-secondary">Ni zadetkov</div>
      )}
    </div>
  );
}
