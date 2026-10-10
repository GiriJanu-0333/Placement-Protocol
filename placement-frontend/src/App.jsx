
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <AppRoutes />

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

