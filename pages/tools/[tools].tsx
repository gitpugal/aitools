import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/router";
import { FiThumbsUp } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { BiSolidUpArrow } from "react-icons/bi";
import dynamic from "next/dynamic";

import { FaLock, FaUserAlt } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function Home({ tool, slug }) {
  const router = useRouter();
  const [likes, setLikes] = useState(tool?.upvotes || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsloaded] = useState(false);
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
    setIsloaded(true);
    // console.log(tool, slug);
    fetchData();
    setToolData(tool);
  }, []);
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const s = slug;

  // debugger;

  const session = useSession();
  async function initiateLike(id, email, isLiked) {
    console.log(toolData);
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
    document.getElementById("contain").style.opacity = "0.1";
    document.getElementById("contain").style.pointerEvents = "none";
    document.getElementById("modal").style.visibility = "visible";
  }
  function changeHandler(e) {
    e.preventDefault();
    setAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className="min-h-screen max-h-fit">
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
      <div className="w-screen relative min-h-screen flex flex-col gap-5 lg:gap-10 items-start justify-start max-h-fit px-3  sm:px-10 lg:px-40  py-28">
        <button
          className="absolute top-10 left-10"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Back
        </button>
        <div className="flex flex-col lg:flex-row gap-16 justify-start items-center">
          <h1 className="text-5xl font-semibold">{toolData?.name}</h1>
          <p
            className={`border-[1px]  border-black cursor-pointer px-4 py-2 rounded-xl ${
              toolData?.upvotedusers?.indexOf(session?.data?.user?.email) >= 0
                ? "bg-white"
                : "bg-[#262626]"
            } ${
              toolData?.upvotedusers?.indexOf(session?.data?.user?.email) >= 0
                ? "text-[#262626]"
                : "text-white"
            }`}
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
          >
            {toolData?.upvotes}
            {isLoading == toolData?.id ? (
              <Loader2 className="animate-spin inline" />
            ) : (
              <BiSolidUpArrow
                fontSize={30}
                style={{
                  marginLeft: 10,
                  display: "inline",
                  fontWeight: "bolder",
                  fontSize: "30px",
                  color:
                    toolData?.upvotedusers?.indexOf(
                      session?.data?.user?.email
                    ) >= 0
                      ? "black"
                      : "white",
                }}
              />
            )}
          </p>
        </div>
        <h1
          dangerouslySetInnerHTML={{
            __html: isLoaded ? toolData?.description : "loading...",
          }}
          className="text-xl"
        />
        <h1 className="bg-black px-4 py-2 rounded-xl text-white text-2xl">
          #{toolData?.primarycategory}
        </h1>
      </div>
      <h1 className="text-4xl mx-auto pb-10 underline font-semibold text-center">
        Similar tools
      </h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.url;
  console.log("URL: " + url);

  const slug = url.substring(url.lastIndexOf("/") + 1).split(".")[0];
  console.log("SLug: " + slug);

  // console.log(`https://www.aitoolsnext.com/api/getToolsBySlug/${slug}`);
  const res = await fetch(`https://www.aitoolsnext.com/api/getToolsBySlug/tt2`);
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      tool: data,
      slug: slug ? slug : "",
    },
  };
}
