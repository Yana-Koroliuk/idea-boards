import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import BoardDetail from './components/BoardDetail';
import NavbarComponent from './components/NavbarComponent';
import LoginPage from './components/authComponents/LoginPage';
import SignupPage from "./components/authComponents/SignUpPage";
import AuthProvider from './components/authComponents/context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/boards/:boardId" element={<BoardDetail />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
