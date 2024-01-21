import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube";

export const Cubes = () => {
  const { cubes } = useStore((state) => {
    return {
      cubes: state.cubes,
    };
  });

  return cubes.map((cube) => (
    <Cube
      key={cube.key}
      position={cube.position}
      texture={cube.texture}
    />
  ));
};
