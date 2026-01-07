import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LogInPage from "./components/pages/LogInPage";
import MainLayout from "./components/layouts/MainLayout";
import DashBoardLayout from "./components/layouts/DashBoardLayout";
import DashBoardPage from "./components/pages/DashBoardPage";
import HistoryPage from "./components/pages/HistoryPage";

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
            <Route path="/history" element={<HistoryPage />} />
          </Route>

          {/* Pages WITHOUT navbar + footer */}
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
