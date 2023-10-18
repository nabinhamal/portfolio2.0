import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminPanel, App, LoginPage } from "./containers";
import "./index.css";
import { AuthProvider } from "./utils/auth";


ReactDOM.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </AuthProvider>,
  document.getElementById('root')
);
