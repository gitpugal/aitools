import { useEffect, useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";

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
        callbackUrl: "http://localhost:3000/categories",
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

      {/* <Stack
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
        </Stack> */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl mt-20 ">
          Find Best AI tools to
          <br />
          <span>simplify your task</span>
        </h1>

        <p className="text-xl mt-10">
          {" "}
          Please find the complete list of all the tools{" "}
        </p>

        <CardList isCategory={false} authHandler={authHandler} tool={tools} />
      </div>
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
