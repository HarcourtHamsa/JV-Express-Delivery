import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  Box,
  Stack,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Alert,
} from "@chakra-ui/react";
import { auth } from "../../firebase";
import { AppContext } from "../../contextAPI/context";
import { Redirect } from "react-router";
import Navbar from "../../components/Navbar";
import WhatsAppWidget from "../../components/WhatsAppWidget";

function Login() {
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);
  const [cst, fns] = React.useState({
    email: "",
    password: "",
    isLoading: false,
    error: "",
    loginIsSuccessful: false,
  });
  const context = React.useContext(AppContext);

  const toggleVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  const handleEmailInput = (e) => {
    const { value } = e.target;
    fns((s) => ({ ...s, email: value }));
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    fns((s) => ({ ...s, password: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // show loader
    fns((s) => ({ ...s, isLoading: true }));

    auth
      .signInWithEmailAndPassword(cst.email, cst.password)
      .then((res) => context.setAuthData(res))
      .then(() =>
        fns((s) => ({ ...s, isLoading: false, loginIsSuccessful: true }))
      )
      .catch((err) =>
        fns((s) => ({
          ...s,
          error: 'Invalid email or password',
          isLoading: false,
        }))
      );
  };

  if (cst.loginIsSuccessful) {
    return <Redirect to="/app" />;
  }

  return (
    <div>
      <Navbar />
      <WhatsAppWidget />
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"xl"}
          py={12}
          px={1}
          width={{ base: "90%", md: "400px" }}
        >
          <Box rounded={"lg"} bg={"white"} p={8} borderWidth="thin">
            <Stack align={"center"} mb={10}>
              {cst.error && (
                <Alert backgroundColor="red.50" rounded="sm">
                  <Text color="red.700" textAlign={'center'}>{cst.error}</Text>
                </Alert>
              )}

              <Text fontSize={"4xl"} as="h2">
                Login
              </Text>
              <Text fontSize={"lg"} color={"gray.500"}>
                Access to your dashboard
              </Text>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel color="gray.500" fontSize="sm">
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.org"
                    variant="filled"
                    size="md"
                    borderRadius="sm"
                    value={cst.email}
                    onChange={handleEmailInput}
                    required
                  />
                </FormControl>
                <FormControl id="password" mb={5}>
                  <FormLabel color="gray.500" fontSize="sm">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      variant="filled"
                      size="md"
                      borderRadius="sm"
                      type={passwordIsVisible ? "text" : "password"}
                      value={cst.password}
                      onChange={handlePassword}
                      placeholder="8+ characters"
                      required
                    />
                    <InputRightElement mr="1.5" mt="1">
                      <Button size="sm" onClick={toggleVisibility}>
                        {passwordIsVisible ? (
                          <IoEye size="30" />
                        ) : (
                          <IoEyeOff size="30" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    fontWeight="400"
                    size="lg"
                    bg="#D40511"
                    mt="1.5"
                    isLoading={cst.isLoading}
                    color={"white"}
                    type="submit"
                    _hover={{
                      opacity: 0.8,
                      backgroundColor: "#D40511",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>

      {/* <svg
        version="1.1"
        viewBox="0 0 499 359"
        width="250px"
        height="250px"
        style={{ position: "fixed", bottom: -50, right: 0 }}
      >
        <path
          pid="0"
          d="M15.446 379.232c5.62-.594 11.248-1.475 16.873-1.755 31.455-1.496 61.931-7.234 90.362-21.283 20.751-10.252 39.751-23.274 56.554-39.259 4.982-4.747 9.71-9.862 13.796-15.368 1.896-2.56 3.054-2.428 5.543-1.642 12.36 3.942 24.549 8.983 37.237 11.199 18.068 3.174 35.149-.539 50.722-11.463 17.249-12.091 25.501-29.894 33.417-48.178 4.872-11.257 9.69-20.58 14.646-31.783.806-1.834 2.269-5.329 3.856-7.57 7.07 8.675 16.112 12.906 25.978 15.747 15.1 4.346 29.537 2.699 42.06-6.731 10.131-7.642 16.171-18.306 12.614-31.48-3.128-11.574-11.746-18.762-23.108-21.885-15.089-4.155-29.351-1.442-42.17 7.562-4.469 3.135-8.329 7.126-12.713 10.418-.643.482-3.59-.522-3.826-1.319-3.769-12.839-1.328-24.818 7.085-34.99 15.174-18.313 36.333-23.647 58.832-25.14 34.314-2.272 62.882 12.366 89.712 31.33 8.371 5.929 15.727 13.258 23.554 19.956 3.518-3.041 7.042-6.1 10.541-9.149-17.997-16.414-37.406-30.77-59.468-41.462-15.161-7.343-30.949-12.826-47.677-13.844-27.127-1.651-52.901 2.685-75.526 19.789-21.007 15.872-27.178 42.436-16.973 66.203.637 1.491.866 3.721.238 5.144-7.91 17.996-16.002 35.922-24.068 53.837-4.98 11.05-10.961 21.341-20.187 29.558-14.31 12.739-31.257 14.902-49.121 11.847-8.37-1.416-16.458-4.658-24.598-7.275-1.851-.605-3.796-1.453-5.659-2.624 13.109-18.522 21.653-38.937 22.906-61.082 1.107-19.374-4.556-36.785-19.465-49.625-13.799-11.875-32.762-14.29-48.979-1.304-19.577 15.671-22.501 36.907-17.807 59.894 2.694 13.197 9.628 24.731 18.13 34.724 6.969 8.179 16.148 14.5 25.031 22.247-3.225 3.528-8.981 10.079-13.208 13.722-10.831 9.308-19.366 16.48-30.939 25.005-10.5 7.085-22.195 12.61-33.83 17.763-20.698 9.19-42.866 12.807-65.247 14.699-12.399 1.055-24.904 1.029-37.345 1.486-.918 2.997 7.008 13.788 12.227 14.081zm149.546-120.611c-8.145-9.565-10.049-15.472-11.655-22.97-4.728-18.384-4.039-31.825 9.946-46.434 13.058-13.655 29.646-10.694 39.848 1.821 12.013 14.747 13.05 32.384 8.01 49.628-3.86 13.183-10.09 23.961-15.996 36.506-.42.879-1.859 5.507-5.959 2.128-8.246-5.819-17.817-13.185-24.194-20.679zm191.844-68.837c4.803-3.298 9.412-6.254 14.691-8.184 6.849-1.682 14.522-1.76 21.519-.62 8.251 1.349 13.674 8.125 13.735 14.221.079 7.246-6.16 15.546-13.38 18.522-15.268 6.32-29.298 2.716-41.659-6.446-7.035-5.23-8.257-6.717-.509-13.192.906-.734 5.003-4.094 5.603-4.301z"
          fill="green"
        ></path>
      </svg> */}
    </div>
  );
}

export default Login;
