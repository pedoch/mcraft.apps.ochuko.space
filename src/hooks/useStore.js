import { nanoid } from "nanoid";
import create from "zustand";

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalStorage = (key, value) => {
  return window.localStorage.setItem(key, JSON.stringify(value));
};

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        { key: nanoid(), position: [x, y, z], texture: state.texture },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes.filter((cube) => {
          const [cubeX, cubeY, cubeZ] = cube.position;
          return cubeX !== x || cubeY !== y || cubeZ !== z;
        }),
      ],
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((state) => {
      setLocalStorage("cubes", state.cubes);
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
