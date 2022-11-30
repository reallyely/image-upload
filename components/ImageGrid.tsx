import { AnimatePresence, motion } from "framer-motion";
import { Image, ImageDisplay } from "../modules/gallery/domain/Image.entity";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";

import ImageComponent from "next/image";
import { PropsWithChildren } from "react";

interface ImageGridProps {
  allImages?: Array<Image>;
  filteredImages?: Array<Image>;
}
interface ImageDisplayGridProps {
  imagesForDisplay: Array<ImageDisplay>;
  allImages: Array<Image>;
}
export default function ImageGrid({
  allImages,
  filteredImages,
}: ImageGridProps) {
  return (
    <Stack
      spacing={5}
      style={{
        minWidth: "100%",
        height: "75vh",
      }}
    >
      <CorrectImageGrid allImages={allImages} filteredImages={filteredImages} />
    </Stack>
  );
}
function CorrectImageGrid({ allImages, filteredImages }: ImageGridProps) {
  if (
    Array.isArray(filteredImages) &&
    filteredImages.length > 0 &&
    Array.isArray(allImages) &&
    allImages.length > 0
  ) {
    const filteredImagesForDisplay = filteredImages.map((image) =>
      image.toDisplay !== undefined
        ? image.toDisplay()
        : Image.create(image).toDisplay()
    );
    return (
      <FilledImageGrid
        allImages={allImages}
        imagesForDisplay={filteredImagesForDisplay}
      />
    );
  } else {
    return <EmptyImageGrid />;
  }
}
function FilledImageGrid({
  allImages,
  imagesForDisplay,
}: PropsWithChildren<ImageDisplayGridProps>) {
  return (
    <Stack>
      <Typography>
        {imagesForDisplay.length} images of {allImages?.length}
      </Typography>
      <ImageList
        gap={10}
        sx={{ overflow: "hidden" }}
        cols={3}
        variant="masonry"
      >
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
        placeholder="empty"
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
    <AnimatePresence>
      {props.images.map((image) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ImageListItem>
            <img alt={image.label} src={image.src}></img>
            <a target="_blank" href={image.src}>
              <ImageListItemBar title={image.label}></ImageListItemBar>
            </a>
          </ImageListItem>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
