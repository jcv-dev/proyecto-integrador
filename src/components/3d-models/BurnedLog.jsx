import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function BurnedLog(props) {
  const { nodes, materials } = useGLTF("models/burned_log.glb");
  return (
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
  );
}

useGLTF.preload("models/burned_log.glb");
