import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function Floor(props) {
  return (
    <RigidBody type="fixed" {...props}>
      {/* Invisible collider */}
      <mesh receiveShadow>
        <boxGeometry args={[150, 1, 150]} />
        <meshStandardMaterial color="white" transparent={true} opacity={0} />
      </mesh>
    </RigidBody>
  );
}
