
import { Grid, Box, Container, ImageList, ImageListItem, Typography } from "@mui/material";
import { ImageDisplay } from "modules/gallery/domain/Image.entity";
import { PropsWithChildren } from "react";
interface ImageGridProps {
  images?: Array<ImageDisplay>;
}

export default function ImageGrid({ images }: ImageGridProps) {

  return <Grid container spacing={2} style={{
    minWidth: "100%",
    height: "100vh",
  }}>
    {images ?
      <>
        <Grid item xs={12}>
          <Box>{images.length} images</Box>
        </Grid>
        <Grid item xs={12}>
          <ImageList variant="quilted">
            <Images images={images} />
          </ImageList>
        </Grid>
      </>
      : <EmptyImageGrid />
    }

  </Grid>
}

function EmptyImageGrid() {
  return <Container maxWidth="lg">
    <Typography>
      <h3 align="center">There's nothing here</h3>
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

