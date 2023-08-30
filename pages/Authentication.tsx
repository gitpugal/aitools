import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const session = useSession();
  const [isSignIn, setIsSIgnIn] = useState(false);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
    uid: session?.data?.user?.name,
  });
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData); // Convert the object values to an array

    setProviders(providerArray);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleShowClick = () => setShowPassword(!showPassword);

  function changeHandler(e) {
    e.preventDefault();
    setAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    const res = await fetch("/api/signUpHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });
    const data = await res.json();
    alert(data.message);
  }

  async function signInHandler(e) {
    e.preventDefault();
    const res = await fetch("/api/signInHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });
    const data = await res.json();
    if (res.status != 200) {
      alert(data.message);
    } else {
      console.log(data.message);
      await signIn("credentials", {
        ...data.data[0],
        callbackUrl: "https://www.aitoolsnext.com/categories",
      });
      // console.log(data.data);
    }
  }
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    isRequired={true}
                    required={true}
                    type="email"
                    onChange={changeHandler}
                    name="email"
                    value={authData.email}
                    placeholder="email address"
                  />
                </InputGroup>
              </FormControl>
              {/* {!isSignIn && (
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      isRequired={true}
                      required={true}
                      type="username"
                      onChange={changeHandler}
                      name="username"
                      value={authData.username}
                      placeholder="username"
                    />
                  </InputGroup>
                </FormControl>
              )} */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    isRequired={true}
                    required={true}
                    type={showPassword ? "text" : "password"}
                    onChange={changeHandler}
                    name="password"
                    value={authData.password}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={isSignIn ? signInHandler : submitHandler}
              >
                {isSignIn ? "Login" : "SignUp"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={5}
      >
        <p style={{ textAlign: "center" }}>or login with</p>
        <Box bgColor={"red"} width={"fit-content"}>
          {providers &&
            Object.values(providers).map((provider) =>
              provider.name == "Sign In" ? null : (
                <Button
                  as={"a"}
                  // display={{ base: "none", md: "block" }}
                  // display={"block"}
                  width={"fit"}
                  fontSize={"xl"}
                  fontWeight={600}
                  color={"white"}
                  bg={"blue.400"}
                  _hover={{
                    bg: "blue.300",
                  }}
                  onClick={async (e) => {
                    e.preventDefault();
                    await signIn("google", {
                      callbackUrl: "https://www.aitoolsnext.com/",
                    });
                  }}
                >
                  {provider.name}
                </Button>
              )
            )}
        </Box>
        <p>
          {isSignIn
            ? "Don't have an account? Signup!"
            : "Already have an account sign In!"}
          <Link onClick={() => setIsSIgnIn((prev) => !prev)} color="teal.500">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </Box>
    </Flex>
  );
};

export default App;
