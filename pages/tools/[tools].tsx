import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ClientSafeProvider, getProviders } from "next-auth/react";
import { BiSolidUpArrow } from "react-icons/bi";
import {
  Loader2,
  TwitterIcon,
  ArrowUpLeftSquareIcon,
  LinkedinIcon,
  FacebookIcon,
} from "lucide-react";
import CustomBreadCrumb from "../../components/CustomBreadCrumb";
import Image from "next/image";
import heroImage from "public/categories/ai_tools_applications.webp";
import { FaWhatsappSquare } from "react-icons/fa";

export default function Home({ tool, slug }) {
  const router = useRouter();
  const [likes, setLikes] = useState(tool?.upvotes || 0);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsloaded] = useState(false);
  const [toolData, setToolData] = useState(tool);
  const [url, setUrl] = useState(null);
  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData);

    setProviders(providerArray);
  };
  useEffect(() => {
    setIsloaded(true);
    fetchData();
    setToolData(tool);
    setBreadCrumbs(window?.location?.pathname?.split("/"));
    setUrl(window?.location?.href);
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
      <div className="w-screen relative min-h-screen flex flex-col gap-5 lg:gap-10 items-start justify-start max-h-fit px-3  sm:px-10 lg:px-40  py-10">
        <CustomBreadCrumb crumbs={breadCrumbs} />
        <div className="flex flex-row gap-10 lg:gap-16 justify-start items-center">
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
          <Link
            href={`https://aitoolsnext.com`}
            target="_blank"
            className="relative right-5 lg:right-10"
          >
            <ArrowUpLeftSquareIcon fill="white" color="black" size={50}/>
          </Link>
        </div>
        <Image
          alt="toolImage"
          className="lg:w-3/4 lg:h-3/4 shadow-xl shadow-slate-600 mb-10 lg:mb-20"
          src={heroImage}
        />
        <h1
          dangerouslySetInnerHTML={{
            __html: isLoaded ? toolData?.description : "loading...",
          }}
          className="text-xl"
        />
        <h1 className="bg-black px-4 py-2 rounded-xl text-white text-2xl">
          #{toolData?.primarycategory}
        </h1>
        <div>
          <p className="text-2xl font-semibold mb-3">Share this on:</p>
          <div className="flex flex-row gap-3 items-center justify-evenly">
            <Link
              href={`https://twitter.com/share?url=${url}`}
              target="_blank"
              className="bg-blue-500 p-2 rounded-xl"
            >
              <TwitterIcon fill="white" />
            </Link>

            <Link
              href={`https://web.whatsapp.com/send?text=${url} `}
              target="_blank"
              className="bg-green-500 p-2 rounded-xl"
            >
              <FaWhatsappSquare fill="white" size={25} />
            </Link>

            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              className="bg-blue-800 p-2 rounded-xl"
            >
              <FacebookIcon fill="white" />
            </Link>

            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              target="_blank"
              className="bg-blue-500 p-2 rounded-xl"
            >
              <LinkedinIcon fill="white" />
            </Link>
          </div>
        </div>
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
