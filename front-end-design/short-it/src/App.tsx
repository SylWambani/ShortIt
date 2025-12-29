import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LogInPage from "./components/pages/LogInPage";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Pages WITH navbar + footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* add more public pages here */}
        </Route>

        {/* Pages WITHOUT navbar + footer */}
        <Route path="/shortit-login" element={<LogInPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
