import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { GetListResponse } from "../App";
import {
  BsVolumeMuteFill,
  BsVolumeDownFill,
  BsPlayFill,
  BsPauseFill,
} from "react-icons/bs";

export const PlayerContainer = ({
  resource,
  index,
  muted,
  setCurrentVideo,
  setMuted,
}: {
  resource: GetListResponse;
  index: number;
  muted: boolean;
  setCurrentVideo: (currentVideo: number) => void;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { title, cover, play_url } = resource;

  const [playing, setPlaying] = useState(false);

  const [currentProcess, setCurrentProcess] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer | null>(null);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentVideo(index);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setPlaying(true);
          } else {
            setPlaying(false);
          }
        });
      },
      { threshold: 0.55 } // 设置一个适当的阈值，表示元素可见的比例
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
      className="w-full h-[calc(100dvh_-_96px)] relative bg-black"
    >
      <div className="w-full h-[calc(100dvh_-_96px)] relative flex justify-center items-center">
        <div className="relative w-full max-w-[550px] pt-[177%]">
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
              playerRef?.current?.seekTo(currentProcess, "fraction");
            }}
            onProgress={({ played }) => {
              setCurrentProcess(played);
            }}
            url={play_url}
            config={{
              file: {
                forceHLS: !isSafari,
                forceVideo: true,
                attributes: {
                  poster: cover && cover,
                  disablePictureInPicture: true,
                },
              },
            }}
          />
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <button onClick={() => setMuted(pre => !pre)}>
          {muted ? (
            <BsVolumeMuteFill className="text-white h-16 w-16" />
          ) : (
            <BsVolumeDownFill className="text-white h-16 w-16" />
          )}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 z-10 bg-black px-4 py-2 rounded-md w-full">
        <div className="text-white flex items-center">
          <span className="mr-4">{title}</span>
          <button onClick={() => setPlaying(pre => !pre)}>
            {playing ? (
              <BsPauseFill className="text-white h-10 w-10" />
            ) : (
              <BsPlayFill className="text-white h-10 w-10" />
            )}
          </button>
        </div>
        <input
          type="range"
          value={currentProcess * 100}
          onChange={e => {
            if (!playerRef?.current) return;
            const currentProcess = Number(e.target.value) / 100;
            playerRef?.current?.seekTo(currentProcess, "fraction");
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
