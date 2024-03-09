import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DecoratorNode,
  EditorConfig,
  LexicalCommand,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
  createCommand,
} from "lexical";
import ImageComponent from "./ImageComponent";
export type ImageProps = {
  key?: NodeKey;
  src: string;
  width: number;
  height: number;
  maxWidth: number | undefined;
  isResized?: boolean;
};

export type SerializedImageNode = Spread<
  {
    src: string;
    width: number;
    height: number;
    maxWidth: number | undefined;
    isResized: boolean;
  },
  SerializedLexicalNode
>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImageProps> = createCommand(
  "INSERT_IMAGE_COMMAND"
);

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { src } = domNode;
    const node = $createImageNode({
      height: 500,
      src,
      width: 500,
      maxWidth: 700,
    });
    return { node };
  }
  return null;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  private _src: string;
  private _width: number;
  private _height: number;
  private _isResized: boolean;
  private _maxWidth: number | undefined;

  constructor({ key, src, width, height, isResized }: ImageProps) {
    super(key);
    this._src = src;
    this._width = width;
    this._height = height;
    this._isResized = isResized ? isResized : false;
    this._maxWidth = 700;
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node);
  }

  static importJSON(serializedImage: SerializedImageNode) {
    return $createImageNode({ ...serializedImage });
  }

  static getType(): string {
    return "image";
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: () => convertImageElement(node),
        priority: 0,
      }),
    };
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        image={{
          key: this.__key,
          src: this.src,
          height: this.height,
          width: this.width,
          maxWidth: this.maxWidth,
          isResized: this._isResized,
        }}
      />
    );
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = `${theme.image}`;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(
    _prevNode: ImageNode,
    dom: HTMLElement,
    config: EditorConfig
  ): false {
    const className = `${config.theme.image}`;
    if (className !== undefined) {
      dom.className = className;
    }
    return false;
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this._src,
      height: this._height,
      width: this._width,
      isResized: this._isResized,
      maxWidth: this._maxWidth,
      type: "image",
      version: 1,
    };
  }

  update(payload: { width?: number; height?: number; isResized?: boolean }) {
    const writable = this.getWritable();
    const { width, height, isResized } = payload;
    if (width) {
      writable._width = width;
    }
    if (height) {
      writable._height = height;
    }
    if (isResized) {
      writable._isResized = isResized;
    }
  }

  public get src(): string {
    return this._src;
  }
  public set src(value: string) {
    this._src = value;
  }

  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }

  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  public get isResized(): boolean {
    return this._isResized;
  }
  public set isResized(value: boolean) {
    this._isResized = value;
  }

  public get maxWidth(): number | undefined {
    return this._maxWidth;
  }
  public set maxWidth(value: number | undefined) {
    this._maxWidth = value;
  }
}

export function $createImageNode(node: ImageProps): ImageNode {
  return $applyNodeReplacement(new ImageNode({ ...node }));
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
