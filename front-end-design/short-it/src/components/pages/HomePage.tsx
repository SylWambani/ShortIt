import { Box } from "@chakra-ui/react";
import HeroSection from "../sections/HeroSection";
import WhyUseSection from "../sections/WhyUseSection";
import HowSection from "../sections/HowSection";
import TrustSection from "../sections/TrustSection";

const HomePage = () => {
  return (
    <Box width="100%">
      <Box padding={{ md: "30px" }}>
        <HeroSection />
        <HowSection />
        <WhyUseSection />
      </Box>
      <TrustSection />
    </Box>
  );
};

export default HomePage;
