import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <RouterProvider router={routes} />
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
