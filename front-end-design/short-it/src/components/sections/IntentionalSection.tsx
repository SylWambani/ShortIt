import { useState } from "react";
import {
  Card,
  Field,
  Input,
  Flex,
  Text,
  Link,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { toaster, Toaster } from '../ui/toaster';
import { Copy } from "lucide-react";
import Buttons from "./Buttons";
import axiosInstance from "../api/axiosInstance";

const IntentionalSection = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longUrl) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/shorten-url/generate/", {
        long_url: longUrl,
      });

      setShortUrl(response.data.short_url);
    } catch (err: any) {
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toaster.create({
        title: "Copied!",
        description: "Short URL copied to clipboard",
        type: "success",
        duration: 2000,
        closable: true,
      });
    } catch {
      toaster.create({
        title: "Failed",
        description: "Could not copy link",
        type: "error",
        duration: 2000,
        closable: true,
      });
    }
  };

  return (
    <Flex justifyContent="center">
      <Card.Root width={{ base: "100%", xl: "80%" }}>
        <Card.Body>
          <Field.Root>
            <Field.Label>Paste your long URL here</Field.Label>
            <Input
              placeholder="https//example.com/my-long-url"
              onChange={(e) => setLongUrl(e.target.value)}
            />
            {error && (
              <Text mt={4} color="#EF4444">
                {error}
              </Text>
            )}
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          {shortUrl && (
            <HStack mt={4}>
              <Text>Short URL:</Text>
              <Link href={shortUrl} _hover={{ color: "#14B8A6", cursor:"pointer" }}>
                {shortUrl}
              </Link>
              <IconButton
                aria-label="Copy short URL"
                size="sm"
                onClick={handleCopy}
                backgroundColor="#1E3A8A"
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "#0F172A",
                  color: "#14B8A6",
                }}
              >
                <Copy />
              </IconButton>
              <Toaster />
            </HStack>
          )}
        </Card.Body>
        <Card.Footer justifyContent="center">
          <Buttons onClick={handleShorten}>Shorten URL</Buttons>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default IntentionalSection;

