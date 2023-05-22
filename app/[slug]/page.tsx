import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

export default async function Home() {

  

  return (
    <>
      <div className="z-10  w-full max-w-3xl px-2 xl:px-0">

        <h1
          className="animate-fade-up pb-2 bg-gradient-to-br from-black to-stone-400 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-5xl md:leading-[3rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Slug Page </Balancer>
        </h1>

        {/* <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            We have listed all ai tools that will make your next job easy, it contains the huge list of tools from free to paid tools.
          </Balancer>
        </p> */}


        

      </div>

    

    </>
  );
}


