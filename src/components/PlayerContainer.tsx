import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { GetListResponse } from "../App";

export const PlayerContainer = ({
  resource,
  index,
  setCurrentVideo,
}: {
  resource: GetListResponse;
  index: number;
  setCurrentVideo: (currentVideo: number) => void;
}) => {
  const { title, cover, play_url } = resource;

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentProcess, setCurrentProcess] = useState(0);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setPlaying(true);
            setCurrentVideo(index);
          } else {
            setPlaying(false);
          }
        });
      },
      { threshold: 0.1 } // 设置一个适当的阈值，表示元素可见的比例
    );

    if (containerRef.current) {
      observer.observe(containerRef?.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef?.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id={`video${index}`}
      className="w-screen h-screen relative bg-black"
    >
      <div className="h-screen relative flex justify-center items-center">
        <div className="relative w-screen max-w-[550px] pt-[177%]">
          <ReactPlayer
            ref={playerRef}
            playing={playing}
            loop
            muted={muted}
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            onPlay={() => {
              if (!playerRef?.current) return;
              playerRef?.current?.seekTo(currentPlayTime, "seconds");
            }}
            onProgress={({ played, playedSeconds }) => {
              setCurrentProcess(played);
              setCurrentPlayTime(playedSeconds);
            }}
            url={play_url}
            config={{ file: { forceHLS: true, forceSafariHLS: true } }}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 bg-black px-4 py-2 rounded-md w-full">
        <div className="text-white">{title}</div>
        <input
          type="range"
          value={currentProcess * 100}
          onChange={e => {
            if (!playerRef?.current) return;
            playerRef?.current?.seekTo(
              Number(e.target.value) / 100,
              "fraction"
            );
          }}
          min={0}
          max={100}
          step={0.1}
          className="w-full accent-red-500 h-0.5"
        />
      </div>
    </div>
  );
};

export default PlayerContainer;
