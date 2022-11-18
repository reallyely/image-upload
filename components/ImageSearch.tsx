import { Autocomplete, TextField } from "@mui/material";
import { ChangeEventHandler, PropsWithChildren } from "react";
import { Image, ImageOption } from "../modules/gallery/domain/Image.entity"
interface ImageSearchProps {
  images: Array<Image>
  handleFilter: ChangeEventHandler
  values: Array<ImageOption>
}


export default function ImageSearch(props: PropsWithChildren<ImageSearchProps>) {
  return <Autocomplete
    disablePortal
    id="image-search"
    multiple={true}
    options={props.images ? props.images.map(image => image.toView !== undefined ? image.toView() : Image.create(image).toView()) : []}
    onChange={props.handleFilter}
    sx={{ width: 400 }}
    renderInput={(params) => <TextField {...params} label="Search for image" />}
  />
}