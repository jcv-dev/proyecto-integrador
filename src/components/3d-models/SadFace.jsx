/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Janice Emmons 1990-present (https://sketchfab.com/JaniceEmmons1990)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/sad-face-3ea8768767994723abf31eca8b0d9fcb
Title: Sad Face
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/sad_face.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.25}>
        <group position={[0, 5.629, 0]} scale={[13.284, 11.258, 13.284]}>
          <group
            position={[0.038, -0.066, -0.002]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.415, 0.351, 0.351]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials.Material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials["Material.000"]}
            />
          </group>
          <group
            position={[0.005, 0.148, -0.002]}
            scale={[0.121, 0.453, 0.384]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_14.geometry}
              material={materials["Material.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_15.geometry}
              material={materials["Material.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_16.geometry}
              material={materials["Material.002"]}
            />
          </group>
          <group
            position={[-0.06, 0.019, -0.134]}
            scale={[0.033, 0.087, 0.082]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_21.geometry}
              material={materials["Material.004"]}
              scale={0.457}
            />
          </group>
          <group position={[-0.06, 0.019, 0.147]} scale={[0.033, 0.087, 0.069]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_24.geometry}
              material={materials["Material.004"]}
              scale={0.457}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_4.geometry}
            material={materials["Material.013"]}
            position={[-0.013, -0.201, 0.001]}
            scale={[0.333, 0.393, 0.457]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_7.geometry}
            material={materials.material_0}
            position={[-0.286, -0.137, -0.002]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
            scale={[1.409, 1.586, 1.55]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_28.geometry}
          material={materials["Material.009"]}
          position={[0, -0.001, 0]}
          scale={10.237}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material_0}
        position={[0.608, 5.706, -6.289]}
        rotation={[0, 0, -Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.material_0}
        position={[0, 5.303, -6.815]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={3.225}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_30.geometry}
        material={materials.material_0}
        position={[0.608, 2.526, -3.087]}
        rotation={[0, 0, -Math.PI / 2]}
      />
    </group>
  );
}

useGLTF.preload("/models/sad_face.glb");
