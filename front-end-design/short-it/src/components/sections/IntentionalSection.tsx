import { useState } from "react";
import {
  Card,
  Field,
  Input,
  Flex,
  Text,
  Link,
  Box,
} from "@chakra-ui/react";
import Buttons from "./Buttons";
import axiosInstance from "../api/axiosInstance";
import publicAxiosInstance from "../api/publicAxiosInstance";
import Copying from "./Copying";

interface IntentionalSectionProps {
  isAuthenticated?: boolean;
  onLinkCreated?: () => void;
}


const IntentionalSection = ({ isAuthenticated = false, onLinkCreated }: IntentionalSectionProps) => {
  const api = isAuthenticated ? axiosInstance : publicAxiosInstance;

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const isValidUrl = (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    if (!longUrl.trim()) {
      setError("Please enter a URL.");
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError(
        "Please enter a valid URL (must start with http:// or https://)."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/shorten-url/generate/", {
        long_url: longUrl,
      });

      setShortUrl(response.data.short_url);
      onLinkCreated?.();
    } catch (err: any) {
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Flex justifyContent="center" padding={{lg:"0px 50px"}}>
      <Card.Root width={{ base: "100%", xl: "80%" }} pt="20px">
        <Card.Title textAlign="center">Create a short link</Card.Title>
        <Card.Body>
          <Field.Root>
            <Field.Label>Paste your long URL here</Field.Label>
            <Input
              placeholder=" https//example.com/my-long-url"
              onChange={(e) => {
                setLongUrl(e.target.value);
                setError("");
              }}
              focusRingColor="#14B8A6"
            />
            {error && (
              <Text mt={4} color="#EF4444">
                {error}
              </Text>
            )}
            <Field.ErrorText>This field is required</Field.ErrorText>
          </Field.Root>
          {shortUrl && (
            <Box mt={4} >
              <Text>Your link is ready:</Text>
              <Link
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ color: "#14B8A6", cursor: "pointer" }}
              >
                {shortUrl}
              </Link>
              <Copying value={shortUrl} />
            </Box>
          )}
        </Card.Body>
        <Card.Footer justifyContent="center">
          <Buttons
            loading={loading}
            loadingText="Shortening URL..."
            disabled={loading}
            onClick={handleShorten}
          >
            Shorten URL
          </Buttons>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default IntentionalSection;
