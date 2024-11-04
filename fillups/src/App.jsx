import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import FinalFillUpTemplate from './components/FinalFillUpTemplate';
import EndPage from './components/CompletePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/fill-up" element={<FinalFillUpTemplate />} />
                <Route path="/end" element={<EndPage />} />
            </Routes>
        </Router>
    );
}

export default App;
