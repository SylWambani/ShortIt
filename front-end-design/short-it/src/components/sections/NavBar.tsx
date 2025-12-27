import { HStack } from "@chakra-ui/react";
import Logo from "./Logo";


const NavBar = () => {
  return (
      <HStack padding="8px" width='100%' backgroundColor='#1E3A8A'>
          <Logo/>
    </HStack>
  );
}

export default NavBar