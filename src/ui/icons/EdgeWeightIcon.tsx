import { EdgeWeightType } from "../../types/Cartography.type";

function EdgeWeightIcon({ weight }: { weight: EdgeWeightType }) {
  
  if (weight === "bold") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="4" x2="20" y2="4" stroke="#44403C" strokeWidth="8" />
      </svg>
    );
  }

  if (weight === "medium") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="2" x2="20" y2="2" stroke="#44403C" strokeWidth="4" />
      </svg>
    );
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="1" x2="20" y2="1" stroke="#44403C" strokeWidth="2" />
    </svg>
  );
}

export default EdgeWeightIcon;
