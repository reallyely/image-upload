interface IImage {
  name?: string
  content?: string
  id?: string
}

export class Image implements IImage {
  name: string
  content: string
  id: string
  private constructor({ name = "", content = "", id = new Date().toISOString() }: IImage) {
    this.name = name
    this.content = content
    this.id = id
  }

  public static create(props: IImage) {
    return new Image(props)
  }

  public toPersistence() {
  }
  public toDisplay() {
    return ImageDisplay.create(this)
  }
  public toView() {
    return ImageOption.create(this)
  }
}

// Transfer to MUI Option
export class ImageOption {
  id?: string;
  label: string;
  value: string;
  private constructor(props: Image) {
    this.id = props.id
    this.label = props.name
    this.value = props.name
  }
  public static create(props: Image) {
    return new ImageOption(props)
  }

}

export class ImageDisplay {
  id?: string;
  src: string;
  label: string;
  private constructor(props: Image) {
    this.id = props.id
    this.label = props.name
    this.src = props.content
  }
  public static create(props: Image) {
    return new ImageDisplay(props)
  }
}