import { useRef } from "react";
import useSWR from "swr";
import axios from "axios";
import "./App.css";
import ShortsPlayer from "./components/ShortsPlayer";

export interface GetListResponse {
  title: string;
  cover: string;
  play_url: string;
}

function App() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { data } = useSWR("video", () =>
    axios.get("http://localhost:8088/for_you_list").then(res => res)
  );

  return (
    <div ref={wrapRef} className="container">
      <ShortsPlayer
        shortsData={data?.data?.items ?? []}
        screenHeight={wrapRef?.current?.clientHeight ?? 0}
      />
    </div>
  );
}

export default App;
