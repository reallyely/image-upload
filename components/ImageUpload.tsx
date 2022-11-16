import { Button } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import { MouseEventHandler, PropsWithChildren } from "react";
interface ImageUploadProps {
  handleClick?: MouseEventHandler
}

export default function ImageUpload(props: PropsWithChildren<ImageUploadProps>) {
  return <Button startIcon={<UploadIcon />} component="label">
    Upload Image
    <input hidden accept="image/*" multiple type="file" />
  </Button>
}