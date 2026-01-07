import { Box, Button, Link } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../sections/NavBar";

const DashBoardLayout = () => {
  return (
    <Box display="flex" minH="100svh" flexDirection="column">
      <NavBar>
      </NavBar>
      <Box flex="1">
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
