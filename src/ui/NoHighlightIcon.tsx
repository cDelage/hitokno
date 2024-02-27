function NoHighlightIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_649_305)">
        <rect x="1" width="20" height="20" rx="2" fill="#FAFAF9" />
        <path
          d="M11 3.33333C7.32404 3.33333 4.33337 6.32399 4.33337 9.99999C4.33337 13.676 7.32404 16.6667 11 16.6667C14.676 16.6667 17.6667 13.676 17.6667 9.99999C17.6667 6.32399 14.676 3.33333 11 3.33333ZM5.66671 9.99999C5.66671 8.76933 6.08937 7.63866 6.79204 6.73533L14.2647 14.208C13.3327 14.9372 12.1834 15.3334 11 15.3333C8.05937 15.3333 5.66671 12.9407 5.66671 9.99999ZM15.208 13.2647L7.73537 5.79199C8.66741 5.06286 9.81669 4.6667 11 4.66666C13.9407 4.66666 16.3334 7.05933 16.3334 9.99999C16.333 11.1833 15.9369 12.3325 15.208 13.2647Z"
          fill="#44403C"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_649_305"
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
            result="effect1_dropShadow_649_305"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_649_305"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default NoHighlightIcon;
