import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </Provider>
      </QueryClientProvider>
    </CookiesProvider>
  </BrowserRouter>
);