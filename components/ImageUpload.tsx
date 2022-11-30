import { ChangeEventHandler, PropsWithChildren } from "react";

import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

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
        multiple={true}
        accept="image/*"
        type="file"
        name="imageUpload"
        id="imageUpload"
        onChange={props.handleUpload}
      />
    </Button>
  );
}
