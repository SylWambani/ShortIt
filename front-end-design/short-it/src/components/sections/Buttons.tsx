import {
  Button,
  type ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  children: string;
  //onclick: () => void;
}

const Buttons = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      width={{ base: "48%", xl: "30%" }}
      border="none"
      borderRadius="20px"
      backgroundColor="#1E3A8A"
      color="#0F172A"
      _hover={{
        cursor: "pointer",
        backgroundColor: "#0F172A",
        color: "#14B8A6",
      }}
      _active={{ color: "#14B8A6", backgroundColor: "#0F172A" }}
      _disabled={{
        bg: "#1E3A8A",
        color: "white",
        opacity: 1,
        cursor: "not-allowed",
      }}
      _loading={{
        bg: "#1E3A8A",
        color: "white",
        opacity: 1,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Buttons;
