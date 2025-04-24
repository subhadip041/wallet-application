import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from './pages/signup';
import { Signin } from './pages/signin';
import { Dashboard } from './pages/dashboard';
import { SendMoney } from './pages/send';
import { Home } from './pages/home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-slate-200 sm:h-screen flex justify-center">

    <Router>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
      </Routes>

    </Router>
    </div> 

     
  )
}

export default App
