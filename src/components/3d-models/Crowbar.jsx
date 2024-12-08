/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Saucy (https://sketchfab.com/saucy)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/crowbar-low-poly-b562b989f1084ae1a286e6aaa34456ae
Title: Crowbar (Low-poly)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/crowbar.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Crowbar_LOD0_Texture_0.geometry}
          material={materials.Texture}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/crowbar.glb')
