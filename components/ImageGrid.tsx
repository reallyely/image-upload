
import { Grid, Box, Container, ImageList, ImageListItem, Typography } from "@mui/material";
import { ImageDisplay, Image } from "../modules/gallery/domain/Image.entity";
import { PropsWithChildren } from "react";
interface ImageGridProps {
  images?: Array<Image>;
}
interface ImageDisplayGridProps {
  imagesForDisplay: Array<ImageDisplay>;
}
export default function ImageGrid({ images }: ImageGridProps) {
  return <Grid container spacing={2} style={{
    minWidth: "100%",
    height: "100vh",
  }}>
    <CorrectImageGrid images={images} />
  </Grid>
}
function CorrectImageGrid({ images }: ImageGridProps) {

  if (Array.isArray(images) && images.length > 0) {
    const imagesForDisplay = images.map(image => image.toDisplay !== undefined ? image.toDisplay() : Image.create(image).toDisplay())
    return <FilledImageGrid imagesForDisplay={imagesForDisplay} />
  } else {
    return <EmptyImageGrid />
  }
}
function FilledImageGrid({ imagesForDisplay }: PropsWithChildren<ImageDisplayGridProps>) {
  return <>
    <Grid item xs={12}>
      <Box>{imagesForDisplay.length} images</Box>
    </Grid>
    <Grid item xs={12}>
      <ImageList variant="quilted">
        <Images images={imagesForDisplay} />
      </ImageList>
    </Grid>
  </>
}
function EmptyImageGrid() {
  return <Container maxWidth="lg">
    <Typography>
      <p align="center">There's nothing here</p>
    </Typography>
  </Container>
}
interface ImagesProps {
  images: Array<ImageDisplay>
}
const Images = (props: PropsWithChildren<ImagesProps>) => {
  return <>
    {props.images.map((image) => <ImageListItem key={image.id}>
      <img src={image.src}></img>
    </ImageListItem >)}
  </>

}

