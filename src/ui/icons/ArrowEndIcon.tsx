import { ArrowEndType } from "../../types/Cartography.type";

function ArrowEndIcon({
  arrow,
  flip,
}: {
  arrow: ArrowEndType;
  flip?: boolean;
}) {
  if (arrow === "arrow-closed") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 12"
        fill="none"
        style={
          flip
            ? {
                transform: "rotate(180deg)",
              }
            : {}
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L10 11.7735V0.226497L20 6ZM11 7H0V5H11V7Z"
          fill="#44403C"
        />
      </svg>
    );
  }

  if (arrow === "arrow") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 21 16"
        fill="none"
        style={
          flip
            ? {
                transform: "rotate(180deg)",
              }
            : {}
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L14.3431 15.0711C13.9526 15.4616 13.3195 15.4616 12.9289 15.0711C12.5384 14.6805 12.5384 14.0474 12.9289 13.6569L18.5858 8L12.9289 2.34315C12.5384 1.95262 12.5384 1.31946 12.9289 0.928932C13.3195 0.538408 13.9526 0.538408 14.3431 0.928932L20.7071 7.29289ZM20 9H0V7H20V9Z"
          fill="#44403C"
        />
      </svg>
    );
  }

  if (arrow === "circle") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 15 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={
          flip
            ? {
                transform: "rotate(180deg)",
              }
            : {}
        }
      >
        <path
          d="M15 4C15 6.20914 13.2091 8 11 8C8.79086 8 7 6.20914 7 4C7 1.79086 8.79086 0 11 0C13.2091 0 15 1.79086 15 4Z"
          fill="#44403C"
        />
        <line y1="4" x2="13" y2="4" stroke="#44403C" strokeWidth="2" />
      </svg>
    );
  }

  if (arrow === "rect") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 15 8"
        fill="none"
        style={
          flip
            ? {
                transform: "rotate(180deg)",
              }
            : {}
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="7" width="8" height="8" fill="#44403C" />
        <line y1="4" x2="13" y2="4" stroke="#44403C" strokeWidth="2" />
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
export default ArrowEndIcon;
