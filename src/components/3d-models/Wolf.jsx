import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Wolf(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/wolf.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play animation
    const action = actions["04_Idle_Armature_0"];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }

    return () => {
      if (action) action.fadeOut(0.5).stop();
    };
  }, [actions]);

  return (
    <RigidBody colliders="cuboid" type="dynamic" args={[2, 2, 1]}>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Armature_0">
            <skinnedMesh
              name="Wolf1_Material__wolf_col_tga_0"
              geometry={nodes.Wolf1_Material__wolf_col_tga_0.geometry}
              material={materials.Wolf_1}
              skeleton={nodes.Wolf1_Material__wolf_col_tga_0.skeleton}
            />
            <skinnedMesh
              name="Wolf2_fur__fella3_jpg_001_0"
              geometry={nodes.Wolf2_fur__fella3_jpg_001_0.geometry}
              material={materials.Wolf_Fur}
              skeleton={nodes.Wolf2_fur__fella3_jpg_001_0.skeleton}
            />
            <skinnedMesh
              name="Wolf3_claws_0"
              geometry={nodes.Wolf3_claws_0.geometry}
              material={materials.Wolf_claws}
              skeleton={nodes.Wolf3_claws_0.skeleton}
            />
            <skinnedMesh
              name="Wolf3_eyes_0"
              geometry={nodes.Wolf3_eyes_0.geometry}
              material={materials["Wolf Eyes"]}
              skeleton={nodes.Wolf3_eyes_0.skeleton}
            />
            <skinnedMesh
              name="Wolf3_teeth"
              geometry={nodes.Wolf3_teeth.geometry}
              material={materials["Wolf Teeth"]}
              skeleton={nodes.Wolf3_teeth.skeleton}
            />
            <primitive object={nodes._rootJoint} />
          </group>
          <group
            name="Sun"
            position={[0.553, 1.181, 0.892]}
            rotation={[0.43, -0.322, -0.522]}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models/wolf.glb");
