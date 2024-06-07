import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./containers/App";
import "./index.css";
import { AuthProvider } from "./utils/auth";
import { MainLoader } from "./components"; // Assuming you have a MainLoader component
const LoginPage = lazy(() => import("./containers/LoginPage"));
const AdminPage = lazy(() => import("./containers/AdminPanel"));
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
          <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminpanel" element={<AdminPage />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Suspense>
        )}
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
