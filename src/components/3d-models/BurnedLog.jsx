import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useCallback, useRef } from "react";

export default function BurnedLog(props) {
  const { nodes, materials } = useGLTF("models/burned_log.glb");
  const logRef = useRef();

  const handleClick = useCallback((event) => {
    // The event contains the clicked point and object
    const clickPoint = event.point; // Position of the click
    const logPosition = logRef.current.translation(); // Position of the log

    // Compute impulse direction (log to click)
    const impulseDirection = {
      x: logPosition.x - clickPoint.x,
      y: logPosition.y - clickPoint.y,
      z: logPosition.z - clickPoint.z,
    };

    // Normalize the direction
    const magnitude = Math.sqrt(
      impulseDirection.x ** 2 +
        impulseDirection.y ** 2 +
        impulseDirection.z ** 2
    );
    impulseDirection.x /= magnitude;
    impulseDirection.y /= magnitude;
    impulseDirection.z /= magnitude;

    // Apply impulse
    const impulseStrength = 250;
    impulseDirection.x *= impulseStrength;
    impulseDirection.y *= impulseStrength;
    impulseDirection.z *= impulseStrength;

    logRef.current.applyImpulse(impulseDirection, true);
  }, []);

  return (
    <RigidBody
      ref={logRef}
      onClick={handleClick} // Use the event-based click handler
      mass={0.5}
      type="dynamic"
      colliders="hull"
    >
      <group {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="59ecbd49511a40ce8b17a143257fe15dobjcleanermaterialmergergles">
              <mesh
                name="Object_2"
                castShadow
                receiveShadow
                geometry={nodes.Object_2.geometry}
                material={materials.lambert4SG}
              />
            </group>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("models/burned_log.glb");
