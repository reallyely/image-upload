import { randomUUID } from "crypto";
interface IImage {
  name?: string;
  content?: string;
  id?: string;
  width?: number;
  height?: number;
}
interface ISize {
  width: number | undefined;
  height: number | undefined;
  orientation?: number;
  type?: string;
}
type FileWithDimensions = File & ISize;

const IMAGE_PATH_WEB = "/images";
export class Image implements IImage {
  name: string;
  content: string;
  id: string;
  width: number;
  height: number;
  private constructor({
    name = "",
    content = "",
    id = randomUUID(),
    width = 0,
    height = 0,
  }: IImage) {
    this.name = name;
    this.content = content;
    this.id = id;
    this.width = width;
    this.height = height;
  }

  public static create(props: IImage) {
    return new Image(props);
  }
  public static fromFile(props: FileWithDimensions) {
    return new Image({
      name: props.name,
      content: props.name,
      width: props.width,
      height: props.height,
    });
  }

  public toDisplay() {
    return ImageDisplay.create(this);
  }

  public toImageOption() {
    return ImageOption.create(this);
  }
}

// Transfer to MUI Option
export class ImageOption {
  id?: string;
  label: string;
  value: string;
  private constructor(props: Image) {
    this.id = props.id;
    this.label = props.name;
    this.value = props.name;
  }
  public static create(props: Image) {
    return new ImageOption(props);
  }
}

export class ImageDisplay {
  id?: string;
  src: string;
  label: string;
  width: number;
  height: number;
  private constructor(props: Image) {
    this.id = props.id;
    this.label = props.name;
    this.src = `${IMAGE_PATH_WEB}/${props.content}`;
    this.width = props.width;
    this.height = props.height;
  }
  public static create(props: Image) {
    return new ImageDisplay(props);
  }
}
