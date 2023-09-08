import { useEffect, useState } from "react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";
import CardList from "../components/CardList";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Home({ tools }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSIgnIn] = useState(false);
  // const [providers, setProviders] = useState([]);
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    setIsAddModalOpen((prev) => !prev);
  }
  function changeHandler(e) {
    e.preventDefault();
    setAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData); // Convert the object values to an array

    setProviders(providerArray);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
    console.log(data.message);
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
      console.log(data.message);
    } else {
      console.log(data.message);
      await signIn("credentials", {
        ...data.data[0],
        callbackUrl: "https://www.aitoolsnext.com/categories",
      });
      console.log(data.data);
    }
  }

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        maxHeight: "fit-content",
      }}
    >
      <div
        id="modal"
        style={{
          display: isAddModalOpen ? "flex" : "none",
          height: "60vh",
          width: "60vw",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          zIndex: 10,
          top: "350px",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          justifyItems: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => {
            setIsAddModalOpen(false);
            document.getElementById("container").style.pointerEvents = "auto";
            document.getElementById("container").style.filter = "blur(0px)";
          }}
          style={{
            position: "absolute",
            backgroundColor: "red",
            color: "white",
            padding: "4px 10px",
            borderRadius: "10px",
            right: "10px",
            top: "10px",
          }}
        >
          Close
        </button>
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
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
            <Box width={"fit-content"}>
              {providers &&
                Object.values(providers).map((provider) =>
                  provider.name == "Sign In" ? null : (
                    <Button
                      as={"a"}
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
              <Link
                onClick={() => setIsSIgnIn((prev) => !prev)}
                color="teal.500"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </Box>
        </Flex>
      </div>

      <Head>
        <title>
          AIToolsNext - Find Best AI tools to simplify your task and make your
          work easy
        </title>
        <meta
          name="description"
          content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Please find the complete list of all tools here..
          </Heading>

          <CardList isCategory={false} authHandler={authHandler} tool={tools} />
        </Stack>
    </div>
  );
}

export async function getServerSideProps() {
  const toolsResponse = await fetch("http://localhost:3000/api/topTools");
  const topTools = await toolsResponse.json();
  const tools = topTools?.tools ? topTools.tools : [];

  return {
    props: {
      tools,
    },
  };
}
