
function PenColorIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_633_366)">
        <g clip-path="url(#clip0_633_366)">
          <rect x="1" width="20" height="20" rx="2" fill="#FAFAF9" />
          <path d="M19 16H3V18H19V16Z" fill={fill} />
          <path
            d="M5.07031 14.1484C5.46615 14.1484 5.73177 14.0964 5.86719 13.9922C6.07552 13.8307 6.25781 13.5625 6.41406 13.1875H6.40625L10.3125 3.04688C10.6042 3.04688 10.8854 3.0026 11.1562 2.91406C11.4271 2.82552 11.5964 2.75781 11.6641 2.71094L15.2734 12.3828C15.5547 13.2005 15.8646 13.7448 16.2031 14.0156C16.3073 14.099 16.4036 14.1406 16.4922 14.1406C16.7526 14.1406 16.9609 14.0911 17.1172 13.9922L16.9453 15H12.2969L12.4141 14.1406C13.2943 14.1562 13.7708 13.9896 13.8438 13.6406C13.8698 13.5365 13.8698 13.4219 13.8438 13.2969L12.8438 10.6484H8.67188L7.67188 13.5078C7.57292 13.7474 7.63021 13.9375 7.84375 14.0781C7.90104 14.1198 8.00781 14.1406 8.16406 14.1406C8.32552 14.1406 8.46354 14.1354 8.57812 14.125C8.85938 14.1094 9.06771 14.0755 9.20312 14.0234L9.07812 15H4.96875L5.07031 14.1484ZM12.4844 9.6875L10.6875 4.91406L9.00781 9.6875H12.4844Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_633_366"
          x="0"
          y="0"
          width="22"
          height="22"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
        <clipPath id="clip0_633_366">
          <rect x="1" width="20" height="20" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PenColorIcon;
