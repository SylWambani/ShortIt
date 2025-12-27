import { Box, HStack, VStack, Text } from "@chakra-ui/react";

const FooterSection = () => {
  return (
    <VStack
      justifyContent="space-evenly"
      alignItems="center"
      padding="20px"
      backgroundColor="#1E40AF"
      color="#64748B"
    >
      <Box>© 2025 ShortIt</Box>
      <Box>
        <HStack>
          <Text>Privacy</Text>
          <Text>Terms</Text>
          <Text>Contact</Text>
        </HStack>
      </Box>
    </VStack>
  );
};

export default FooterSection;
