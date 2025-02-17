import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import DataGrid from "./components/dataGrid";

export default function App() {
  return (
    <div style={styles.container}>
      <SignedOut>
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" // Online logo image
              alt="App Logo"
              style={styles.logo}
            />
            <SignInButton mode="modal">
              <button style={styles.signInButton}>Sign In</button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div style={styles.dashboardContainer}>
          <DataGrid />
        </div>
      </SignedIn>
    </div>
  );
}

// Inline Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    minWidth: "300px",
    minHeight: "250px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "120px",
    marginBottom: "20px",
  },
  signInButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "300px", // Adjusted width for better UI
    textAlign: "center",
  },
  dashboardContainer: {
    width: "100%",
    padding: "20px",
  },
};

// export default App;
