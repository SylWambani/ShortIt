import { Box, Button, Link } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../sections/NavBar";

const DashBoardLayout = () => {
  return (
    <Box display="flex" minH="100svh" flexDirection="column">
      <NavBar />
      <Box flex="1" px={{ base: 4, md: 8 }} py={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
