import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ControlMenu } from "./components/ControlMenu";
import { Cubes } from "./components/Cubes";
import { FPV } from "./components/FPV";
import { Ground } from "./components/Ground";
import { NoMobile } from "./components/NoMobile";
import { Player } from "./components/Player";

function App() {
  return (
    <>
      <NoMobile />
      <ControlMenu />
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div
        className="absolute centred cursor"
        style={{ fontSize: "3rem" }}
      >
        +
      </div>
    </>
  );
}

export default App;
