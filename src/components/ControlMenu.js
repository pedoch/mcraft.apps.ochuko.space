import { useEffect } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const ControlMenu = () => {
  const { activeTexture, setTexture } = useStore((state) => {
    return {
      activeTexture: state.texture,
      setTexture: state.setTexture,
    };
  });

  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };

    const pressedTexture = Object.entries(textures).find(
      (value) => value[1] === true
    );

    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [dirt, grass, glass, wood, log]);

  return (
    <div
      className="fixed h-full w-full flex flex-col justify-between"
      style={{ zIndex: 10, padding: "1rem" }}
    >
      <div className="flex justify-between w-full">
        <p>Click to trap the mouse. Press ESCAPE to free mouse</p>
        <p>
          SHIFT + Q to <strong>save</strong> world. SHIFT + R to{" "}
          <strong>reset</strong> world
        </p>
      </div>
      <div className="flex justify-between">
        <div
          className="flex justify-between"
          style={{ width: "min-content" }}
        >
          <div className="flex flex-col items-center move-btn-container">
            <p className="move-btn">W ↑</p>
            <div className="flex move-btn-container">
              <p className="move-btn">← A</p>
              <p className="move-btn">S ↓</p>
              <p className="move-btn">D →</p>
            </div>
            <p className="w-full move-btn justify-center">Space (Jump)</p>
          </div>
        </div>
        <div
          className="texture-selector"
          style={{ marginTop: "auto" }}
        >
          {Object.entries(images).map(([key, source], index) => {
            return (
              <div
                key={key}
                style={{ position: "relative" }}
              >
                <img
                  src={source}
                  alt={key}
                  className={`${activeTexture === key ? "active" : ""}`}
                />
                <p
                  className="absolute"
                  style={{
                    top: "20%",
                    left: "35%",
                    fontSize: "0.5rem",
                  }}
                >
                  {index + 1}
                </p>
              </div>
            );
          })}
        </div>
        <div
          className="flex flex-col"
          style={{ marginTop: "auto" }}
        >
          <p>After mouse is trapped</p>
          <p>Click to add a block</p>
          <p>ALT + click to remove a block</p>
        </div>
      </div>
    </div>
  );
};
