import { Box } from "@chakra-ui/react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import FooterSection from "./components/sections/FooterSection";
import NavBar from "./components/sections/NavBar";

function App() {
  return (
    <Box display='flex' minH="100svh" width="100%" flexDirection='column'>
      <NavBar />
      <Box flex="1">
        <HomePage />
      </Box>
      <FooterSection />
    </Box>
  );
}

export default App;
