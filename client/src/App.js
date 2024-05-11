import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Account from './pages/Account'
import Transactions from './pages/Transactions'
 
  
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<Login/>} />
          <Route path="/register"  element={<Register/>} />
          <Route path="/dashboard"  element={<Dashboard/>} />
          <Route path="/account"  element={<Account/>} />
          <Route path="/transactions"  element={<Transactions/>} />
      </Routes>
    </Router>
  );
}
  
export default App;