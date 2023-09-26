import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { MailMinus } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setisSubscribed] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [subscriptionTextFeed, setSubscriptionTextFeed] = useState(
    "You have subscribed successfully!!!"
  );
  const [isPresent, seIsPresent] = useState(false);
  async function subscribe() {
    try {
      setisLoading(true);
      setisSubscribed(false);
      const res = await fetch("/api/addSubscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      console.log(res);
      if (res.status == 200) {
        setSubscriptionTextFeed("You have subscribed successfully!!!");
        setisSubscribed(true);
        setEmail("");
        seIsPresent(false);
      }
      const data = await res.json();
      if (res.status == 202) {
        console.log(data);
        setSubscriptionTextFeed(data.message.split("=")[1]);
        setisSubscribed(true);
        seIsPresent(true);
      }
    } catch (err) {
      setisLoading(false);
      alert(err);
    }
    setisLoading(false);
  }
  return (
    <div className="w-screen px-10 gap-10 mt-10 bg-black text-white h-fit py-10 grid grid-cols-4">
      <div>© 2023 aitoolsnext.com All rights reserved</div>
      <div>
        <p className="font-bold text-xl mb-3">AIToolsNext</p>
        <p>Tools</p>
        <p>Categories</p>
        <p>Deals</p>
      </div>

      <div>
        <p className="font-bold text-xl mb-3">Help and support</p>
        <p>About Us</p>
        <p>Submit Tool</p>
        <p>Terms of service</p>
        <p>Privacy Policy</p>
      </div>
      <div>
        <p>Stay up to date</p>
        <div className="flex flex-row items-center mt-5 justify-center gap-5">
          <input
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="enter you email"
            className="w-full h-full px-8 py-2  focus:outline-none rounded-xl bg-white/20"
          />
          <Button onClick={subscribe} className="bg-white" aria-label="Subscribe">
            {isLoading ? (
              <Loader2 color="black" />
            ) : (
              <MailMinus color="black"   />
            )}
          </Button>
        </div>
        {isSubscribed && (
          <p
            className={`text-lg block font-semibold ${
              isPresent ? "text-red-600" : "text-green-500"
            }`}
          >
            {subscriptionTextFeed}
          </p>
        )}
      </div>
    </div>
  );
}

// {
//    <Stack align={"flex-start"}>
// <ListHeader>Stay up to date</ListHeader>
// <Stack direction={"row"}>
//   <input
//     onChange={(e) => {
//       e.preventDefault();
//       setEmail(e.target.value);
//     }}
//     value={email}
//     type="email"
//     placeholder="enter you email"
//     // type="text"
//     className="w-full h-full px-8 py-2  focus:outline-none rounded-xl bg-white/20"
//   />
// <IconButton
//   bgColor={"black"}
//   _hover={{
//     bg: "green.600",
//   }}
//   onClick={subscribe}
//   aria-label="Subscribe"
//   icon={
//     isLoading ? (
//       <Spinner color="white" />
//     ) : (
//       <BiMailSend color="white" className="" />
//     )
//   }
// />
// </Stack>
// {isSubscribed && (
//   <p className={`text-lg block font-semibold ${isPresent ? "text-red-600" :"text-green-500"}`}>
//     {subscriptionTextFeed}
//   </p>
// )}
// </Stack>
// }
