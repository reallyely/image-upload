
import Grid from "@mui/material/Grid";
export function Gallery(props: any) {
  return <Grid container spacing={2}>
    <Grid container item>
      {props.TopContent}
    </Grid>
    <Grid container item>
      {props.MainContent}
    </Grid>
  </Grid >
}