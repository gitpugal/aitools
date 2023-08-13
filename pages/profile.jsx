import { useSession } from "next-auth/react";
import React from "react";

const profile = () => {
  const session = useSession();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        // backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "blueviolet",
            textTransform: "uppercase",
          }}
        >
          {session?.data?.user?.name ? session.data.user.name[0] : ""}
        </span>
      </div>
      <div
        style={{
          marginTop: "20px",
          fontSize: "50px",
          fontWeight: "bold",
          color: "blueviolet",
        }}
      >
        {session?.data?.user?.name}
      </div>
    </div>
  );
};

export default profile;
