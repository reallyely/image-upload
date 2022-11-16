import Grid from "@mui/material/Grid";
export function Header(props) {
  return <Grid container>
    From head container component
    {props.children}
  </Grid>
}