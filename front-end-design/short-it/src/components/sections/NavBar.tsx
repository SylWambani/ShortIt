import { HStack } from "@chakra-ui/react";
import Logo from "./Logo";

interface NavBarProps {
  children?: React.ReactNode;
 }


const NavBar = ({children}: NavBarProps) => {
  return (
      <HStack display='flex' justifyContent="space-between" padding="8px" width='100%' backgroundColor='#1E3A8A'>
          <Logo/>
          {children}
    </HStack>
  );
}

export default NavBar