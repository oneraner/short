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
  const { data } = useSWR("video", () =>
    axios.get("http://localhost:8088/for_you_list").then(res => res)
  );

  return (
    <div ref={wrapRef} className="container">
      <Header />
      <ShortsPlayer
        shortsData={data?.data?.items ?? []}
        screenHeight={wrapRef?.current?.clientHeight ?? 0}
      />
      <Footer />
    </div>
  );
}

export default App;
