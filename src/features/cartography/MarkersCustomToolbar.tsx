import { memo } from "react";

const MarkersCustomToolbar = memo(function MarkersCustomToolbar({
  fill,
}: {
  fill: string;
}) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker
          id={`arrow-closed-${fill}`}
          viewBox="0 0 5 6"
          refX="2.5"
          refY="3"
          markerUnits="strokeWidth"
          markerWidth="5"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M4.25 2.56699C4.58333 2.75944 4.58333 3.24056 4.25 3.43301L1.25 5.16506C0.916666 5.35751 0.5 5.11695 0.5 4.73205V1.26795C0.5 0.883049 0.916666 0.642486 1.25 0.834936L4.25 2.56699Z"
            fill={fill}
          />
        </marker>

        <marker
          id={`arrow-${fill}`}
          viewBox="0 0 5 8"
          refX="4"
          refY="4"
          markerUnits="strokeWidth"
          markerWidth="5"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            fill={fill}
            d="M4.55357 3.64645C4.74883 3.84171 4.74883 4.15829 4.55357 4.35355L1.37159 7.53553C1.17632 7.7308 0.85974 7.7308 0.664478 7.53553C0.469216 7.34027 0.469216 7.02369 0.664478 6.82843L3.49291 4L0.664478 1.17157C0.469216 0.976311 0.469216 0.659728 0.664478 0.464466C0.85974 0.269204 1.17632 0.269204 1.37159 0.464466L4.55357 3.64645ZM4.20001 4.5H4.00001V3.5H4.20001V4.5Z"
          />
        </marker>

        <marker
          id={`circle-${fill}`}
          viewBox="0 0 4 4"
          refX="2"
          refY="2"
          markerUnits="strokeWidth"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <circle cx="2" cy="2" r="2" fill={fill} />
        </marker>

        <marker
          id={`rect-${fill}`}
          viewBox="0 0 4 4"
          refX="2"
          refY="2"
          markerUnits="strokeWidth"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <rect width="4" height="4" fill={fill} />
        </marker>
      </defs>
    </svg>
  );
});

export default MarkersCustomToolbar;
