export type PositionAbsolute = {
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  transform?: string;
};

export type PositionObject = {
  $position: PositionAbsolute;
};

export type PositionAbsoluteRight = {
  right: number;
  top: number;
};
