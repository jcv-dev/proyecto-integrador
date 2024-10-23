import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function TreeStump(props) {
  const { nodes, materials } = useGLTF('/models/tree-stump.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, -Math.PI]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="_2">
                <group name="circle_0" position={[0.034, 0.279, -0.099]} rotation={[0, -0.087, 0]}>
                  <mesh
                    name="Object_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.material_0}
                  />
                </group>
                <group
                  name="cylinder_1"
                  position={[-0.438, 0.236, -0.563]}
                  rotation={[-0.283, 1.254, 0.182]}>
                  <mesh
                    name="Object_7"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials.material_1}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/tree-stump.glb')
