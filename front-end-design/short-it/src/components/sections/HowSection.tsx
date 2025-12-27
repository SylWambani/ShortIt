import { Text, VStack, Heading } from "@chakra-ui/react";

const HowSection = () => {
  return (
    <VStack width="100%">
      <VStack>
        <Heading>How it works</Heading>
        <Heading>Step 1</Heading>
        <Heading>Paste your long URL</Heading>
        <Text>Add any link you want to shorten.</Text>
      </VStack>
        <VStack>
          <Heading>Step 2</Heading>
          <Heading>Get a short link instantly</Heading>
          <Text>We generate a clean, shareable URL.</Text>
        </VStack>
        <VStack>
          <Heading>Step 3</Heading>
          <Heading>Track clicks</Heading>
          <Text>See how many times your link is visited.</Text>
        </VStack>
    </VStack>
  );
};

export default HowSection;
