import { useVideoTexture } from "@react-three/drei";
import { useCallback } from "react";
import { useState } from "react";

const Video = ({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) => {
  const video = useVideoTexture(path, {
    start: false,
    loop: true,
    muted: false,
  });
  const [pause, setPause] = useState(true);

  const handleVideo = useCallback(
    (e) => {
      e.stopPropagation();
      pause ? video.image.play() : video.image.pause();
      setPause(!pause);
    },
    [pause, setPause, video]
  );

  return (
    <mesh
      onClick={handleVideo}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <planeGeometry args={[2, 1]} />
      <meshBasicMaterial map={video} toneMapped={false} />
    </mesh>
  );
};

export default Video;
