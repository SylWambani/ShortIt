import { Button, type ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
    children: string;
    //onclick: () => void;
}

const Buttons = ({ children, ...props}: ButtonProps) => {
  return (
    <Button
      width={{ base: "48%", xl: '30%' }}
      border="none"
      borderRadius="20px"
      backgroundColor="#1E3A8A"
      color="#0F172A"
      _hover={{
        cursor: "pointer",
        backgroundColor: "#0F172A",
        color: "#14B8A6",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Buttons;
