import { useEffect, useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { Button } from "../components/ui/button";

export default function Home({ toolss }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
  const [tools, setTools] = useState(toolss);

  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    setIsAddModalOpen((prev) => !prev);
  }

  const fetchData = async () => {
    const providerData = await getProviders();
    const providerArray = Object.values(providerData); // Convert the object values to an array
    setTools(tools);
    setProviders(providerArray);
  };
  useEffect(() => {
    fetchData();
    setBreadCrumbs(window?.location?.pathname?.split("/"));
  }, []);

  async function fetchMorePosts() {
    console.log("fetching more posts");
    console.log(tools.length);
    console.log(tools);
    const toolsResponse = await fetch("https://www.aitoolsnext.com/api/topTools", {
      method: "POST",
      body: JSON.stringify({ currentIndex: tools.length, itemCount: 10 }),
    });
    const topTools = await toolsResponse.json();
    console.log(topTools);
    const arr = [...tools, ...topTools.tools];
    console.log("fetched..");
    console.log(arr);
    setTools((prev) => [...prev, ...topTools?.tools]);
  }

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
      <div className="text-center">
        <Button
          onClick={fetchMorePosts}
          className="px-8 mx-auto relative py-10 text-2xl my-10"
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const toolsResponse = await fetch("https://www.aitoolsnext.com/api/topTools", {
    method: "POST",
    body: JSON.stringify({ currentIndex: 0, itemCount: 10 }),
  });
  const topTools = await toolsResponse.json();
  const toolss = topTools?.tools ? topTools.tools : [];

  return {
    props: {
      toolss,
    },
  };
}
