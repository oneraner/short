import { useRef } from "react";
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

  const testShortData = Array.from({ length: 10 }, (_, index) => ({
    title: `Test video ${index}`,
    cover: "https://picsum.photos/200",
    play_url: "https://livedoc.cgtn.com/500d/prog_index.m3u8",
  }));

  return (
    <div ref={wrapRef} className="container">
      <Header />
      <ShortsPlayer
        shortsData={testShortData}
        screenHeight={wrapRef?.current?.clientHeight ?? 0}
      />
      <Footer />
    </div>
  );
}

export default App;
