import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import CardList from "../../components/CardList";
import { ArrowLeft } from "lucide-react";

export default function Home({ categories, toolss }) {
  const router = useRouter();
  const [tools, setTools] = useState(
    toolss?.filter((tool) => categories?.tools?.includes(tool?.id))
  );

  // debugger;
  const session = useSession();
  function authHandler() {
    document.getElementById("container").style.pointerEvents = "none";
    document.getElementById("container").style.filter = "blur(5px)";
    document.getElementById("modal").style.visibility = "visible";
  }

  useEffect(() => {
    console.log(tools);
    console.log(categories);
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
        <div className="mt-10 cursor-pointer ml-10" onClick={() => router.back()}>
          <ArrowLeft />
          Back
        </div>
        <div className="flex flex-col lg:flex-col gap-5 px-3 sm:px-10 lg:px-40 justify-start items-start ">
          <h1 className="text-5xl font-semibold">{categories?.name}</h1>
          <h1 className="text-xl ">{categories?.description}</h1>
        </div>
        <CardList
          key={JSON.stringify(tools)}
          isCategory={false}
          authHandler={authHandler}
          tool={tools}
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
    `http://localhost:3000/api/getCategoriesBySlug/${slug}`
  );
  const data = await res.json();
  const toolRes = await fetch("http://localhost:3000/api/tools");
  const toolData = await toolRes.json();
  return {
    props: {
      categories: data,
      toolss: toolData.tools,
    },
  };
}
