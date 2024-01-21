import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "./useStore";

function actionByKey(key) {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };

  return keyActionMap[key];
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const { resetWorld, saveWorld } = useStore((state) => {
    return {
      resetWorld: state.resetWorld,
      saveWorld: state.saveWorld,
    };
  });

  const shiftPressedRef = useRef(false);

  const handleKeyDown = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return { ...prev, [action]: true };
      });
    }

    if (e.code === "KeyR" && shiftPressedRef.current) {
      resetWorld();

      return;
    }

    if (e.code === "KeyQ" && shiftPressedRef.current) {
      saveWorld();

      return;
    }

    if (e.shiftKey) {
      shiftPressedRef.current = true;

      return;
    }

    shiftPressedRef.current = false;
  }, []);

  const handleKeyUp = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return { ...prev, [action]: false };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return actions;
};
