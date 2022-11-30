import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { ChangeEventHandler, PropsWithChildren } from "react";
interface ImageUploadProps {
  handleUpload: ChangeEventHandler<HTMLInputElement>;
}

export default function ImageUpload(
  props: PropsWithChildren<ImageUploadProps>
) {
  return (
    <Button startIcon={<UploadIcon />} component="label">
      Upload Image
      <input
        hidden
        accept="image/*"
        type="file"
        onChange={props.handleUpload}
      />
    </Button>
  );
}
