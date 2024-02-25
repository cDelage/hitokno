import { Theme } from "../../types/Cartography.type";

function PenColorIcon({theme} : {theme : Theme}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_633_366)">
        <rect x="1" width="20" height="20" rx="2" fill={"#F5F5F4"} />
        <path d="M19 16H3V18H19V16Z" fill={theme.fill} />
        <path
          d="M17.5126 5.67171C17.827 5.35733 18 4.93983 18 4.49571C18 4.05159 17.827 3.63409 17.5126 3.31972L16.1936 2.00067C15.8792 1.6863 15.4617 1.51331 15.0176 1.51331C14.5735 1.51331 14.156 1.6863 13.8424 1.99984L5 10.8148V14.4867H8.67021L17.5126 5.67171ZM15.0176 3.17667L16.3375 4.49488L15.0151 5.81226L13.6961 4.49405L15.0176 3.17667ZM6.66336 12.8233V11.5051L12.5184 5.66838L13.8374 6.98743L7.98324 12.8233H6.66336Z"
          fill={"#44403C"}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_633_366"
          x="0"
          y="0"
          width="22"
          height="22"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_633_366"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_633_366"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default PenColorIcon;
