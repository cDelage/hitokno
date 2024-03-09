
function HighlightColorIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_630_304)">
        <rect x="1" width="20" height="20" rx="2" fill="#F5F5F4" />
        <path
          d="M17.5301 4.86963L14.8789 2.21991C14.7391 2.0799 14.5496 2.00085 14.3518 2.00001C14.154 1.99916 13.9638 2.0766 13.8229 2.21541L7.32197 8.61507C7.22063 8.71537 7.14967 8.84223 7.11722 8.98107L6.34923 12.3088L5 14H7.12097L7.97746 13.1533L10.6684 12.5323C10.8034 12.5008 10.9272 12.4325 11.0262 12.3358L17.5263 5.93461C17.5969 5.86514 17.653 5.78239 17.6914 5.69113C17.7298 5.59987 17.7497 5.50191 17.75 5.4029C17.7504 5.30389 17.7311 5.2058 17.6934 5.11427C17.6556 5.02274 17.6001 4.9396 17.5301 4.86963ZM10.5034 10.7443L8.9127 9.15432L14.3449 3.80614L15.9348 5.39612L10.5034 10.7443Z"
          fill="black"
        />
        <path
          d="M10.5 10.75L8.90991 9.15999L14.35 3.79999L15.95 5.4L10.5 10.75Z"
          fill={fill}
        />
        <path d="M5 14L6.35 12.3L7.97 13.16L7.12 14H5Z" fill={fill} />
        <path d="M19 16H3V18H19V16Z" fill={fill} />
      </g>
      <defs>
        <filter
          id="filter0_d_630_304"
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
            result="effect1_dropShadow_630_304"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_630_304"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default HighlightColorIcon;
