import Button from "@mui/material/Button";
import { MouseEventHandler, PropsWithChildren } from "react";
interface ImageUploadProps {
  handleClick?: MouseEventHandler
}

export default function ImageUpload(props: PropsWithChildren<ImageUploadProps>) {
  return <Button onClick={props.handleClick} >Upload Image</Button>
}