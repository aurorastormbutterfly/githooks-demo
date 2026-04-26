import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TutorialPage from "./pages/TutorialPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tutorial" element={<TutorialPage />} />
        <Route path="quiz" element={<QuizPage />} />
      </Route>
    </Routes>
  );
}

export default App;
