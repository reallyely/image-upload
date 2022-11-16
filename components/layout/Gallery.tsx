
import Grid from "@mui/material/Grid";
import { Footer, Header } from "@/components/layout"
export function Gallery(props: any) {
  return <Grid container spacing={2}>
    <Grid container item >
      <Header>
        {props.HeadContent}
      </Header>
    </Grid>
    <Grid container item>
      {props.MainContent}
    </Grid>
    <Grid container item>
      <Footer>
        {props.FooterContent}
      </Footer>
    </Grid>
  </Grid>
}