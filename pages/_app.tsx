// pages/_app.js
import { Box, ChakraProvider } from "@chakra-ui/react";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { useEffect, useState } from "react";

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import googleIcon from "../public/google.png";

// import "./styles/globals.css"
import { extendTheme } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors });

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
  const [authData, setAuthData] = useState({
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
    if (res.status != 200) {
      alert(data.message);
    } else {
      // console.log(data.message);
      await signIn("credentials", {
        ...data.data[0],
        callbackUrl: "http://localhost:3000/categories",
      });
      console.log(data.data);
    }
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
          callbackUrl: "http://localhost:3000/categories",
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
      <ChakraProvider theme={theme}>
        <div
        className="min-h-screen max-h-fit overflow-hidden flex flex-col bg-gradient-to-tr from-slate-300 to-slate-50 "
         
        >
          <div
            id="modal"
            className="min-h-fit w-full px-2 py-2 lg:w-1/2 max-h-fit"
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
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                // document.getElementById("container").style.pointerEvents =
                //   "auto";
                // document.getElementById("container").style.filter = "blur(0px)";
                document.getElementById("modal").style.visibility = "hidden";
              }}
              className="bg-red-600 px-6 py-1 rounded-xl font-light text-xl absolute right-5 top-5 text-white"
            >
              Close
            </button>
            <div className="w-full h-full px-2 lg:px-24 flex items-center justify-evenly flex-col">
              <h1 className="my-10 text-xl">
                <span className="text-black font-semibold text-2xl inline">
                  AIToolsNext
                </span>
              </h1>
              <h1 className="font-extrabold text-5xl text-black my-5">
                {isSignIn ? "Login Now!" : "Sign Up now!"}
              </h1>
              <label
                htmlFor=""
                className="text-black w-full font-semibold text-xl"
              >
                Email
                <input
                  name="email"
                  onChange={changeHandler}
                  className="w-full block bg-gray-200 rounded-3xl px-10 py-6 mb-10 mt-2"
                  type="text"
                />
              </label>
              <label
                htmlFor=""
                className="text-black w-full font-semibold text-xl"
              >
                Password
                <input
                  name="password"
                  onChange={changeHandler}
                  className="w-full block bg-gray-200 rounded-3xl px-10 py-6 mb-10 mt-2"
                  type="text"
                />
              </label>
              <button
                onClick={isSignIn ? signInHandler : submitHandler}
                className="w-full px-10 text-3xl py-6 bg-black text-white rounded-3xl"
              >
                {isSignIn ? "Login" : "Sign Up"}
              </button>
              {isSignIn ? (
                <p className="text-lg font-light mt-3">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setIsSIgnIn((prev) => !prev)}
                    className="underline-offset-1 cursor-pointer underline font-semibold"
                  >
                    Sign Up
                  </span>
                </p>
              ) : (
                <p className="text-lg font-light mt-3">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsSIgnIn((prev) => !prev)}
                    className="underline-offset-1 cursor-pointer underline font-semibold"
                  >
                    Login
                  </span>
                </p>
              )}

              <p className="text-lg font-light my-4 ">
                or {isSignIn ? "login" : "sign up"} with
              </p>
              {providers &&
                Object.values(providers).map((provider) =>
                  provider.name == "Sign In" ? null : (
                    <button
                      className="flex items-center justify-center w-1/2 px-7 text-3xl py-4 border border-black rounded-3xl"
                      onClick={async (e) => {
                        e.preventDefault();
                        await signIn("google", {
                          callbackUrl: "http://localhost:3000/",
                        });
                      }}
                    >
                      <Image alt="google" src={googleIcon} color="red" className="mr-5 h-10 w-10" />{" "}
                      {provider.name}
                    </button>
                  )
                )}
            </div>
          </div>
          <Navbar />
          <Component {...pageProps} />
          {/* <Footer /> */}
        </div>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
