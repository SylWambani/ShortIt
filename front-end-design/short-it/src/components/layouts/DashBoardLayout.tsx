import { Box, Link } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../sections/NavBar";
import LogoutButton from "../sections/LogoutButton";

const DashBoardLayout = () => {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate("/history");
  };
  return (
    <Box display="flex" minH="100svh" flexDirection="column">
      <NavBar>
        <Box
          width="50%"
          display="flex"
          justifyContent="space-evenly"
          fontWeight="medium"
        >
          <Link onClick={handleHistoryClick}>
            History
          </Link>
          <LogoutButton />
        </Box>
      </NavBar>
      <Box flex="1" px={{ base: 4, md: 8 }} py={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
