import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

import { ImageOption } from "../modules/gallery/domain/Image.entity";
import { PropsWithChildren } from "react";
type onChangeHandler = (
  event: React.SyntheticEvent,
  value: ImageOption[],
  reason?: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<ImageOption>
) => void;
interface ImageSearchProps {
  images: Array<ImageOption>;
  handleFilter: onChangeHandler;
}

export default function ImageSearch(
  props: PropsWithChildren<ImageSearchProps>
) {
  const imageOptions = props?.images;
  const isOptionEqualToValue = (option: ImageOption, value: ImageOption) =>
    option.id === value.id;
  return (
    <Autocomplete
      clearOnEscape={true}
      disablePortal
      id="image-search"
      multiple={true}
      options={imageOptions}
      onChange={props.handleFilter}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} label="Search for image" />
      )}
    />
  );
}
