interface IImage {
  name: string
  content: string
  id?: string
}

export class Image implements IImage {
  name: string
  content: string
  id: string
  private constructor(props: IImage) {
    this.name = props.name
    this.content = props.content
    this.id = new Date().toLocaleString()
  }
  public static create(props: IImage) {
    return new Image(props)
  }

  public toPersistence() {
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
    this.id = new Date().toLocaleString()
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
    this.id = new Date().toLocaleString()
    this.label = props.name
    this.src = props.content
  }
  public static create(props: Image) {
    return new ImageDisplay(props)
  }
}