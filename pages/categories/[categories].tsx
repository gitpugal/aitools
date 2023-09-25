import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import CardList from "../../components/CardList";
import {
  ArrowLeft,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import CustomBreadCrumb from "../../components/CustomBreadCrumb";
import Link from "next/link";
import { FaWhatsappSquare } from "react-icons/fa";

export default function Home({ categoriess, toolss }) {
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [tools, setTools] = useState(null);
  const [categories, setCategories] = useState(null);

  // debugger;
  const session = useSession();
  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    document.getElementById("modal").style.visibility = "visible";
  }

  useEffect(() => {
    setTools(toolss?.filter((tool) => categories?.tools?.includes(tool?.id)));
    setCategories(categoriess);
    setBreadCrumbs(window?.location?.pathname?.split("/"));
  }, []);
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

      <div className="w-screen pb-20  flex flex-col items-start  justify-center">
        <div className="flex flex-col lg:flex-col lg:gap-5 px-3 sm:px-10 lg:px-40 py-10 justify-start items-start ">
          <CustomBreadCrumb crumbs={breadCrumbs} />
          <h1 className="text-3xl lg:text-5xl font-semibold">
            {categories?.name}
          </h1>
          <h1 className="text-lg lg:text-xl ">{categories?.description}</h1>
        </div>
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
        <CardList
          key={JSON.stringify(tools)}
          isCategory={false}
          authHandler={authHandler}
          tool={toolss}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.url;
  const slug = url.substring(url.lastIndexOf("/") + 1).replace(".json", "");
  console.log(slug);
  const res = await fetch(
    `https://www.aitoolsnext.com/api/getCategoriesBySlug/${slug}`
  );
  const data = await res.json();
  const toolRes = await fetch("https://www.aitoolsnext.com/api/tools");
  const toolData = await toolRes.json();
  return {
    props: {
      categoriess: data,
      toolss: toolData.tools,
    },
  };
}
