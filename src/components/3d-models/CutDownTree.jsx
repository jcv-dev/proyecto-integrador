import React, { useRef } from "react";
import { Texture, useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function CutDownTree(props) {
  const { nodes, materials } = useGLTF("/models/cut-down-tree.glb");
  const texture = useLoader(TextureLoader, 'materials/trees/cut-down-tree.png')

  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.453}
        >
          <group
            name="49ec9fea3af9403fa3a6e433f3e91e2dfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="RootNode">
              <group
                name="Cylinder"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 28.479]}
              >
                <mesh
                  name="Cylinder_Material002_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_Material002_0.geometry}
                  material={materials["Material.002"]}
               
                >
                  <meshStandardMaterial map={texture} />
                </mesh>
              </group>
              <group
                name="Cylinder001"
                position={[-14.86, 52.407, -105.789]}
                rotation={[-2.577, 0, Math.PI]}
                scale={[-10.392, 11.571, 31.282]}
              >
                <mesh
                  name="Cylinder001_Material003_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder001_Material003_0.geometry}
                  material={materials["Material.003"]}
                  
                >
                  <meshStandardMaterial map={texture} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/cut-down-tree.glb");
