import { Routes, Route } from "react-router-dom";
import ChatScreen from "./ChatScreen/chatscreen";
import Signup from "./Login and Signup/SignUp";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login and Signup/Login";

function App() {
    return (
        <Router>
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<ChatScreen />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chatscreen" element={<ChatScreen />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
            </main>
        </Router>
    )
}

export default App