import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import LoaderComp from "./components/LoaderComp";
import { LoaderProvider } from "./context/LoaderContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <LoaderProvider>
          <Router>
            <AppRoutes />
            <LoaderComp />
            <ToastContainer />
          </Router>
        </LoaderProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
