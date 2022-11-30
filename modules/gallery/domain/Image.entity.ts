interface IImage {
  name?: string;
  content?: string;
  id?: string;
}
const IMAGE_PATH_WEB = "/images";
export class Image implements IImage {
  name: string;
  content: string;
  id: string;
  private constructor({
    name = "",
    content = "",
    id = new Date().toISOString(),
  }: IImage) {
    this.name = name;
    this.content = content;
    this.id = id;
  }

  public static create(props: IImage) {
    return new Image(props);
  }
  public static fromFile(props: File) {
    return new Image({
      name: props.name,
      content: props.name,
      id: String(props.lastModified),
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
  private constructor(props: Image) {
    this.id = props.id;
    this.label = props.name;
    this.src = `${IMAGE_PATH_WEB}/${props.content}`;
  }
  public static create(props: Image) {
    return new ImageDisplay(props);
  }
}
