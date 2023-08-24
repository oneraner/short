import { GetListResponse } from "../App";
import PlayerContainer from "./PlayerContainer";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState } from "react";

gsap.registerPlugin(Draggable, ScrollToPlugin);

export const ShortsPlayer = ({
  shortsData = [],
  screenHeight,
}: {
  shortsData: GetListResponse[];
  screenHeight: number;
}) => {
  const testRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  const scrollTo = () => {
    gsap.to(".wrap", {
      scrollTo: `#video${currentVideo}`,
      ease: "sine",
      duration: 1,
    });
  };

  const updateDraggable = () => {
    scrollTo();
  };
  const updateProgress = () => {
    scrollTo();
  };
  Draggable.create(".play", {
    type: "y",
    edgeResistance: 0.65,
    bounds: ".container",
    lockAxis: true,
    inertia: true,
    onPress: updateDraggable,
    onDrag: updateProgress,
    onThrowUpdate: updateProgress,
    minimumMovement: 10,
    snap: {
      y: function (endValue) {
        return Math.round(endValue / screenHeight) * screenHeight;
      },
    },
  });

  return (
    <div
      className="wrap flex flex-col h-[calc(100dvh_-_96px)] overflow-scroll bg-black"
      ref={testRef}
    >
      <div className="play">
        {shortsData.map((resource: GetListResponse, index) => (
          <PlayerContainer
            key={resource.title}
            resource={resource}
            index={index}
            setCurrentVideo={setCurrentVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortsPlayer;
