import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Image, ImageDisplay } from "../modules/gallery/domain/Image.entity";

import { PropsWithChildren } from "react";

interface ImageGridProps {
  images?: Array<Image>;
}
interface ImageDisplayGridProps {
  imagesForDisplay: Array<ImageDisplay>;
}
export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <Grid
      container
      spacing={2}
      style={{
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <CorrectImageGrid images={images} />
    </Grid>
  );
}
function CorrectImageGrid({ images }: ImageGridProps) {
  if (Array.isArray(images) && images.length > 0) {
    const imagesForDisplay = images.map((image) =>
      image.toDisplay !== undefined
        ? image.toDisplay()
        : Image.create(image).toDisplay()
    );
    return <FilledImageGrid imagesForDisplay={imagesForDisplay} />;
  } else {
    return <EmptyImageGrid />;
  }
}
function FilledImageGrid({
  imagesForDisplay,
}: PropsWithChildren<ImageDisplayGridProps>) {
  return (
    <Stack>
      <Typography>{imagesForDisplay.length} images</Typography>
      <ImageList variant="quilted">
        <Images images={imagesForDisplay} />
      </ImageList>
    </Stack>
  );
}
function EmptyImageGrid() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
      maxWidth="lg"
    >
      <Typography variant="h2">There's nothing here</Typography>
    </Stack>
  );
}
interface ImagesProps {
  images: Array<ImageDisplay>;
}
const Images = (props: PropsWithChildren<ImagesProps>) => {
  return (
    <>
      {props.images.map((image) => (
        <ImageListItem key={image.id}>
          <img src={image.src}></img>
        </ImageListItem>
      ))}
    </>
  );
};
