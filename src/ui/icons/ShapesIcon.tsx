function ShapesIcon(): JSX.Element {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_558_928)">
        <circle cx="14" cy="13" r="5.5" fill="white" stroke="#44403C" />
        <path
          d="M7.93965 0.86145L12.7607 9.76186C12.9412 10.095 12.6999 10.5 12.3211 10.5H2.67895C2.30006 10.5 2.05884 10.095 2.2393 9.76186L7.06035 0.861451C7.24947 0.512305 7.75053 0.512306 7.93965 0.86145Z"
          fill="white"
          stroke="#44403C"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_558_928"
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
            result="effect1_dropShadow_558_928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_558_928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default ShapesIcon;
