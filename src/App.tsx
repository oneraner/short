import { useRef } from "react";
import useSWR from "swr";
import axios from "axios";
import "./App.css";
import ShortsPlayer from "./components/ShortsPlayer";
import Header from "./components/Header";
import Footer from "./components/Footer";

export interface GetListResponse {
  title: string;
  cover: string;
  play_url: string;
}

function App() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const params = new URLSearchParams(window.location.search);
  const isMock = params.get("mock") === "true";

  const { data } = useSWR(isMock ? null : "video", () =>
    axios.get("http://localhost:8088/for_you_list").then(res => res)
  );

  const shortsData = isMock
    ? [
        {
          title: "test0",
          play_url: "https://livedoc.cgtn.com/500d/prog_index.m3u8",
        },
        {
          title: "test1",
          play_url: "https://livedoc.cgtn.com/500d/prog_index.m3u8",
        },
        {
          title: "test2",
          play_url: "https://livedoc.cgtn.com/500d/prog_index.m3u8",
        },
      ]
    : data?.data?.items ?? [];

  return (
    <div ref={wrapRef} className="container">
      <Header />
      <ShortsPlayer
        shortsData={shortsData}
        screenHeight={wrapRef?.current?.clientHeight ?? 0}
      />
      <Footer />
    </div>
  );
}

export default App;
