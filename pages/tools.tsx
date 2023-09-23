import { useEffect, useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";

export default function Home({ tools }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    setIsAddModalOpen((prev) => !prev);
  }

  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData); // Convert the object values to an array

    setProviders(providerArray);
  };
  useEffect(() => {
    fetchData();
    setBreadCrumbs(window?.location?.pathname?.split("/"));
  }, []);

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

      <div className="flex flex-col justify-center py-10 items-start  px-3  sm:px-10 lg:px-40">
        <CustomBreadCrumb crumbs={breadCrumbs} />

        <h1 className="text-5xl text-center w-full">
          Find Best AI tools to
          <br />
          <span>simplify your task</span>
        </h1>

        <p className="text-xl text-center w-full mt-10">
          {" "}
          Please find the complete list of all the tools{" "}
        </p>
      </div>
      <CardList isCategory={false} authHandler={authHandler} tool={tools} />
    </div>
  );
}

export async function getServerSideProps() {
  const toolsResponse = await fetch("https://www.aitoolsnext.com/api/topTools");
  const topTools = await toolsResponse.json();
  const tools = topTools?.tools ? topTools.tools : [];

  return {
    props: {
      tools,
    },
  };
}
