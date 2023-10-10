import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cardlist from "../components/CardList";
import Head from "next/head";
const profile = () => {
  const session = useSession();
  const [tools, SetTools] = useState([]);
  async function fetchData() {
    const response = await fetch("https://aitoolsnext.com/api/getUserTools", {
      method: "POST",
      body: JSON.stringify({ email: session?.data?.user?.email }),
    });
    if (response.ok) {
      const data = await response.json();
      SetTools(data?.tools);
    }
  }
  useEffect(() => {
    if (session?.data?.user) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (session?.data?.user) {
      fetchData();
    }
  }, [session?.data?.user]);
  return (
    <div className="w-screen min-h-screen max-h-fit px-40  py-10  flex flex-col items-center justify-start">
      <Head>
        <title>AIToolsNext - Profile</title>
        <meta
          name="description"
          content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-24 w-24  overflow-hidden rounded-full bg-slate-600 ">
        {session?.data?.user?.image ? (
          <Image
            width={100}
            height={100}
            alt="profile"
            className="h-full w-full object-contain"
            src={session?.data?.user?.image}
          />
        ) : (
          `${session?.data?.user?.name.charAt[0]}`
        )}
      </div>
      <p className="text-3xl font-light">{session?.data?.user?.name}</p>
      <p className="w-full text-4xl relative top-10">Your Tools</p>
      {tools && tools.length > 0 && (
        <Cardlist
          authHandler={() => {}}
          tool={tools}
          isUserTool={true}
          isCategory={false}
        />
      )}
    </div>
  );
};

export default profile;
