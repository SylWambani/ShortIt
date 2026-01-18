import { Box, Button, Link } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../sections/NavBar";

const DashBoardLayout = () => {
  const navigate = useNavigate();

  const handleDashBoardClick = () => {
    navigate("/dashboard");
  };
  return (
    <Box display="flex" minH="100svh" flexDirection="column">
      <NavBar>
        <Link
          fontWeight="medium"
          onClick={handleDashBoardClick}
        >
          Dashboard
        </Link>
      </NavBar>
      <Box flex="1" px={{ base: 4, md: 8 }} py={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
