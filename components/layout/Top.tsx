import Grid from "@mui/material/Grid";
import { PropsWithChildren, ReactNode } from "react";

interface HeaderProps {
  left?: ReactNode;
  right?: ReactNode;
}
export function Top(props: PropsWithChildren<HeaderProps>) {
  return <Grid container rowSpacing={2}>
    <Grid item container xs={8}>
      {props.left}
    </Grid>
    <Grid item container justifyContent={"right"} xs={4}>
      {props.right}
    </Grid>
  </Grid>
}