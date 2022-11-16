import Grid from "@mui/material/Grid";
import { PropsWithChildren } from "react";
export function Footer(props: PropsWithChildren<{}>) {
  return <Grid container>
    From FOOTER container component
    {props.children}
  </Grid>
}