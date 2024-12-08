import {
  EffectComposer,
  LensFlare,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const PostProcessing = () => {
  return (
    <EffectComposer>
      <Vignette
        offset={0.5}
        darkness={0.6}
        eskill={false}
        blendFunction={BlendFunction.DARKEN}
      />
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={1}/>
    </EffectComposer>
  );
};

export default PostProcessing;
