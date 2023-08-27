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
    document.getElementById("modal").style.visibility = "visible";
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

        <Stack
        // bgColor={"red"}
        width={"100vw"}
        overflowX={"hidden"}
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <h1 className="text-6xl font-light">Find Best AI Tools to <span className="block py-3 font-bold bg-gradient-to-r from-pink-400 text-7xl to-purple-700 bg-clip-text h-fit   text-transparent">Simplify your tasks.</span></h1>

          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <SearchBar />
          </Stack>

          <Stack
            display={"flex"}
            textAlign={"start"}
            justify={"flex-start"}
            maxW={"5xl"}
            direction="row"
            mx={"auto"}
          >
            <div className="">
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
            </div>
          </Stack>

          <CardList isCategory={false} authHandler={authHandler} tool={tools} />
        </Stack>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("https://www.aitoolsnext.com/api/getCategories");
  const categories = await response.json();

  const toolsResponse = await fetch("https://www.aitoolsnext.com/api/topTools");
  const topTools = await toolsResponse.json();
  const tools = topTools?.tools ? topTools.tools : [];

  return {
    props: {
      categories,
      tools,
    },
  };
}
