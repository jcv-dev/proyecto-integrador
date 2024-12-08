/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: takeboncog (https://sketchfab.com/takeboncog)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/box-of-matches-north-korea-1955-3c7c74da06a1428fbf0845000b575a19
Title: Box of matches (North Korea 1955)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/matches.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.matches001_Material003_0.geometry}
        material={materials['Material.003']}
        position={[-247.843, 75.743, -146.177]}
        rotation={[-1.572, 0, 0.027]}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/models/matches.glb')
