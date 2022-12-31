import './assets/styles/external/animate.min.css';
import './assets/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Home from './pages/home';
import Home from './pages/home-new';
import Chat from './pages/chat';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
