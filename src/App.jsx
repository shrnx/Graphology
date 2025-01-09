import { Routes, Route } from "react-router-dom";
import ChatScreen from "./ChatScreen/chatscreen";
import Onboarding from "./Login and Signup/Onboarding";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Onboarding />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/chatscreen" element={<ChatScreen />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
            </main>
        </Router>
    )
}

export default App