import { Box, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";
import IntentionalSection from "./IntentionalSection";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/shortit-login");
  };

  return (
    <Box width="100%" padding={{ base: "20px", xl: "30px" }}>
      <Heading fontSize={{ base: "3xl" }} textAlign="center">
        Shorten links. Share smarter.
      </Heading>
      <Heading
        fontSize={{ base: "xl" }}
        paddingTop={{ base: "20px" }}
        paddingBottom={{ base: "20px" }}
        lineHeight="shorter"
      >
        Create clean, short URLs in seconds and track how they perform — all in
        one place.
      </Heading>
      <IntentionalSection />
      <Text textAlign={{ base: "left", xl: "center" }}>
        Want to track clicks and manage your links? Create an account.
      </Text>
      <ButtonGroup display="flex" justifyContent="center" paddingTop="20px">
        <Buttons type="submit">Get Started</Buttons>
        <Buttons onClick={handleLogInClick}>Sign In</Buttons>
      </ButtonGroup>
    </Box>
  );
};

export default HeroSection;
