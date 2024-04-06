import { findDash } from "../../features/cartography/CartographyConstants";
import MarkersCustomToolbar from "../../features/cartography/MarkersCustomToolbar";
import { ArrowEndType, EdgeCategoryType, EdgeDashType } from "../../types/Cartography.type";

function EdgeIcon({
  edgeCategory,
  fill,
  markerStart,
  markerEnd,
  edgeDash
}: {
  edgeCategory: EdgeCategoryType;
  fill: string;
  markerStart: ArrowEndType;
  markerEnd: ArrowEndType;
  edgeDash: EdgeDashType
}) {

  const dash = findDash(edgeDash)

  if (edgeCategory === "smooth-step") {
    return (
      <svg
        width="62"
        height="62"
        viewBox="0 0 62 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <MarkersCustomToolbar fill={fill} />
        <path
          d="M12 49L28.9411 48.966C29.6396 48.966 30.4778 48.966 30.4778 47.6139C30.4778 45.1159 30.3871 24.8776 30.3871 15.7551C30.3048 14.8367 30.5598 13 32.2377 13C33.9157 13 44.8593 13 50 13"
          stroke={fill}
          stroke-width="2.8"
          strokeDasharray={dash.dashStyleMenu}
          markerEnd={`url(#${markerEnd}-${fill})`}
          markerStart={`url(#${markerStart}-${fill})`}
        />
      </svg>
    );
  }

  if (edgeCategory === "bezier") {
    return (
      <svg
        width="62"
        height="62"
        viewBox="0 0 62 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <MarkersCustomToolbar fill={fill} />
        <path
          d="M49.8653 13.3843L41.0326 13.4189C36.647 13.4361 32.9123 16.6119 32.1906 20.9378L30.7614 29.5038L29.3374 39.6591C28.5718 45.1187 23.8828 49.1684 18.3699 49.1313L12.6839 49.093"
          stroke={fill}
          stroke-width="2.8"
          stroke-linejoin="bevel"
          strokeDasharray={dash.dashStyleMenu}
          markerEnd={`url(#${markerStart}-${fill})`}
          markerStart={`url(#${markerEnd}-${fill})`}
        />
      </svg>
    );
  }

  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <MarkersCustomToolbar fill={fill} />
      <line
        x1="11.2929"
        y1="49.2929"
        x2="49.2929"
        y2="11.2929"
        stroke={fill}
        stroke-width="2.8"
        strokeDasharray={dash.dashStyleMenu}
        markerEnd={`url(#${markerEnd}-${fill})`}
        markerStart={`url(#${markerStart}-${fill})`}
      />
    </svg>
  );
}

export default EdgeIcon;
