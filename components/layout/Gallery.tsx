import Stack from "@mui/material/Stack";
export function Gallery(props: any) {
  return (
    <Stack
      sx={{ width: 1 }}
      justifyContent="center"
      alignItems="center"
      spacing={2}
      direction="column"
    >
      <Stack sx={{ width: 1 }}>{props.TopContent}</Stack>
      <Stack sx={{ width: 1 }}>{props.MainContent}</Stack>
    </Stack>
  );
}
