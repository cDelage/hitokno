import { HelperLine } from "../../types/Cartography.type";

export const topHelperLine: HelperLine = {
  position: {
    top: 0,
    left: 0,
    transform: "translate(-50%,-100%)",
  },
  width: 5000,
  height: 2,
  id: "top",
};

export const leftHelperLine: HelperLine = {
  position: {
    top: 0,
    left: 0,
    transform: "translate(-100%,-50%)",
  },
  width: 2,
  height: 5000,
  id: "top",
};

export const rightHelperLine: HelperLine = {
  position: {
    top: 0,
    right: 0,
    transform: "translate(100%,-50%)",
  },
  width: 2,
  height: 5000,
  id: "top",
};

export const bottomHelperLine: HelperLine = {
  position: {
    bottom: 0,
    left: 0,
    transform: "translate(-50%,100%)",
  },
  width: 5000,
  height: 2,
  id: "top",
};

export const centerXHelperLine: HelperLine = {
  position: {
    top: 0,
    left: "50%",
    transform: "translate(100%,-50%)",
  },
  width: 2,
  height: 5000,
  id: "top",
};

export const centerYHelperLine: HelperLine = {
  position: {
    top: "50%",
    left: 0,
    transform: "translate(-50%,100%)",
  },
  width: 5000,
  height: 2,
  id: "top",
};
