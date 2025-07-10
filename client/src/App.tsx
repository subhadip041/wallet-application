// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard/>} />

          {/* Add other routes here */}
        </Routes>
    </Router>
  );
}

export default App;
