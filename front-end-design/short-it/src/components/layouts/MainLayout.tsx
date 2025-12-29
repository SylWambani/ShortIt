import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../sections/NavBar";
import FooterSection from "../sections/FooterSection";


const MainLayout = () => {
  return (
    <Box display="flex" minH="100svh" flexDirection="column">
      <NavBar />

      {/* Page content */}
      <Box flex="1">
        <Outlet />
      </Box>

      <FooterSection />
    </Box>
  );
};

export default MainLayout;
