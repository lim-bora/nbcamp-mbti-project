import { AuthProvider } from "./context/AuthContext";
import { ResultProvider } from "./context/ResultContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import "./reset.css";

function App() {
  return (
    <AuthProvider>
      <ResultProvider>
        <ProtectedRoute />
      </ResultProvider>
    </AuthProvider>
  );
}

export default App;
