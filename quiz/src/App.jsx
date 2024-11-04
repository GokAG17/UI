import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StartPage from "./containers/StartPage";
import Quiz from "./containers/QuizTemplate";
import CompletedPage from "./containers/CompletePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} /> {/* Start page route */}
        <Route path="/quiz" element={<Quiz />} /> {/* Quiz route */}
        <Route path="/completed" element={<CompletedPage />} /> {/* Completed page route */}
      </Routes>
    </Router>
  );
}

export default App;
