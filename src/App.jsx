import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import "./reset.css";

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute />
    </AuthProvider>
  );
}

export default App;
