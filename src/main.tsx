import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import { persistor, store } from "./redux/index.ts";
import { PersistGate } from "redux-persist/integration/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log("Clerk Publishable Key:", PUBLISHABLE_KEY); // Debugging

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <PersistGate
          loading={<div className="loading-screen">Loading...</div>}
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
