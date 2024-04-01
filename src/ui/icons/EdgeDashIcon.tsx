import { EdgeDashType } from "../../types/Cartography.type";

function EdgeDashIcon({ dash }: { dash: EdgeDashType }) {
  if (dash === "light") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          y1="2.16608"
          x2="32"
          y2="2.16608"
          stroke="#44403C"
          strokeWidth="3"
          strokeDasharray="4 3"
        />
      </svg>
    );
  }
  if (dash === "medium") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1.5"
          y1="2.16608"
          x2="30.5"
          y2="2.16608"
          stroke="#44403C"
          strokeWidth="3"
          strokeLinecap="square"
          strokeDasharray="6 6"
        />
      </svg>
    );
  }

  if (dash === "large") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1.5"
          y1="2.16608"
          x2="30.5"
          y2="2.16608"
          stroke="#44403C"
          strokeWidth="3"
          strokeLinecap="square"
          strokeDasharray="7 12"
        />
      </svg>
    );
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 32 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="2.16608"
        x2="32"
        y2="2.16608"
        stroke="#44403C"
        strokeWidth="3"
      />
    </svg>
  );
}

export default EdgeDashIcon;
