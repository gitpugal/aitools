import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cardlist from "../components/CardList";
const profile = () => {
  const session = useSession();
  const [tools, SetTools] = useState([]);
  async function fetchData() {
    const response = await fetch("https://www.aitoolsnext.com/api/getUserTools", {
      method: "POST",
      body: JSON.stringify({ email: session?.data?.user?.email }),
    });
    if (response.ok) {
      const data = await response.json();
      SetTools(data?.tools);
    }
  }
  useEffect(() => {
    // if (session?.data?.user) {
    fetchData();
    // }
  }, []);
  return (
    <div className="w-screen min-h-screen max-h-fit px-40  py-10  flex flex-col items-center justify-start">
      <div className="h-24 w-24  overflow-hidden rounded-full bg-slate-600 ">
        {session?.data?.user?.image ? (
          <Image
            width={100}
            height={100}
            alt="profile"
            className="h-fit w-fit object-contain"
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
