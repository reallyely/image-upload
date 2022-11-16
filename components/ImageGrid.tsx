
import { Grid, Box, ImageList, ImageListItem } from "@mui/material";
export default function ImageGrid({ images }) {
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
  console.log(props)
  return props.images.map((image) => <ImageListItem>
    <img src={image.src}></img>
  </ImageListItem >)
}

