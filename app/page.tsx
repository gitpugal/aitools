import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

export default async function Home() {

  const categories = await fetch(
    "http://localhost:3000/api/getCategories",
    {
      // data will revalidate every 60 seconds
      next: { revalidate: 60 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  const tools = await fetch(
    "http://localhost:3000/api/getTopTools",
    {
      // data will revalidate every 60 seconds
      next: { revalidate: 60 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <>
      <div className="z-10  w-full max-w-3xl px-2 xl:px-0">

        <h1
          className="animate-fade-up pb-2 bg-gradient-to-br from-black to-stone-400 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-5xl md:leading-[3rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Find Best AI tools that will make your job easy!! </Balancer>
        </h1>

        {/* <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            We have listed all ai tools that will make your next job easy, it contains the huge list of tools from free to paid tools.
          </Balancer>
        </p> */}


        {/* Search Bar  */}
        <div className="mt-10 mb-5 pb-5 md:pl-10 md:pr-10 sm:pl-2 sm:pr-2">

          <form className="max-w-2xl px-4">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search your tools!!"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>

        </div>

        <div
          className="animate-fade-up opacity-0"
          style={{ width: '100%', animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          {categories?.map( (category: any) => (
            <a
              key={category.id}
              className="ml-2 my-1 text-xs inline-flex items-center font-bold leading-sm  rounded-full rounded-full border border-stone-300 bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              href={`/${category.slug}`} // Replace with the URL you want
            >
              <p>{category.name}</p>
            </a>
          ))}


        </div>

        <div style={{ paddingTop: '20vh' }}>
          <h1 style={{ paddingBottom: '20px' }} className="text-gray-500  md:text-3xl sm:text-3xl text-3xl "> Popular AI Tools: </h1>
          <div className={"grid grid-cols-1 gap-6 mb-5 md:grid-cols-2 lg:grid-cols-3"}>

            {tools.tools?.map( (tool: any) => (

              <Card demo="" key={tool?.id} title={tool?.name} description={tool?.description} />

            ))}
          </div>

        </div>


      </div>

      {/* <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div> */}

    </>
  );
}


