import styled from "styled-components";
import { SheetToolbarMode } from "../../types/Cartography.type";

const SheetIconStyled = styled.svg`
  transition: 200ms ease-in all;
`

function SheetIcon({
  mode,
}: {
  mode: SheetToolbarMode;
}): JSX.Element {
  return (
    <SheetIconStyled
      width="100%"
      height="100%"
      viewBox="0 0 33 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {mode === "CREATE" && (
        <>
          <g filter="url(#filter0_d_624_304)">
            <g clipPath="url(#clip0_624_304)">
              <rect x="1" width="31" height="20" rx="2" fill="#BAE6FD" />
              <g filter="url(#filter1_d_624_304)">
                <path d="M3 1H18V19H3V1Z" fill="white" />
              </g>
              <ellipse
                cx="5.67855"
                cy="3.5"
                rx="1.60714"
                ry="1.5"
                fill="#BAE6FD"
              />
              <ellipse
                cx="15.3214"
                cy="3.5"
                rx="1.60714"
                ry="1.5"
                fill="#BAE6FD"
              />
              <rect
                x="5.14288"
                y="9"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <rect
                x="5.14288"
                y="12"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <rect
                x="5.14288"
                y="15"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <rect x="20" y="9" width="10" height="2" fill="#44403C" />
              <rect x="24" y="5" width="2" height="10" fill="#44403C" />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_624_304"
              x="0"
              y="0"
              width="33"
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
                result="effect1_dropShadow_624_304"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_624_304"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_624_304"
              x="2"
              y="1"
              width="17"
              height="20"
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
                result="effect1_dropShadow_624_304"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_624_304"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_624_304">
              <rect x="1" width="31" height="20" rx="2" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
      {mode === "OPEN" && (
        <>
          <g filter="url(#filter0_d_624_368)">
            <g clipPath="url(#clip0_624_368)">
              <rect x="1" width="31" height="20" rx="2" fill="#BAE6FD" />
              <g filter="url(#filter1_d_624_368)">
                <path d="M15 1H30V19H15V1Z" fill="white" />
              </g>
              <ellipse
                cx="17.6786"
                cy="3.5"
                rx="1.60714"
                ry="1.5"
                fill="#BAE6FD"
              />
              <ellipse
                cx="27.3214"
                cy="3.5"
                rx="1.60714"
                ry="1.5"
                fill="#BAE6FD"
              />
              <rect
                x="17.1429"
                y="9"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <rect
                x="17.1429"
                y="12"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <rect
                x="17.1429"
                y="15"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <path d="M3 10.0311L7.5 7V13.0622L3 10.0311Z" fill="#44403C" />
              <rect x="7" y="9" width="6" height="2" fill="#44403C" />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_624_368"
              x="0"
              y="0"
              width="33"
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
                result="effect1_dropShadow_624_368"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_624_368"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_624_368"
              x="14"
              y="1"
              width="17"
              height="20"
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
                result="effect1_dropShadow_624_368"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_624_368"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_624_368">
              <rect x="1" width="31" height="20" rx="2" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
      {mode === "CLOSE" && (
        <>
          <g filter="url(#filter0_d_624_408)">
            <g clipPath="url(#clip0_624_408)">
              <rect x="1" width="31" height="20" rx="2" fill="#BAE6FD" />
              <g filter="url(#filter1_d_624_408)">
                <path d="M3 1H18V19H3V1Z" fill="white" />
              </g>
              <ellipse
                cx="5.67855"
                cy="3.5"
                rx="1.60714"
                ry="1.5"
                fill="#BAE6FD"
              />
              <ellipse
                cx="15.3214"
                cy="3.5"
                rx="1.60714"
                ry="1.5"
                fill="#BAE6FD"
              />
              <rect
                x="5.14288"
                y="9"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <rect
                x="5.14288"
                y="12"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <rect
                x="5.14288"
                y="15"
                width="10.7143"
                height="1"
                fill="#44403C"
              />
              <path d="M30 10.0311L25.5 13.0622V7L30 10.0311Z" fill="#44403C" />
              <rect
                x="26"
                y="11.0622"
                width="6"
                height="2"
                transform="rotate(180 26 11.0622)"
                fill="#44403C"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_624_408"
              x="0"
              y="0"
              width="33"
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
                result="effect1_dropShadow_624_408"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_624_408"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_624_408"
              x="2"
              y="1"
              width="17"
              height="20"
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
                result="effect1_dropShadow_624_408"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_624_408"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_624_408">
              <rect x="1" width="31" height="20" rx="2" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </SheetIconStyled>
  );
}

export default SheetIcon;
