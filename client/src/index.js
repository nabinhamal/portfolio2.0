import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminPanel, App, LoginPage } from "./containers";
import "./index.css";
import { AuthProvider } from "./utils/auth";
import { MainLoader } from "./components"; // Assuming you have a MainLoader component

const Root = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading (You should replace this with your actual loading logic)
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <AuthProvider>
      <Router>
        {loading ? (
          <MainLoader />
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/" element={<App />} />
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
