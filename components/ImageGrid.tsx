
import { Grid, Box, ImageList, ImageListItem } from "@mui/material";
import { Image } from "modules/gallery/domain/Image.entity";
interface ImageGridProps {
  images: Array<Image>;
}
export default function ImageGrid({ images }: ImageGridProps) {
  return <Grid container spacing={2} >
    <Grid item xs={12}>
      <Box>{images.length} images</Box>
    </Grid>
    <Grid item xs={12}>
      <ImageList variant="quilted">
        <Images images={images} />
      </ImageList>
    </Grid>
  </Grid>
}

const Images = (props) => {
  return props.images.map((image) => <ImageListItem>
    <img key={image.id} src={image.src}></img>
  </ImageListItem >)
}

