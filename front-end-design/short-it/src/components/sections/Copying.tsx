import { Button } from "@chakra-ui/react";
import { Copy } from "lucide-react";
import { toaster } from "../ui/toaster";

interface CopyProps {
  value: string;
}

const Copying = ({ value }: CopyProps) => {
  const handleCopy = async () => {
    
    try {
      await navigator.clipboard.writeText(value);
      toaster.create({
        title: "Copied!",
        description: "Short URL copied to clipboard",
        type: "success",
        duration: 2000,
      });
    } catch (err) {
      console.error("Clipboard error:", err);
      toaster.create({
        title: "Failed",
        description: "Could not copy link",
        type: "error",
        duration: 2000,
      });
    }
  };
  return (
    <Button
      aria-label="Copy short URL"
      size="xs"
      backgroundColor="#1E3A8A"
      onClick={handleCopy}
      _hover={{
        cursor: "pointer",
        backgroundColor: "#0F172A",
        color: "#14B8A6",
      }}
    >
      <Copy />
    </Button>
  );
};

export default Copying;
