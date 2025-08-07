import { BrowserRouter } from "./router";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~shared/lib/react-query/react-query.lib";

const theme = createTheme({
  typography: {
    fontFamily: "Geologica, serif",
  },
});

function App() {
  return (
    <>
      <TanStackQueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <BrowserRouter />
          </ThemeProvider>
        </StyledEngineProvider>
      </TanStackQueryClientProvider>
    </>
  );
}

export default App;
