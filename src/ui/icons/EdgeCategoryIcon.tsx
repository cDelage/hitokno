import { EdgeCategoryType } from "../../types/Cartography.type";

function EdgeCategoryIcon({
  edgeCategory,
}: {
  edgeCategory: EdgeCategoryType;
}) {
  if (edgeCategory === "smooth-step") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 1L10.7351 1.01511C10.3675 1.01511 9.92628 1.01511 9.92628 1.61604C9.92628 2.72625 9.97403 11.7211 9.97403 15.7755C10.0173 16.1837 9.88312 17 9 17C8.11688 17 2.70563 17 0 17"
          stroke="#44403C"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (edgeCategory === "bezier") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 21 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.999924 18.0001V18.0001C4.05768 17.1954 6.70889 15.2864 8.44168 12.6416L10.4999 9.50008L12.5582 6.35854C14.291 3.71376 16.9422 1.80475 19.9999 1.00008V1.00008"
          stroke="#44403C"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1.33321"
        y1="18.2548"
        x2="20.3332"
        y2="1.25476"
        stroke="#44403C"
        strokeWidth="2"
      />
    </svg>
  );
}

export default EdgeCategoryIcon;
