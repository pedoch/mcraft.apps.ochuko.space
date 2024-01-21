import { usePlane } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import { groundTexture } from "../images/textures";

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const { addCube } = useStore((state) => {
    return {
      addCube: state.addCube,
    };
  });

  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();

        const [x, y, z] = Object.values(e.point);

        addCube(Math.ceil(x), Math.ceil(y), Math.ceil(z));
      }}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[100, 100]}
      />
      <meshStandardMaterial
        attach="material"
        map={groundTexture}
      />
    </mesh>
  );
};
