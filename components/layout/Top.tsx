import { PropsWithChildren, ReactNode } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface HeaderProps {
  left?: ReactNode;
  right?: ReactNode;
}
export function Top(props: PropsWithChildren<HeaderProps>) {
  return (
    <Stack
      sx={{ width: 1 }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>{props.left}</Box>
      <Box alignItems="center" justifyContent="flex-end">
        {props.right}
      </Box>
    </Stack>
  );
}
