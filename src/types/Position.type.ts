export type PositionAbsolute = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  transform?: string;
};

export type PositionObject = {
  $position: PositionAbsolute;
};

export type PositionAbsoluteRight = {
  right: number;
  top: number;
};
