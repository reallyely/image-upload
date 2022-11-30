import { Image, ImageDisplay } from "../modules/gallery/domain/Image.entity";
import { ImageList, ImageListItem, Stack, Typography } from "@mui/material";

import ImageComponent from "next/image";
import { PropsWithChildren } from "react";

interface ImageGridProps {
  images?: Array<Image>;
}
interface ImageDisplayGridProps {
  imagesForDisplay: Array<ImageDisplay>;
}
export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <Stack
      spacing={5}
      style={{
        minWidth: "100%",
        height: "75vh",
      }}
    >
      <CorrectImageGrid images={images} />
    </Stack>
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
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="lg"
      sx={{ height: 1 }}
    >
      <ImageComponent
        priority
        width="500"
        height="500"
        alt="A red cedar stands alone in an empty landscape"
        src="/empty-red-cedar.png"
      ></ImageComponent>
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
