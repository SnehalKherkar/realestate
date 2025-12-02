import { createTheme } from "@mui/material/styles";

export function getTheme(mode = "light") {
  return createTheme({
    palette: { mode },
    components: {
      MuiCard: { styleOverrides: { root: { borderRadius: 12 } } }
    }
  });
}
