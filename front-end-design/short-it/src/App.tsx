import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LogInPage from "./components/pages/LogInPage";
import MainLayout from "./components/layouts/MainLayout";
import DashBoardLayout from "./components/layouts/DashBoardLayout";
import DashBoardPage from "./components/pages/DashBoardPage";
import HistoryPage from "./components/pages/HistoryPage";
import HistoryLayout from "./components/layouts/HistoryLayout";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
  return (
    <>
      <Toaster />
      <HashRouter>
        <Routes>
          {/* Pages WITH navbar + footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/*Pages WITH navbar*/}
          <Route element={<DashBoardLayout />}>
            <Route path="/dashboard" element={<DashBoardPage />} />
          </Route>
          <Route element={<HistoryLayout />}>
            <Route path="/history" element={<HistoryPage />} />
          </Route>

          {/* Pages WITHOUT navbar + footer */}
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
