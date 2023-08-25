import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../../components/navbar";
import { Container, Badge, Spinner } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Footer from "../../components/footer";
import { ArrowBackIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { FiThumbsUp } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
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
import { FaLock, FaUserAlt } from "react-icons/fa";

export default function Home({ tool, slug }) {
  const router = useRouter();
  const [likes, setLikes] = useState(tool?.upvotes || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [toolData, setToolData] = useState(tool);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSIgnIn] = useState(false);
  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData);

    setProviders(providerArray);
  };
  useEffect(() => {
    fetchData();
  }, []);
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
  const s = slug;

  debugger;

  const session = useSession();
  async function initiateLike(id, email, isLiked) {
    setIsLoading(id);
    if (!session?.data?.user) {
      // authHandler();
    } else {
      try {
        const res = await fetch("/api/likeHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, email: email, isLiked: isLiked }),
        });
        console.log(res);
        if (res.status < 300) {
          setToolData({
            ...toolData,
            upvotes:
              isLiked == 1 ? (toolData.upvotes -= 1) : (toolData.upvotes += 1),
            upvotedusers: (toolData.upvotedusers = email),
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    setIsLoading(false);
  }

  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    setIsAddModalOpen((prev) => !prev);
  }
  function changeHandler(e) {
    e.preventDefault();
    setAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
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
  const handleShowClick = () => setShowPassword(!showPassword);

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
        {/* Back button */}
        <Box
          mb={4}
          mt={4}
          cursor="pointer"
          display="inline-flex"
          alignItems="center"
          color="blue.500"
          _hover={{ color: "blue.700" }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon mr={2} />
          Back
        </Box>

        {/* Tool image */}
        {
          <Box mb={4}>
            <Image
              width={300}
              height={300}
              src={`/categories/ai_tools_applications.webp`}
              alt={"test"}
            />
          </Box>
        }

        {/* Tool details */}
        <Box>
          <Heading mb={4}>{toolData?.name}</Heading>

          <Badge
            bg={`${
              toolData?.upvotedusers != null &&
              toolData?.upvotedusers?.indexOf(session?.data?.user?.email) >= 0
                ? "white"
                : "blue.500"
            }`}
            color={`${
              toolData?.upvotedusers != null &&
              toolData?.upvotedusers?.indexOf(session?.data?.user?.email) >= 0
                ? "blue.500"
                : "white"
            }`}
            fontSize="18px"
            px={3}
            py={1}
            rounded="md"
            onClick={() => {
              const useremail = session?.data?.user?.email;
              if (!useremail) {
                authHandler();
              }
              const isLiked = toolData?.upvotedusers
                ? toolData.upvotedusers.includes(useremail)
                  ? 1
                  : 0
                : 0;
              const updatedUpvotedUsers = toolData?.upvotedusers
                ? toolData.upvotedusers.includes(useremail)
                  ? toolData.upvotedusers.filter((email) => email != useremail)
                  : [...toolData.upvotedusers, useremail]
                : [useremail];

              initiateLike(toolData?.id, updatedUpvotedUsers, isLiked);
            }}
            cursor={"pointer"}
          >
            {toolData?.upvotes} upvotes
            {isLoading == toolData?.id ? (
              <Spinner />
            ) : (
              <ArrowUpIcon
                fontSize={30}
                borderRadius={4}
                style={{
                  marginLeft: 10,
                  display: "inline",
                  fontWeight: "bolder",
                  fontSize: "30px",
                  color:
                    toolData?.upvotedusers?.indexOf(
                      session?.data?.user?.email
                    ) >= 0
                      ? "#3182ce"
                      : "white",
                }}
              />
            )}
          </Badge>

          <div
            style={{ marginTop: "20px", marginBottom: "20px" }}
            dangerouslySetInnerHTML={{ __html: toolData.description }}
          ></div>
          <Box>
            <Badge key={tool?.primarycategory} mr={2} mb={2} colorScheme="blue">
              {toolData?.primarycategory}
            </Badge>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.url;
  const slug = url.substring(url.lastIndexOf("/") + 1); // Extract the last segment of the URL

  const res = await fetch(`https://www.aitoolsnext.com/api/getToolsBySlug/${slug}`);
  const data = await res.json();

  return {
    props: {
      tool: data,
      slug: slug ? slug : "",
    },
  };
}
