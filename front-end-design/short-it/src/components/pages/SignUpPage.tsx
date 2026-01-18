import {
  Flex,
  Card,
  Field,
  Input,
  VStack,
  HStack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { PasswordInput, PasswordStrengthMeter } from "../ui/password-input";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toaster } from "../ui/toaster";
import { passwordStrength } from "check-password-strength";
import { strengthOptions } from "./LogInPage";
import Buttons from "../sections/Buttons";
import Logo from "../sections/Logo";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User>({
    username: "",
    password: "",   
    email: "",
    first_name: "",
    last_name: "",
  });

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUsers((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await axiosInstance.post("/auth/users/", users);
      toaster.create({
        title: "Account created successfully!",
        description: "You can now log in with your new account.",
        type: "success",
        duration: 4000,
        closable: true,
      });
      navigate("/login");
    } catch (err: any) {
      console.error("Error creating user:", err);
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMessages = Object.entries(errorData)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`
          )
          .join("\n");

        toaster.create({
          title: "Signup failed",
          description: errorMessages,
          type: "error",
          duration: 5000,
          closable: true,
        });
      } else {
        toaster.create({
          title: "Unexpected error",
          description: "Something went wrong. Please try again later.",
          type: "error",
          duration: 4000,
          closable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogInClick = () => {
    navigate("/login");
  };

  return (
    <Flex
      minHeight="100vh"
      padding={{ base: "15px" }}
      justifyContent="center"
      alignItems="center"
    >
      <Card.Root width={{ md:'55%', lg:'40%', xl:'30%'}}  borderRadius="18px" shadow="2xl" size='lg'>
        <form onSubmit={handleSubmit}>
          <Card.Header textAlign="center">
            <Logo />
          </Card.Header>
          <Card.Title pt="10px">
            <Heading size="lg" textAlign="center">
              Create your account
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
                Firstname <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="first_name"
                value={users.first_name}
                onChange={handleChange}
                placeholder="Enter your firstname"
                focusRingColor="#14B8A6"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Lastname <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="last_name"
                value={users.last_name}
                onChange={handleChange}
                placeholder="Enter your lastname"
                focusRingColor="#14B8A6"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="email"
                value={users.email}
                onChange={handleChange}
                placeholder="abc@example.com"
                focusRingColor="#14B8A6"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Username <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="username"
                value={users.username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                  handleChange(e);
                }}
                focusRingColor="#14B8A6"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                name="password"
                value={users.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                  handleChange(e);
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
                type="submit"
                loading={loading}
                loadingText="Creating account..."
                disabled={loading}
              >
                Sign Up
              </Buttons>
              <HStack gap="0">
                <Text fontSize="sm">Already have an account?</Text>
                <Button
                  border="0"
                  padding="0"
                  variant="plain"
                  onClick={handleLogInClick}
                  _hover={{
                    cursor: "pointer",
                    color: "#14B8A6",
                  }}
                  _active={{ color: "#14B8A6" }}
                >
                  Sign In
                </Button>
              </HStack>
            </VStack>
          </Card.Footer>
        </form>
      </Card.Root>
    </Flex>
  );
};

export default SignUpPage;
