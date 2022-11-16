import { Autocomplete, TextField } from "@mui/material";
import { PropsWithChildren } from "react";
import { ImageOption, Image } from "../modules/gallery/domain/Image.entity"
interface ImageSearchProps {
  images?: Array<ImageOption>
}

export default function ImageSearch(props: PropsWithChildren<ImageSearchProps>) {
  return <Autocomplete
    disablePortal
    id="image-search"
    options={props.images || [ImageOption.create(Image.create({ name: "empty", content: "none" }))]}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Search for image" />}
  />
}