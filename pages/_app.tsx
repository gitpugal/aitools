// pages/_app.js
import { Loader2 } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { useEffect, useState } from "react";
import "./styles.css";

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import googleIcon from "../public/google.png";

// import "./styles/globals.css"
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    setIsAddModalOpen((prev) => !prev);
  }
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSIgnIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [toolData, setToolData] = useState({
    name: "",
    description: "",
    slug: "",
    imageURL: "test.png",
    upvotes: 0,
    pricing: "Free",
    features: "Ai tool",
  });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  function changeHandler(e) {
    e.preventDefault();
    setAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toolChangeHandler(e) {
    e.preventDefault();
    setToolData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    if (res.status != 200) {
      alert(data.message);
    } else {
      // console.log(data.message);
      await signIn("credentials", {
        ...data.data[0],
        callbackUrl: "https://www.aitoolsnext.com/categories",
      });
      console.log(data.data);
    }
  }
  async function toolSubmitHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    console.log(toolData);
    const res = await fetch("/api/addTool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tool: toolData, categoryId: 2 }),
    });
    const data = await res.json();
    if (res.status != 200) {
      alert(data.message);
    } else {
      alert(data.message);
      setToolData({
        name: "",
        description: "",
        slug: "",
        imageURL: "test.png",
        upvotes: 0,
        pricing: "Free",
        features: "Ai tool",
      });
      document.getElementById("addToolModal").style.visibility = "hidden";
    }
    setIsLoading(false);
  }

  async function signInHandler(e) {
    e.preventDefault();
    if (authData.email.length < 5 || authData.password.length < 8) {
      alert("Enter valid email and password!");
    } else {
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
        console.log(data.data);
      }
    }
  }

  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData); // Convert the object values to an array

    setProviders(providerArray);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SessionProvider session={session}>
      {/* <div className="min-h-screen max-h-fit overflow-hidden flex flex-col bg-gradient-to-tr"> */}

      <div className="min-h-screen max-h-fit overflow-hidden flex  flex-col ">
        <div
          id="modal"
          className="min-h-fit border-[1px] border-slate-200 max-h-fit w-full px-2 py-10 pb-20 lg:w-1/2 "
          style={{
            // display: isAddModalOpen ? "flex" : "none",
            visibility: "hidden",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            position: "fixed",
            zIndex: 50,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={() => {
              setIsAddModalOpen(false);
              document.getElementById("modal").style.visibility = "hidden";
              document.getElementById("contain").style.opacity = "1";
              document.getElementById("contain").style.pointerEvents = "auto";
            }}
            className="bg-red-600 px-6 py-1 rounded-xl font-light text-xl absolute right-5 top-5 text-white"
          >
            <ArrowLeft />
          </Button>
          <div className="w-full h-full px-2 lg:px-24 flex items-center justify-evenly flex-col">
            <h1 className="my-3 text-xl">
              <span className="text-black font-semibold text-xl inline">
                AIToolsNext
              </span>
            </h1>
            <h1 className="font-extrabold text-3xl text-black my-2">
              {isSignIn ? "Login Now!" : "Sign Up now!"}
            </h1>
            <label
              htmlFor=""
              className="text-black w-full font-semibold text-lg"
            >
              Email
              <input
                name="email"
                onChange={changeHandler}
                className="w-full block bg-gray-200 rounded-xl px-6 py-4 mb-2 mt-2"
                type="text"
              />
            </label>
            <label
              htmlFor=""
              className="text-black w-full font-semibold text-lg"
            >
              Password
              <input
                name="password"
                onChange={changeHandler}
                className="w-full block bg-gray-200 rounded-xl px-6 py-4 mb-10 mt-2"
                type="text"
              />
            </label>
            <Button
              onClick={isSignIn ? signInHandler : submitHandler}
              className="w-full px-8  text-lg  py-3 bg-black text-white rounded-xl"
            >
              {isSignIn ? "Login" : "Sign Up"}
            </Button>
            {isSignIn ? (
              <p className="text-sm font-light mt-3">
                Don't have an account?{" "}
                <span
                  onClick={() => setIsSIgnIn((prev) => !prev)}
                  className="underline-offset-1 cursor-pointer underline font-semibold"
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="text-sm font-light mt-3">
                Already have an account?{" "}
                <span
                  onClick={() => setIsSIgnIn((prev) => !prev)}
                  className="underline-offset-1 cursor-pointer underline font-semibold"
                >
                  Login
                </span>
              </p>
            )}

            <p className="text-sm font-light my-4 ">
              or {isSignIn ? "login" : "sign up"} with
            </p>
            {providers &&
              Object.values(providers).map((provider) =>
                provider.name == "Sign In" ? null : (
                  <Button
                    className="flex items-center justify-center w-full  px-8  text-lg  py-3  border border-black rounded-xl"
                    onClick={async (e) => {
                      e.preventDefault();
                      await signIn("google", {
                        callbackUrl: "https://www.aitoolsnext.com/",
                      });
                    }}
                  >
                    <Image
                      alt="google"
                      src={googleIcon}
                      color="red"
                      className="mr-5 h-full w-fit"
                    />{" "}
                    {provider.name}
                  </Button>
                )
              )}
          </div>
        </div>
        <div
          id="addToolModal"
          className="min-h-fit max-h-fit w-full px-2 py-10 pb-20 lg:w-1/2 "
          style={{
            // display: isAddModalOpen ? "flex" : "none",
            visibility: "hidden",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            position: "fixed",
            zIndex: 50,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={() => {
              setIsAddModalOpen(false);
              document.getElementById("addToolModal").style.visibility =
                "hidden";
              document.getElementById("contain").style.opacity = "1";
              document.getElementById("contain").style.pointerEvents = "auto";
            }}
            className="bg-red-600 px-6 py-1 rounded-xl font-light text-xl absolute right-5 top-5 text-white"
          >
            <ArrowLeft />
          </Button>
          <div className="w-full h-full px-2 lg:px-24 flex items-center justify-evenly flex-col">
            <h1 className="my-3 text-xl">
              <span className="text-black font-semibold text-xl inline">
                Add Toll
              </span>
            </h1>
            <label
              htmlFor=""
              className="text-black w-full font-semibold text-lg"
            >
              Name
              <input
                name="name"
                onChange={toolChangeHandler}
                className="w-full block bg-gray-200 rounded-xl px-6 py-4 mb-2 mt-2"
                type="text"
              />
            </label>
            <label
              htmlFor=""
              className="text-black w-full font-semibold text-lg"
            >
              Description
              <input
                name="description"
                onChange={toolChangeHandler}
                className="w-full block bg-gray-200 rounded-xl px-6 py-4 mb-10 mt-2"
                type="text"
              />
            </label>
            <label
              htmlFor=""
              className="text-black w-full font-semibold text-lg"
            >
              Slug
              <input
                name="slug"
                onChange={toolChangeHandler}
                className="w-full block bg-gray-200 rounded-xl px-6 py-4 mb-10 mt-2"
                type="text"
              />
            </label>
            <label
              htmlFor=""
              className="text-black w-full font-semibold text-lg"
            >
              Image URL
              <input
                name="imageURL"
                onChange={toolChangeHandler}
                className="w-full block bg-gray-200 rounded-xl px-6 py-4 mb-10 mt-2"
                type="text"
              />
            </label>
            <Button
              className="px-8 py-4 rounded-xl w-full text-white bg-black fon-semibold"
              onClick={toolSubmitHandler}
            >
              {isLoading ? <Loader2 /> : "submit"}
            </Button>
          </div>
        </div>
        <Navbar />
        <div id="contain" className="h-full w-full ">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
