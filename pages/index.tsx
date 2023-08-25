import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Link,
  Flex,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
  InputLeftElement,
} from "@chakra-ui/react";
import { chakra, Avatar, FormControl, FormHelperText } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Footer from "../components/footer";
import CardList from "../components/CardList";
import { SearchBar } from "../components/SearchBar";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Home({ categories, tools }) {
  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    setIsAddModalOpen((prev) => !prev);
  }
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSIgnIn] = useState(false);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  function changeHandler(e) {
    e.preventDefault();
    setAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleShowClick = () => setShowPassword(!showPassword);
  
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
        callbackUrl: "http://localhost:3000/categories",
      });
      console.log(data.data);
    }
  }

  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData); // Convert the object values to an array

    setProviders(providerArray);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
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
                          callbackUrl: "http://localhost:3000/",
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
      <Container id="container" maxW={"5xl"}>
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
            Find Best AI tools to
            <br />
            <Text as={"span"} color={"green.400"}>
              simplify your task
            </Text>
          </Heading>

          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <SearchBar />
            {/* <InputGroup minW={["250px", "250px", "350px"]}>
              <Input placeholder="Search" />
              <InputRightElement>
                <IconButton
                  aria-label="Search"
                  icon={<SearchIcon />}
                  bg="lightblue"
                />
              </InputRightElement>
            </InputGroup> */}
          </Stack>

          <Stack
            display={"flex"}
            textAlign={"start"}
            justify={"flex-start"}
            maxW={"5xl"}
            direction="row"
          >
            <Box>
              {categories?.slice(0, 18)?.map((category) => (
                <Link href={`/${category?.slug}`}>
                  <Badge
                    key={category.id}
                    px="2"
                    py="2"
                    borderRadius={"10px"}
                    mx="1"
                    my="1"
                    fontSize={"11px"}
                    variant="solid"
                    colorScheme={
                      hoveredCategory === category.id ? "blue" : "gray"
                    }
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    _hover={{
                      cursor: "pointer",
                      colorScheme: "green",
                      transform: "translateX(2px)",
                    }}
                  >
                    {category.name}
                  </Badge>
                </Link>
              ))}

              <Badge
                key={"show_more"}
                px="2"
                py="2"
                borderRadius={"10px"}
                mx="1"
                my="1"
                fontSize={"11px"}
                variant="solid"
                colorScheme={hoveredCategory === "100000" ? "blue" : "gray"}
                onMouseEnter={() => setHoveredCategory("100000")}
                onMouseLeave={() => setHoveredCategory(null)}
                _hover={{
                  cursor: "pointer",
                  colorScheme: "blue",
                  transform: "translateX(2px)",
                }}
              >
                {"Show More..."}
              </Badge>
            </Box>
          </Stack>

          <CardList isCategory={false} authHandler={authHandler} tool={tools} />
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("https://www.aitoolsnext.com/api/getCategories");
  const categories = await response.json();

  const toolsResponse = await fetch("https://www.aitoolsnext.com/api/getTopTools");
  const topTools = await toolsResponse.json();
  const tools = topTools?.tools ? topTools.tools : [];

  return {
    props: {
      categories,
      tools,
    },
  };
}
