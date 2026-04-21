import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SetupPage from "./pages/SetupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="setup" element={<SetupPage />} />
      </Route>
    </Routes>
  );
}

export default App;
