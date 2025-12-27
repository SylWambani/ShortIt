import { Box, Heading } from "@chakra-ui/react";


const WhyUseSection = () => {
  return ( 
    <Box width="100%"  textAlign='center' paddingBottom='20px' paddingTop='20px'>
      <Heading fontSize={{base:"xl"}} >Why Use ShortIt?</Heading>
      <li>
        <ul>Fast & simple – No unnecessary steps</ul>
        <ul>Private dashboard – Your links, your data</ul>
        <ul>Clean design – No ads, no clutter</ul>
      </li>
    </Box>
  );
};

export default WhyUseSection;
