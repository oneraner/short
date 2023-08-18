import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import "./App.css";

import { PlayerContainer } from "./components/PlayerContainer";

export interface GetListResponse {
  title: string;
  cover: string;
  play_url: string;
}

function App() {
  const wrapRef = useRef(null);

  const { data } = useSWR("video", () =>
    axios.get("http://localhost:8088/for_you_list").then(res => res)
  );

  return (
    <div
      ref={wrapRef}
      className="w-screen h-screen overflow-scroll scroll-smooth"
    >
      {(data?.data?.items ?? []).map((resource: GetListResponse) => (
        <PlayerContainer resource={resource} />
      ))}
    </div>
  );
}

export default App;
