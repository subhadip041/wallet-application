// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/auth/SignIn";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* Add other routes here */}
        </Routes>
    </Router>
  );
}

export default App;
