import {
  Card,
  Heading,
  Field,
  Input,
  HStack,
  Text,
  Button,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { type Options, passwordStrength } from "check-password-strength";
import { PasswordInput, PasswordStrengthMeter } from "../ui/password-input";
import { useEffect, useMemo, useState } from "react";
import { toaster, Toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";
import Logo from "../sections/Logo";
import Buttons from "../sections/Buttons";

const strengthOptions: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

const LogInPage = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    fetch("http://127.0.0.1:8000/shorten-url/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username && !password) {
      setError("Username and password are required");
      return;
    }

    if (!username) {
      setError("Username is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 || res.status === 401) {
          throw new Error("Invalid username or password");
        }

        if (res.status >= 500) {
          throw new Error("Server error. Please try again later.");
        }

        throw new Error("Something went wrong. Please try again.");
      }

      toaster.create({
        title: "Login successful",
        description: "Welcome back!",
        type: "success",
        duration: 2000,
        closable: true,
      });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("loginSuccess", "true");
      navigate("/dash-board");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Flex
      height="100vh"
      padding={{ base: "10px" }}
      justifyContent="center"
      alignItems="center"
    >
      <Toaster />
      <Card.Root borderRadius="18px" shadow="2xl" size="lg">
        <Card.Header textAlign="center">
          <Logo />
        </Card.Header>
        <Card.Title pt="10px">
          <Heading size="lg" textAlign="center">
            Sign in to your account
          </Heading>
        </Card.Title>
        <Card.Body>
          <Card.Description pb="10px">
            <Text fontWeight="medium" textAlign="center" color="64748B">
              Manage your links and track performance
            </Text>
          </Card.Description>

          <Field.Root required>
            <Field.Label>
              Username <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter your username"
              focusRingColor="#14B8A6"
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              visible={visible}
              onVisibleChange={setVisible}
              placeholder="Enter your password"
              focusRingColor="#14B8A6"
            />
            <PasswordStrengthMeter value={strength} />
          </Field.Root>
          {error && (
            <Text color="#EF4444" fontSize="sm" mb="10px">
              {error}
            </Text>
          )}
        </Card.Body>
        <Card.Footer display="flex" justifyContent="center">
          <VStack>
            <Buttons
              width="100%"
              fontSize="md"
              onClick={handleSubmit}
              loading={loading}
              loadingText="Signing in..."
              disabled={loading}
            >
              Sign In
            </Buttons>
            <HStack gap="0">
              <Text fontSize="sm">Don’t have an account?</Text>
              <Button
                border="0"
                padding="0"
                variant="plain"
                onClick={handleSignUpClick}
                _hover={{
                  cursor: "pointer",
                  color: "#14B8A6",
                }}
                _active={{ color: "#14B8A6" }}
              >
                Create one
              </Button>
            </HStack>
          </VStack>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default LogInPage;
