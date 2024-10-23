import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Tree(props) {
  const { nodes, materials } = useGLTF("/models/tree-1.glb");
  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cylinder_0" position={[0, 1.065, -0.194]}>
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group
                name="Cylinder001_1"
                position={[0, 2.395, -0.082]}
                scale={[1.608, 0.925, 1.608]}
              >
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group
                name="Cylinder002_2"
                position={[0, 3.51, 0]}
                rotation={[0.254, -1.413, 0.186]}
                scale={[1.681, 0.966, 1.681]}
              >
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group
                name="Cylinder003_3"
                position={[0.068, 4.291, 0]}
                rotation={[-2.174, -1.482, -2.163]}
                scale={[1.433, 0.824, 1.433]}
              >
                <mesh
                  name="Object_10"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_10.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group
                name="Cylinder004_4"
                position={[-0.024, 5.219, 0]}
                rotation={[3.122, -0.542, 3.072]}
                scale={[1.31, 0.753, 1.31]}
              >
                <mesh
                  name="Object_12"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_12.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group
                name="Cylinder005_5"
                position={[-0.097, 5.948, 0]}
                rotation={[3.124, 0.125, 3.084]}
                scale={[1.13, 0.756, 1.129]}
              >
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials["Material.001"]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/tree-1.glb");
